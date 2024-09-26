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
  SelectProps,
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

const meta: Meta<SelectProps> = {
  component: Select,
  render: () => {
    const schema = z.object({
      field: z.string().optional()
    });
    type schemaType = z.infer<typeof schema>;
    const {
      control: controlPrimary,
      handleSubmit: handleSubmitPrimary
    } = useForm<schemaType>({
      mode: 'onBlur',
      resolver: zodResolver(schema)
    });
    const {
      control: controlSecondary,
      handleSubmit: handleSubmitSecondary
    } = useForm<schemaType>({
      mode: 'onBlur',
      resolver: zodResolver(schema)
    });
    
    const fieldPrimary = useWatch({
      control: controlPrimary,
      name: 'field'
    });
    const fieldSecondary = useWatch({
      control: controlSecondary,
      name: 'field'
    });

    const onSubmitPrimary = handleSubmitPrimary((data) => {
      console.log('primary', data);
    });
    const onSubmitSecondary = handleSubmitSecondary((data) => {
      console.log('secondary', data);
    });
    return (
      <>
	<form
	  id='primary-form'
	noValidate
	  onSubmit={onSubmitPrimary} />
	<form
	  id='secondary-form'
	  noValidate
	  onSubmit={onSubmitSecondary} />
	<Select
	  control={controlPrimary}
	  form='primary-form'
	label='Primary Select'
	  name='field'
	options={options}
	/>
	<Select
	control={controlSecondary}
	form='secondary-form'
	label='Secondary Select'
	name='field'
	options={options}
	/>
	<div className='ion-margin-top'>
	  value of primary field: {fieldPrimary}
	  <br />
	  value of secondary field: {fieldSecondary}
	</div>
	<IonButton
	  form='primary-form'
	  type='submit'>
	  Submit Primary
	</IonButton>
	<IonButton
	  form='secondary-form'
	  type='submit'>
	  Submit Secondary
	</IonButton>
      </>
    );
  },
  title: 'Components/Select',
};

export default meta;
type Story = StoryObj<SelectProps>;

export const MultipleStories: Story = {
}
