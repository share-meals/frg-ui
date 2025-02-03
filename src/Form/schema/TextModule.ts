import {moduleEnum} from './enums';
import {z} from 'zod';

export const TextModuleSchema = z.object({
  module: moduleEnum.extract(['text']),
  text: z.string()
});

export type TextModule = z.infer<typeof TextModuleSchema>;
