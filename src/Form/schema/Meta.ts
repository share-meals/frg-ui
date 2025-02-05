import {z} from 'zod';

export const FormMetaSchema = z.object({
  id: z.string()
});

export type FormMetaType = z.infer<typeof FormMetaSchema>;
