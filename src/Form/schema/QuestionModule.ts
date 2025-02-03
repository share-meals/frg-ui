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
  })
);

export type MultipleChoiceQuestion = z.infer<typeof MultipleChoiceQuestionSchema>;

export const SingleChoiceQuestionSchema = CommonSchema.merge(
  z.object({
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
  })
);

export type SingleChoiceQuestion = z.infer<typeof SingleChoiceQuestionSchema>;


export const QuestionModuleSchema = z.union([
  MultipleChoiceQuestionSchema,
  SingleChoiceQuestionSchema,
]);

export type QuestionModule = z.infer<typeof QuestionModuleSchema>;
