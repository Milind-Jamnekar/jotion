import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

const getUserIdentity = async (ctx: any): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("not authenticated");

  const userId = identity.subject;
  return userId as string;
};

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await getUserIdentity(ctx);

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not available");

    if (existingDocument.userId !== identity) throw new Error("Not authorized");

    const dc = await ctx.db.patch(args.id, { isArchived: true });

    const recursiveArchived = async (id: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (v) =>
          v.eq("userId", args.id).eq("parentDocument", id)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true });
      }
    };

    await recursiveArchived(args.id);
    return dc;
  },
});

export const getSidebar = query({
  args: { parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      isArchived: false,
      userId,
      isPublished: false,
    });

    return document;
  },
});

export const getTrash = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await getUserIdentity(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", identity))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("asc")
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await getUserIdentity(ctx);

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not available");

    if (existingDocument.userId !== identity) throw new Error("Not authorized");

    const recursiveRestore = async (id: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q
            .eq("userId", identity)
            .eq("parentDocument", existingDocument.parentDocument)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: false });
        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);

      if (parent?.isArchived) {
        options.isArchived = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  },
});
