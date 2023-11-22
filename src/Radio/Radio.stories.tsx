import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {
    SubmitHandler,
    useForm,
    useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Radio} from './Radio';
import type {RadioOption} from './Radio';

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

const meta: Meta<typeof Radio> = {
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
	console.log(props);
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
		<Radio
		{...props}
		    control={control}
		    name='field'
		options={options}
		/>
		<br />
		value of field: {field}
	    </>
	);
    },
    title: 'Components/Radio'
}

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    args: {
	justify: 'end',
	labelPlacement: 'end',
	optionSize: '12',
    }
};
