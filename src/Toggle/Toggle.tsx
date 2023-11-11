import {JSX} from 'react';
import {
    Control,
    Controller
} from 'react-hook-form';
import {IonToggle} from '@ionic/react';

export interface IonToggleProps {
    alignment?: 'center' | 'start',
    checked?: boolean,
    color?: 'danger'
	 | 'dark'
	 | 'light'
	 | 'medium'
	 | 'primary'
	 | 'secondary'
	 | 'success'
	 | 'tertiary'
	 | 'warning'
	 | string
	 | undefined,
    disabled?: boolean,
    enableOnOffLabels?: boolean | undefined,
    justify?: 'end' | 'space-between' | 'start',
    labelPlacement?: 'fixed' | 'floating' | 'stacked' | undefined,
    legacy?: boolean | undefined,
    mode?: 'ios' | 'md',
    name: string,
    value?: null | string | undefined
};

export interface ToggleProps extends IonToggleProps {
    control: Control<any>,
    label?: string,
    testId?: string
};

export const Toggle = ({
    control,
    label,
    testId,
    ...props
}: ToggleProps): JSX.Element => {
    return (
	<>
	    <Controller
	    	name={props.name}
		control={control}
		render={({
		field: {
		onChange,
		onBlur,
		...fields
		},
		}: any): JSX.Element => (
		    <IonToggle
			data-testid={testId}
		    	onIonChange={(event) => {
			    onChange(event.detail.checked);
			}}
			{...fields}
			{...props}
		    >
			{label}
		    </IonToggle>
		)} />
	</>
    );
};
