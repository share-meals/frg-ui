import {
    JSX
} from 'react';
import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonInput,
    IonLabel,
} from '@ionic/react';

// todo: find a way for props to be required?
export interface IonInputProps {
    autocapitalize?: 'characters' | 'none' | 'off' | 'on' | 'sentences' | 'words',
    autocomplete?:
    'additional-name'
    | 'address-level1'
    | 'address-level2'
    | 'address-level3'
    | 'address-level4'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'cc-additional-name'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-family-name'
    | 'cc-given-name'
    | 'cc-name'
    | 'cc-number'
    | 'cc-type'
    | 'country'
    | 'country-name'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'impp'
    | 'language'
    | 'name'
    | 'new-password'
    | 'nickname'
    | 'off'
    | 'on'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'photo'
    | 'postal-code'
    | 'sex'
    | 'street-address'
    | 'tel'
    | 'tel-area-code'
    | 'tel-country-code'
    | 'tel-extension'
    | 'tel-local'
    | 'tel-national'
    | 'transaction-amount'
    | 'transaction-currency'
    | 'url'
    | 'username',
    autocorrect?: 'off' | 'on',
    autofocus?: boolean,
    clearInput?: boolean,
    clearOnEdit?: boolean,
    color?:
    'danger'
    | 'dark'
    | 'light'
    | 'medium'
    | 'primary'
    | 'secondary'
    | string
    | 'success'
    | 'tertiary'
    | undefined
    | 'warning',
    counter?: boolean,
    counterFormatter?: ((inputLength: number, maxLength: number) => string) | undefined,
    debounce?: number | undefined,
    disabled?: boolean,
    enterykeyhint?: 'done' | 'enter' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined,
    errorText?: string | undefined,
    fill?: 'floating' | 'outline' | 'solid',
    helperText?: string,
    inputmode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | undefined | 'url',
    label?: string,
    labelPlacement?: 'above' | 'fixed' | 'floating' | 'stacked' | undefined,
    legacy?: boolean | undefined,
    max?: number | string | undefined,
    maxlength?: number | undefined,
    min?: number | string | undefined,
    minLength?: number | undefined,
    mode?: 'ios' | 'md',
    mulitple?: boolean | undefined,
    name: string,
    pattern?: string | undefined,
    placeholder?: string | undefined,
    readonly?: boolean,
    required?: boolean,
    shape?: 'round' | undefined,
    size?: number | undefined,
    spellcheck?: boolean,
    step?: string | undefined,
    type?: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week',
    value?: null | number | string | undefined,
};

export interface InputProps extends IonInputProps {
    control: Control<any>,
    className?: string,
    testId?: string
}
export const Input = ({
    className,
    control,
    disabled,
    fill = 'outline',
    label,
    labelPlacement = 'floating',
    name,
    testId,
    ...props
}: InputProps): JSX.Element =>
    <Controller
    {...{
	control,
	disabled,
	name
    }}
	render={({
	    field: {
		onChange,
		onBlur,
		...fields
	    },
	    fieldState
	}: any): JSX.Element => {
	    let classes: string[] = [];
	    if(className){
		classes.push(className);
	    }
	    if(fieldState.invalid){
		classes.push('ion-invalid');
	    }else{
		classes.push('ion-valid');
	    }
	    if(fieldState.isTouched){
		classes.push('ion-touched');
	    }
	    // todo: label accessibility
	    return <>
		{
		    labelPlacement === 'above' &&
		    <IonLabel>
			{label}
		    </IonLabel>
		}
		<IonInput
		aria-label={label}
		className={classes.join(' ')}
		data-testid={testId}
		errorText={fieldState.error?.message}
		onIonInput={onChange}
		onIonBlur={onBlur}
		label={labelPlacement === 'above' ? undefined : label}
		labelPlacement={labelPlacement === 'above' ? undefined : labelPlacement}
		{...{
		    fill,
		}}
		{...props}
		{...fields}
		/>
	    </>;
	}}
    />;
