import {
    Control,
    Controller
} from 'react-hook-form';
import {
    JSX
} from 'react';
import {
    IonRadio,
    IonRadioGroup,
} from '@ionic/react';
import {
    color,
    justify,
    mode,
} from '@/interfaces/ionic';

export interface IonRadioGroup {
    allowEmptySelection?: boolean,
    name?: string,
    value?: any
}

export interface IonRadio {
    alignment?: 'center' | 'start',
    color?: color,
    disabled?: boolean,
    justify?: justify,
    labelPlacement?: 'end' | 'fixed' | 'stacked' | 'start',
    //legacy?: boolean | undefined,
    mode?: mode,
    name: string,
    value?: any
};

export interface RadioOption extends Exclude<IonRadio, 'alignment' | 'justify' | 'labelPlacement'> {

};

export interface Radio extends IonRadioGroup {
    alignment?: 'center' | 'start',
    control: Control<any>,
    justify?: justify,
    labelPlacement?: 'end' | 'fixed' | 'stacked' | 'start',
    mode: mode,
    name: string,
    options: RadioOption[],
    optionSize?: string,
    testId?: string,
    wrapper?: React.ComponentType<React.PropsWithChildren<{}>>
};

export const Radio = ({
    alignment = 'center',
    control,
    justify = 'start',
    labelPlacement = 'end',
    name,
    options,
    optionSize = '12',
    testId,
    wrapper: Wrapper = ({children}) => children,
    ...props
}: Radio): JSX.Element => <Controller
	control={control}
	name={name}
    render={({
	field: {
	    onChange,
	    onBlur,
	    ...fields
	}
    }: any): JSX.Element =>
	<IonRadioGroup
	    data-testid={testId}
	    onIonChange={(event) => {
		onChange(event.detail.value);
	    }}
	    {...props}
	    {...fields}>
	    {options.map((option: RadioOption) =>
		<Wrapper key={option.value}>
		    <IonRadio
			value={option.value}
			{...{
			    alignment,
			    justify,
			    labelPlacement
			}}>
			{option.name}
		    </IonRadio>
		</Wrapper>
	    )}
	</IonRadioGroup>	
    }
    />
;
