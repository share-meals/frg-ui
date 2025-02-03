import {z} from 'zod';

export const MetaSchema = z.object({
  id: z.string()
});

export type Meta = z.infer<typeof MetaSchema>;
