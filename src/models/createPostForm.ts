import { z } from "zod";

export const schema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    gallery: z.array(
        z.instanceof(File)
    ).optional(),
    spaceId: z.string().min(1, "Space is required"),
})