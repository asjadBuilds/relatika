import { z } from "zod";

export const schema = z.object({
    username: z.string().min(4,'*username required').optional(),
    email: z.string().email('*email required').optional(),
    password: z.string().nonempty('*password required').min(8, '*password must be at least 8 characters'),
})