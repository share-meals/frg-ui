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

import {Select} from './Select';
import type {
  Select as SelectProps,
  SelectOption
} from './Select';

const options: SelectOption[] = [
  {
    value: 'paella',
    label: 'Paella'
  },
  {
    value: 'risotto',
    label: 'Risotto'
  },
  {
    value: 'churros',
    label: 'Churros'
  }
];

const meta: Meta<SelectProps & {defaultValue: string}> = {
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
  component: Select,
  render: ({
    defaultValue,
    ...props
  }) => {
    const schema = z.object({
      field: props.multiple
	   ? props.required
	   ? z.array(z.string()).nonempty() // multiple required
	   : z.array(z.string()).optional() // multiple
	   : props.required
	   ? z.string() // single required
	   : z.string().optional() // single
    });
    type schemaType = z.infer<typeof schema>;
    const {
      control,
      handleSubmit
    } = useForm<schemaType>({
      defaultValues: {
	field: defaultValue
      },
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
	<Select
	{...props}
	  control={control}
	  name='field'
	options={options}
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
  title: 'Components/Select'
}

export default meta;
type Story = StoryObj<SelectProps & {defaultValue: string}>;

export const Default: Story = {
  args: {
    label: 'label',
  }
};

export const AsPopover: Story = {
  args: {
    label: 'label',
    interface: 'popover'
  }
};

export const WithDefaultValue: Story = {
  args: {
    label: 'label',
    defaultValue: 'churros'
  }
};

export const Required: Story = {
  args: {
    label: 'required',
    required: true
  }
};

export const RequiredOutline: Story = {
  args: {
    fill: 'outline',
    label: 'required',
    required: true
  }
};

export const Outline: Story = {
  args: {
    fill: 'outline',
    label: 'outlined',
  }
}

export const Multiple: Story = {
  args: {    
    label: 'multiple',
    multiple: true
  }
}

export const RequiredMultiple: Story = {
  args: {    
    label: 'multiple',
    multiple: true,
    required: true
  }
}
