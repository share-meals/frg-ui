import type {
  Meta,
  StoryObj
} from '@storybook/react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {
  IonDatetimeButton,
  IonModal
} from '@ionic/react'
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
	field: defaultValue as string
      },
      mode: 'onChange',
      resolver: zodResolver(schema)
    });

    return (
      <>
	<IonDatetimeButton datetime='datetime' {...props}
	/>
	<IonModal keepContentsMounted={true}>
	  <Datetime
	    control={control}
	    id='datetime'
	    name='field'
	  />
	</IonModal>
      </>
    );
  },
  title: 'Components/Datetime'
};

export default meta;
type Story = StoryObj<typeof Datetime>;

export const WithButton: Story = {
  args: {}
}
export const WithIOSButton: Story = {
  args: {
    mode: 'ios'
  }
}
export const WithMDButton: Story = {
  args: {
    mode: 'md'
  }
}
export const WithDisabledButton: Story = {
  args: {
    disabled: true
  }
}
export const WithSecondaryButton: Story = {
  args: {
    color: 'secondary'
  }
}
export const WithWarningButton: Story = {
  args: {
    color: 'warning'
  }
}
