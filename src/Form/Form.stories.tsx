import type {
  Meta,
  StoryObj
} from '@storybook/react';
import {Form} from './Form';
import {
  Form as FormType,
} from './schema';

const json: FormType = {
  meta: {
    id: '20240214',
  },
  pages: [
    [
      // page 1
      {
        module: "text",
        text: `# Hunter College Smart Pantry Page 1

This is explainer text`,
      },
      {
        // question 1
        module: "question",
        name: "screener1",
        type: "multipleChoice",
        text: `We worried whether our food would run out before we got money to buy more.  
In the last 12 months, this statement was:`,
        options: [
          "Often True",
          "Sometimes True",
          "Never True",
          "Don't Know",
        ],
        maxSelections: 1,
        required: true,
      },
      {
      // question 2
        module: "question",
        name: "screener2",
        type: "multipleChoice",
        text: `The food we bought just didn't last and we didn't have money to get more.  
In the last 12 months, this statement was:`,
        options: [
          "Often True",
          "Sometimes True",
          "Never True",
          "Don't Know",
        ],
        maxSelections: 1,
        required: true,
      },
    ],
    [
      // page 2
      {
        module: "text",
        text: `# Hunter College Smart Pantry Page 2

This is explainer text`,
      },
      {
        // question 1
        module: "question",
        name: "screener1",
        type: "multipleChoice",
        text: `We worried whether our food would run out before we got money to buy more.  
In the last 12 months, this statement was:`,
        options: [
          "Often True",
          "Sometimes True",
          "Never True",
          "Don't Know",
        ],
        maxSelections: 1,
        required: true,
      },
      {
      // question 2
        module: "question",
        name: "screener2",
        type: "multipleChoice",
        text: `The food we bought just didn't last and we didn't have money to get more.  
In the last 12 months, this statement was:`,
        options: [
          "Often True",
          "Sometimes True",
          "Never True",
          "Don't Know",
        ],
        maxSelections: 1,
        required: true,
      },
    ],
  ],
};


const meta: Meta<typeof Form> = {
  component: Form,
  render: ({...props}) => {
    return <Form {...props} />;
  },
  title: 'Components/Form'
}

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    json
  }
};
