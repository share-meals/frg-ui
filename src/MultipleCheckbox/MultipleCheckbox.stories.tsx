import {
  IonButton,
  IonItem
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

import {MultipleCheckbox} from './MultipleCheckbox';
import type {MultipleCheckboxOption} from './MultipleCheckbox';

const options: MultipleCheckboxOption[] = [
  {
    value: 'dr who',
    label: 'Dr. Who'
  },
  {
    value: 'star trek',
    label: 'Star Trek'
  },
  {
    value: 'warehouse 13',
    label: 'Warehouse 13'
  },
]

const meta: Meta<typeof MultipleCheckbox> = {
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
  component: MultipleCheckbox,
  render: (props) => {
    const schema = z.object({
      field: z.string() // todo: allow numbers? other values?
	      .array()
	      .min(props.minSelections ?? 0)
    });
    const {
      control,
      handleSubmit,
      formState: {isValid}
    } = useForm<z.infer<typeof schema>>({
      defaultValues: {
	field: props.defaultValue ?? []
      },
      mode: 'onChange',
      resolver: zodResolver(schema)
    });
    const field: string[] = useWatch({
      control,
      name: 'field'
    });
    const onSubmit = handleSubmit(() => {});

    return (
      <form
	noValidate
	onSubmit={onSubmit}>
	<MultipleCheckbox
	{...props}
	  control={control}
	  name='field'
	  options={props.options ?? options}
	/>
	<div className='ion-margin-top'>
	  <p>
	    value of field: {field.join(', ')}
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
    );
  },
  title: 'Components/MultipleCheckbox'
};

export default meta;
type Story = StoryObj<typeof MultipleCheckbox>;

export const Default: Story = {
  args: {}
}

export const WithStringOnlyOptions: Story = {
  args: {
    options: [
      'New York City',
      'Boston',
      'Denver',
    ],
    wrapper: ({children}) => <IonItem>{children}</IonItem>
  }
}


export const WithWrapper: Story = {
  args: {
    wrapper: ({children}) => <IonItem>{children}</IonItem>
  }
}

export const WithWrapperMaxSelections: Story = {
  args: {
    wrapper: ({children}) => <IonItem>{children}</IonItem>,
    maxSelections: 2
  }
}

export const WithWrapperMinSelections: Story = {
  args: {
    wrapper: ({children}) => <IonItem>{children}</IonItem>,
    minSelections: 2
  }
}

export const WithWrapperMinMaxSelections: Story = {
  args: {
    wrapper: ({children}) => <IonItem>{children}</IonItem>,
    maxSelections: 2,
    minSelections: 2
  }
}

export const WithOneDefaultValue: Story = {
  args: {
    defaultValue: ['warehouse 13'],
    wrapper: ({children}) => <IonItem>{children}</IonItem>,
  }
}

export const WithTwoDefaultValues: Story = {
  args: {
    defaultValue: ['warehouse 13', 'dr who'],
    wrapper: ({children}) => <IonItem>{children}</IonItem>,
  }
}
