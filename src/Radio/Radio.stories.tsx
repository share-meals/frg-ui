import type {
    Meta,
    StoryObj
} from '@storybook/react';
import {
    IonItem,
    IonList
} from '@ionic/react';

import {
    useForm,
    useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Radio} from './Radio';
import type {
    Radio as RadioProps,
    RadioOption
} from './Radio';

const options: RadioOption[] = [
    {
	name: 'Great Barrier Reef',
	value: 'great_barrier_reef'
    },
    {
	name: 'Ganges River',
	value: 'ganges_river'
    },
    {
	name: 'Caspian Sea',
	value: 'caspian_sea'
    },
    {
	name: 'Lake Baikal',
	value: 'lake_baikal'
    },
];

const meta: Meta<RadioProps & {defaultValue: string}> = {
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
    component: Radio,
    render: ({
	defaultValue,
	...props
    }) => {
	const schema = z.object({
	    field: z.string()
	});
	type schemaType = z.infer<typeof schema>;
	const {
	    control
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
	return (
	    <>
		<IonList>
		<Radio
		{...props}
		    control={control}
		    name='field'
		options={options}
		wrapper={IonItem}
		/>
		</IonList>
		<br />
		value of field: {field}
	    </>
	);
    },
    title: 'Components/Radio'
}

export default meta;
type Story = StoryObj<RadioProps & {defaultValue: string}>;

export const Default: Story = {
    args: {
	labelPlacement: 'end',
    }
};

export const WithDefaultValue: Story = {
    args: {
	defaultValue: 'caspian_sea'
    }
};

export const WithWrapperOptions: Story = {
    args: {
      wrapperOptions: {lines: 'none'}
    }
};
