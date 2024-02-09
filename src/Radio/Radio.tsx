import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonRadio,
    IonRadioGroup,
} from '@ionic/react';

export interface RadioOption extends Exclude<React.ComponentProps<typeof IonRadio>, 'alignment' | 'justify' | 'labelPlacement'> {};

export interface Radio extends React.ComponentProps<typeof IonRadioGroup> {
    alignment?: 'center' | 'start',
    control: Control<any>,
    justify?: 'end' | 'space-between' | 'start',
    labelPlacement?: 'end' | 'fixed' | 'stacked' | 'start',
    mode: 'ios' | 'md',
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
}: Radio): React.JSX.Element => <Controller
	control={control}
	name={name}
    render={({
	field: {
	    onChange,
	    onBlur,
	    ...fields
	}
    }: any): React.JSX.Element =>
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
