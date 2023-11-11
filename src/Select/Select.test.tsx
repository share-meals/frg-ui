import {act} from 'react-dom/test-utils';
import {
    Control,
    useForm
} from 'react-hook-form';
import {
    render,
    renderHook,
    screen
} from '@testing-library/react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Select} from './Select';
import type {SelectOption} from './Select';


const options: SelectOption[] = [
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
];

describe('Select Component', () => {
    const schema = z.object({
	field: z.string()
    });
    type schemaType = z.infer<typeof schema>;
    //const user = userEvent.setup();    
    const {
	result
    } = renderHook(() => useForm<schemaType>({
	resolver: zodResolver(schema)
    }));

    const control: Control<schemaType> = result.current.control;

    beforeEach(async () => {
	// reset the form values for each test
	// need to wrap in act() because reset() alters react state
	await act(
	    async () => {
		result.current.reset();
	    }
	);
    });

    it('should render', () => {
	render(
	    <Select
		control={control}
		name='field'
		options={options}
		testId='select-component'
	    />
	);
	expect(screen.getByTestId('select-component')).toBeDefined();
    });    
});
