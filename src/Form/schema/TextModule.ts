import {moduleEnum} from './enums';
import {z} from 'zod';

export const FormTextModuleSchema = z.object({
  module: moduleEnum.extract(['text']),
  text: z.string()
});

export type FormTextModuleType = z.infer<typeof FormTextModuleSchema>;
