import { z } from "zod";

const schema = z.object({
    name:z.string().min(3,'*name is required'),
    avatar:z.instanceof(File),
    description:z.string().min(3,'*description is required'),
    rules:z.array(z.object({
        title:z.string().min(3,'*title is required'),
        content:z.string().min(3,'*content is required')
    }))
})

export default schema