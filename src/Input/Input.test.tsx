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
//import userEvent from '@testing-library/user-event';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Input} from './Input';

describe('Input Component', () => {
    
    const schema = z.object({
	field: z.string()
		.min(30)
		.max(50)
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
	    <Input
		control={control}
		name='field'
		testId='input-component'
	    />
	);
	expect(screen.getByTestId('input-component')).toBeDefined();
    });


    it('should show an error when zod schema is invalid', async () => {
	// todo: figure out
	/*
	const {container} = render(
	    <>
	    <Input
		control={control}
		name='field'
		testId='input-component'
		helperText='abc'
	    />
	    <div data-testId='abc'></div>
	    </>
	);
	await user.click(screen.getByTestId('input-component'));
	await user.click(container.querySelector('input'));
	await user.keyboard('a');
	await user.click(screen.getByTestId('abc'));
	expect(container.querySelector('input').value).toBe('a');
	expect(container.firstChild).toHaveClass('ion-invalid');
	*/
    });
});
