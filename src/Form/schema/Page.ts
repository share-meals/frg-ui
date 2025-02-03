import {TextModuleSchema} from './TextModule';
import {QuestionModuleSchema} from './QuestionModule';
import {z} from 'zod';

export const PageSchema = z.array(
  z.union([
    TextModuleSchema,
    QuestionModuleSchema
  ])
);

export type Page = z.infer<typeof PageSchema>;
