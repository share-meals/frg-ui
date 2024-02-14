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

import './Input.scss'

export interface Input extends Omit<React.ComponentProps<typeof IonInput>, 'labelPlacement'> {
  control: Control<any>,
  className?: string,
  labelPlacement?: 'above' | 'end' | 'fixed' | 'floating' | 'stacked' | 'start',
  name: string, // redefine prop as required
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
}: Input): JSX.Element =>
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
