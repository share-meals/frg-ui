import {
    JSX
} from 'react';
import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonSelect,
    IonSelectOption
} from '@ionic/react';

export interface SelectOption {
    value: string,
    label: string
};

export interface IonSelect {
    cancelText?: string,
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
    compareWith?: ((currentValue: any, compareValue: any) => boolean)
	       | null
	       | string
	       | undefined,
    disabled?: boolean,
    expandedIcon?: string | undefined,
    fill?: 'outline' | 'solid' | undefined,
    interface?: 'action-sheet' | 'alert' | 'popover',
    interfaceOptions?: any,
    justify?: 'end' | 'space-between' | 'start',
    label?: string | undefined,
    labelPlacement?: 'fixed' | 'floating' | 'stacked' | undefined,
    //legacy?: boolean | undefined,
    mode?: 'ios' | 'md',
    multiple?: boolean,
    name: string,
    okText?: string,
    placeholder?: string | undefined,
    selectedText?: null | string | undefined,
    shape?: 'round' | undefined,
    toggleIcon?: string | undefined,
    value?: any
}

export interface SelectProps extends IonSelect {
    control: Control<any>,
    options: SelectOption[],
    testId?: string
}

export const Select = ({
    control,
    options,
    testId,
    ...props
}: SelectProps): JSX.Element => {
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
	    }: any): JSX.Element => {
		
		return (
		    <IonSelect
			data-testid={testId}
			onIonChange={(event) => {
			    onChange(event.detail.value);
			}}
			{...props}
			{...fields}
		    >
			{options.map((option: SelectOption) => 
			    <IonSelectOption value={option.value} key={option.value}>
				{option.label}
			    </IonSelectOption>)
			}
		    </IonSelect>
		);
	    }}
	    />
	</>
    );
}
