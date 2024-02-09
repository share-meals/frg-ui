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
      field: z.boolean()
    });
    const {
      control
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
    return (
      <>
	<Checkbox
	{...props}
	  control={control}
	label='field'
	  name='field'
	/>
	<div className='ion-margin-top'>
	  value of field: {field ? 'true' : 'false'}
	</div>
      </>
    );
  },
  title: 'Components/Checkbox'
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {}
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: true
  }
}

export const WithLabelAtEnd: Story = {
  args: {
    labelPlacement: 'end'
  }
}
