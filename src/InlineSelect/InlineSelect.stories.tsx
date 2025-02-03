import {InlineSelect} from './InlineSelect';
import {IonItem} from '@ionic/react';
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


const meta: Meta<typeof InlineSelect> = {
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
  component: InlineSelect,
  render: (props) => {
    const schema = z.object({
      field: z.string()
    });
    const {
      control,
      formState: {isValid}
    } = useForm<z.infer<typeof schema>>({
      defaultValues: {
	field: props.defaultValue ?? undefined
      },
      mode: 'onChange',
      resolver: zodResolver(schema)
    });
    const field: string = useWatch({
      control,
      name: 'field'
    });
    return (
      <>
	<InlineSelect
	  control={control}
	  justify='start'
	  labelPlacement='end'
	  name='field'
	{...props}
	/>
	<div className='ion-margin-top'>
	  <p>
	    value: {field}
	  </p>
	  <p>
	    isValid: {isValid ? 'true' : 'false'}
	  </p>
	</div>
      </>
    );
  },
  title: 'Components/InlineSelect'
}

export default meta;
type Story = StoryObj<typeof InlineSelect>;

export const WithStringOnlyOptions: Story = {
  args: {
    justify: 'start',
    labelPlacement: 'end',
    options: [
      'New York City',
      'Boston',
      'Vancouver',
    ],
    wrapper: ({children}) => <IonItem>{children}</IonItem>
  }
};

export const WithValueLabelOptions: Story = {
  args: {
    options: [
      {
	value: 'nyc',
	label: 'New York City',
      },
      {
	value: 'boston',
	label: 'Boston',
      },
      {
	value: 'vancouver',
	label: 'Vancouver',
      }
    ],
    wrapper: ({children}) => <IonItem>{children}</IonItem>
  }
};

export const WithMixedDatatypeOptions: Story = {
  args: {
    options: [
      {
	value: 'nyc',
	label: 'New York City',
      },
      'Boston',
      'Vancouver'
    ],
    wrapper: ({children}) => <IonItem>{children}</IonItem>
  }
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'boston',
    options: [
      {
	value: 'nyc',
	label: 'New York City',
      },
      {
	value: 'boston',
	label: 'Boston',
      },
      {
	value: 'vancouver',
	label: 'Vancouver',
      }
    ],
    wrapper: ({children}) => <IonItem>{children}</IonItem>,
  }
}
