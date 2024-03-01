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

import {Datetime} from './Datetime';

const meta: Meta<typeof Datetime> = {
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
  component: Datetime,
  render: ({
    defaultValue = '2024-05-12T11:30:00',
    ...props
  }) => {
    const schema = z.object({
      field: z.string()
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
    const field: any = useWatch({
      control,
      name: 'field'
    });
    console.log(typeof field);
    return (
      <>
	<Datetime
	{...props}
	  control={control}
	label='field'
	  name='field'
	/>
	<div className='ion-margin-top'>
	  value of field: {field.toString()}
	</div>
      </>
    );
  },
  title: 'Components/Datetime'
};

export default meta;
type Story = StoryObj<typeof Datetime>;

export const Default: Story = {
  args: {}
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const ModeIOS: Story = {
  args: {
    mode: 'ios'
  }
}

export const ModeMD: Story = {
  args: {
    mode: 'md'
  }
}
