import {
    Control,
    Controller
} from 'react-hook-form';
import {
    JSX
} from 'react';
import {
    IonCol,
    IonGrid,
    IonRadio,
    IonRadioGroup,
    IonRow,
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
    labelPlacement: 'end' | 'fixed' | 'stacked' | 'start',
    //legacy?: boolean | undefined,
    mode?: mode,
    name: string,
    value?: any
};

export interface RadioOption extends Exclude<IonRadio, 'alignment' | 'justify' | 'labelPlacement'> {

};

export interface RadioProps extends IonRadioGroup {
    alignment?: 'center' | 'start',
    control: Control<any>,
    justify?: justify,
    labelPlacement: 'end' | 'fixed' | 'stacked' | 'start',
    name: string,
    options: RadioOption[],
    optionSize: string | undefined,
    testId?: string
};

export const Radio = ({
    alignment = 'center',
    control,
    justify = 'start',
    labelPlacement = 'end',
    name,
    options,
    optionSize,
    testId,
    ...props
}: RadioProps): JSX.Element =>
    <IonGrid>
	<IonRow>
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
	    <IonRadioGroup
		data-testid={testId}
		onIonChange={(event) => {
		    onChange(event.detail.value);
		}}
		{...props}
		{...fields}>
		{options.map((option: RadioOption) =>
		    <IonCol
			key={option.value}
			size="12">
			<IonRadio
			    value={option.value}
			    {...{
				alignment,
				justify,
				labelPlacement
			    }}>
			    {option.name}
			</IonRadio>
			<br />
		    </IonCol>
		)}
	    </IonRadioGroup>
	
	}
    />
	</IonRow>
</IonGrid>
;
