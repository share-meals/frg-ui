import {
  IonButton
} from '@ionic/react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import {
  useForm,
  useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Textarea} from './Textarea';

const meta: Meta<typeof Input> = {
  component: Textarea,
  render: (props) => {
    const schema = z.object({
      field: z.string()
	      .min(10)
	      .max(100)
    });
    type schemaType = z.infer<typeof schema>;
    const {
      control,
      handleSubmit
    } = useForm<schemaType>({
      mode: 'onChange',
      resolver: zodResolver(schema)
    });
    const field: string = useWatch({
      control,
      name: 'field'
    });
    const onSubmit = handleSubmit((data) => {
      console.log(data);
    });
    return (
      <form
	noValidate
	onSubmit={onSubmit}>
	<Textarea
	{...props}
	  control={control}
	  name='field'
	/>
	<div className='ion-margin-top'>
	  value of field: {field}
	</div>
	<IonButton
	  type='submit'>
	  Submit
	</IonButton>
      </form>
    );
  },
  title: 'Components/Textarea',
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'label'
  }
}

export const LabelAbove: Story = {
  args: {
    label: 'label above',
    labelPlacement: 'above'
  }
}

export const LabelFixed: Story = {
  args: {
    label: 'label fixed',
    labelPlacement: 'fixed'
  }
}

export const LabelFloating: Story = {
  args: {
    label: 'label floating',
    labelPlacement: 'floating'
  }
}

export const LabelStacked: Story = {
  args: {
    label: 'label stacked',
    labelPlacement: 'stacked'
  }
}

export const LabelUndefined: Story = {
  args: {
    label: 'label undefined',
  }
}

export const Required: Story = {
  args: {
    label: 'label required',
    labelPlacement: 'floating',
    required: true
  }
}

export const Autogrow: Story = {
  args: {
    'auto-grow': true,
    label: 'autogrow',
    labelPlacement: 'floating',
    required: true
  }
}

export const MaxLength: Story = {
  args: {
    maxlength: 3,
    label: 'max length = 3',
  }
}

export const Rows: Story = {
  args: {
    label: 'rows = 10',
    rows: 10
  }
}

export const RowsAndAutogrow: Story = {
  args: {
    label: 'rows = 5 and autogrow',
    rows: 5,
    'auto-grow': true
  }
}
