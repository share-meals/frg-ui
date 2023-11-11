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

import {Toggle} from './Toggle';

describe('Toggle Component', () => {
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
	    <Toggle
		control={control}
		name='field'
		testId='toggle-component'
	    />
	);
	expect(screen.getByTestId('toggle-component')).toBeDefined();
    });    
});
