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
      {
        module: "text",
        text: `# Page 1

This is explainer text`,
      },
      {
        module: "question",
        name: "singleChoiceStrings",
        type: "singleChoice",
        text: `Single Choice Strings`,
        options: [
          "The",
          "Quick",
          "Brown",
          "Fox",
        ],
        required: true,
      },
      {
        module: "question",
        name: "singleChoiceValueLabel",
        type: "singleChoice",
        text: `Single Choice Value-Label Objects`,
        options: [
	  {
	    value: 'the',
	    label: 'The'
	  },
	  {
	    value: 'quick',
	    label: 'Quick'
	  },
	  {
	    value: 'brown',
	    label: 'Brown'
	  },
	  {
	    value: 'fox',
	    label: 'Fox'
	  },
        ],
        required: true,
      },
    ],
    [
      // page 2
      {
        module: "text",
        text: `# Page 2

This is explainer text`,
      },
      {
        module: "question",
        name: "multipleChoiceStrings",
        type: "multipleChoice",
        text: `Multiple Choice Strings`,
        options: [
          "The",
          "Quick",
          "Brown",
          "Fox",
        ],
        required: true,
      },
      {
        module: "question",
        name: "multipleChoiceValueLabel",
        type: "multipleChoice",
        text: `Multiple Choice Value-Label Objects`,
        options: [
	  {
	    value: 'the',
	    label: 'The'
	  },
	  {
	    value: 'quick',
	    label: 'Quick'
	  },
	  {
	    value: 'brown',
	    label: 'Brown'
	  },
	  {
	    value: 'fox',
	    label: 'Fox'
	  },
        ],
        required: true,
      },
    ],
  ],
};


const meta: Meta<typeof Form> = {
  component: Form,
  render: ({...props}) => {
    return <Form
    {...props}
    onSubmit={console.log}
    />;
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

export const Loading: Story = {
  args: {
    isLoading: true,
    json,
  }
};
