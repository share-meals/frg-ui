import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import {
    JSX
} from 'react';

import type {
    color,
    justify,
    labelPlacement,
    mode,
} from '@/interfaces/ionic'

export interface SelectOption {
    value: string,
    label: string
};

export interface IonSelect {
    cancelText?: string,
    color?: color,
    compareWith?: ((currentValue: any, compareValue: any) => boolean)
	       | null
	       | string
	       | undefined,
    disabled?: boolean,
    expandedIcon?: string | undefined,
    fill?: 'outline' | 'solid' | undefined,
    interface?: 'action-sheet' | 'alert' | 'popover',
    interfaceOptions?: any,
    justify?: justify,
    label?: string | undefined,
    labelPlacement?: labelPlacement,
    //legacy?: boolean | undefined,
    mode?: mode,
    multiple?: boolean,
    name: string,
    okText?: string,
    placeholder?: string | undefined,
    selectedText?: null | string | undefined,
    shape?: 'round' | undefined,
    toggleIcon?: string | undefined,
    value?: any
}

export interface Select extends IonSelect {
    control: Control<any>,
    options: SelectOption[],
    testId?: string
}

export const Select = ({
    control,
    name,
    options,
    testId,
    ...props
}: Select): JSX.Element =>
    <Controller
	control={control}
	name={name}
	render={({
	    field: {
		onChange,
		onBlur,
		...fields
	    }
	}: any): JSX.Element =>
	    <IonSelect
		data-testid={testId}
		onIonChange={(event) => {
		    onChange(event.detail.value);
		}}
		{...props}
		{...fields}>
		{options.map((option: SelectOption) => 
		    <IonSelectOption value={option.value} key={option.value}>
			{option.label}
		    </IonSelectOption>)
		}
	    </IonSelect>
	}
    />;
