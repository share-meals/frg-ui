import {
  moduleEnum,
  questionTypeEnum,
} from './enums';
import {z} from 'zod';

const CommonSchema = z.object({
  module: moduleEnum.extract(['question']),
  name: z.string(),
})

export const FormMultipleChoiceQuestionSchema = z.object({
  maxSelections: z.number().min(0).optional(), // TODO: set max based on number of options
  options: z.union([
    z.array(z.string()),
    z.array(z.object({
      value: z.string(),
      label: z.string()
    }))
  ]),
  type: questionTypeEnum.extract(['multipleChoice']),
  text: z.string(),
  required: z.boolean().optional()
}).merge(CommonSchema);

export type FormMultipleChoiceQuestionType = z.infer<typeof FormMultipleChoiceQuestionSchema>;

export const FormSingleChoiceQuestionSchema = z.object({
  options: z.union([
    z.array(z.string()),
    z.array(z.object({
      value: z.string(),
      label: z.string()
    }))
  ]),
  type: questionTypeEnum.extract(['singleChoice']),
  text: z.string(),
  required: z.boolean().optional()
}).merge(CommonSchema);

export type FormSingleChoiceQuestionType = z.infer<typeof FormSingleChoiceQuestionSchema>;


export const FormQuestionModuleSchema = z.union([
  FormMultipleChoiceQuestionSchema,
  FormSingleChoiceQuestionSchema,
]);

export type FormQuestionModuleType = z.infer<typeof FormQuestionModuleSchema>;
