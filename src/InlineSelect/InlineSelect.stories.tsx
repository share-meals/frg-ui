import {
  IonButton,
  IonItem
} from '@ionic/react';
import {InlineSelect} from './InlineSelect';
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
  render: ({
    name = 'field',
    ...props
  }) => {
    const schema = z.object({
      field: z.string()
    });
    const {
      control,
      formState: {isValid},
      handleSubmit
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
    const onSubmit = handleSubmit(() => {});

    return (
      <>
      <form
	noValidate
	onSubmit={onSubmit}>
	<InlineSelect
	// @ts-ignore
	  control={control}
	  justify='start'
	  labelPlacement='end'
	name={name}
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
	<IonButton
	  type='submit'>
	  Submit
	</IonButton>
      </form>
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
