import {MetaSchema} from './Meta';
import {PageSchema} from './Page';
import {z} from 'zod';

export const FormSchema = z.object({
  meta: MetaSchema,
  pages: z.array(PageSchema)
});

export type Form = z.infer<typeof FormSchema>;
