import {z} from 'zod';

export const moduleEnum = z.enum([
  'text',
  'question'
]);

export const questionTypeEnum = z.enum([
  'multipleChoice',
  'singleChoice',
]);
