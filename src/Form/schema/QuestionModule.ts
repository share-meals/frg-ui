import {
  moduleEnum,
  questionTypeEnum,
} from './enums';
import {z} from 'zod';

const CommonSchema = z.object({
  module: moduleEnum.extract(['question']),
  name: z.string(),
})

export const MultipleChoiceQuestionSchema = CommonSchema.merge(
  z.object({
    maxSelections: z.number().min(0), // TODO: set max based on number of options
    options: z.array(z.string()),
    type: questionTypeEnum.extract(['multipleChoice']),
    text: z.string(),
    required: z.boolean()
  })
);

export type MultipleChoiceQuestion = z.infer<typeof MultipleChoiceQuestionSchema>;

export const QuestionModuleSchema = z.union([
  MultipleChoiceQuestionSchema,
  MultipleChoiceQuestionSchema, // TODO: remove duplicate; only included because z.union expects 2 args
]);

export type QuestionModule = z.infer<typeof QuestionModuleSchema>;
