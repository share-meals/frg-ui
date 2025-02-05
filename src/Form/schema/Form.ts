import {FormMetaSchema} from './Meta';
import {FormPageSchema} from './Page';
import {z} from 'zod';

export const FormSchema = z.object({
  meta: FormMetaSchema,
  pages: z.array(FormPageSchema)
});

export type FormType = z.infer<typeof FormSchema>;
