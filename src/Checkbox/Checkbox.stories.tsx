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

import {Checkbox} from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    control: {
      table: {
	disable: true
      }
    },
    testId: {
      table: {
	disable: true
      }
    }
  },
  component: Checkbox,
  render: ({
    defaultValue = false,
    ...props
  }) => {
    const schema = z.object({
      field: props.required ? z.literal<boolean>(true) : z.boolean()
    });
    const {
      control,
      handleSubmit
    } = useForm<z.infer<typeof schema>>({
      defaultValues: {
	field: defaultValue
      },
      mode: 'onChange',
      resolver: zodResolver(schema)
    });
    const field: string[] = useWatch({
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
	<Checkbox
	{...props}
	  control={control}
	  name='field'
	/>
	<div className='ion-margin-top'>
	  value of field: {field ? 'true' : 'false'}
	</div>
	<IonButton
	  type='submit'>
	  Submit
	</IonButton>
      </form>
    );
  },
  title: 'Components/Checkbox'
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'default'
  }
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: true,
    label: 'default true'
  }
}

export const WithLabelAtEnd: Story = {
  args: {
    label: 'label at end',
    labelPlacement: 'end'
  }
}

export const RequiredDark: Story = {
  args: {
    color: 'dark',
    label: 'label required secondary',
    required: true
  }
}

export const Required: Story = {
  args: {
    label: 'label required',
    required: true
  }
}

export const Disabled: Story = {
  args: {
    label: 'disabled',
    disabled: true
  }
}
