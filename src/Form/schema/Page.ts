import {FormTextModuleSchema} from './TextModule';
import {FormQuestionModuleSchema} from './QuestionModule';
import {z} from 'zod';

export const FormPageSchema = z.array(
  z.union([
    FormTextModuleSchema,
    FormQuestionModuleSchema
  ])
);

export type FormPageType = z.infer<typeof FormPageSchema>;
