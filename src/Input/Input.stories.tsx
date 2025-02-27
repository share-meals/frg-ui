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

import {Input} from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  render: (props) => {
    const schema = z.object({
      field: props.required ? z.string() : z.string().optional()
    });
    type schemaType = z.infer<typeof schema>;
    const {
      control,
      handleSubmit
    } = useForm<schemaType>({
      mode: 'onBlur',
      resolver: zodResolver(schema)
    });
    const field: string | undefined = useWatch({
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
	<Input
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
  title: 'Components/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    counter: true,
    label: 'label',
    maxlength: 20,
    helperText: 'helper text'
  }
}

export const AsPassword: Story = {
  args: {
    type: 'password',
    label: 'password',
    helperText: 'must contain a number and symbol'
  }
}

export const Labeless: Story = {
  args: {
  }
}

export const LabelessRequired: Story = {
  args: {
    required: true,
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

export const Number: Story = {
  args: {
    label: 'number',
    type: 'number'
  }
}

export const Required: Story = {
  args: {
    label: 'label required',
    required: true
  }
}
