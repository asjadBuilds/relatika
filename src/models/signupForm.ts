import { z } from "zod";


export const schema = z.object({
  username: z.string().min(4, '*username must be at least 4 characters'),
  email: z.string().nonempty('*email required').email('*invalid email'),
  password: z.string().nonempty('*password required').min(8, '*password must be at least 8 characters'),
  avatar: z.string({
    required_error:'*avatar is required',
  }).min(1, '*avatar is required')
});