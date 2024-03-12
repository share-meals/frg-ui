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
      fieldState: {
	error,
	invalid,
	isTouched
      },
      formState: {
	isSubmitted
      }
    }: any): JSX.Element => {
      let classes: string[] = [];
      if(className){
	classes.push(className);
      }
      if(invalid){
	classes.push('ion-invalid');
      }else{
	classes.push('ion-valid');
      }
      if(isTouched || isSubmitted){
	classes.push('ion-touched');
      }
      // todo: label accessibility
      const normalizedLabel = `${label}${props.required ? ' *' : ''}`;
      return <>
	{
	  labelPlacement === 'above' &&
	  <IonLabel>
	    {normalizedLabel}
	  </IonLabel>
	}
	<IonInput
	aria-label={normalizedLabel}
	className={classes.join(' ')}
	data-testid={testId}
	errorText={error?.message}
	onIonInput={onChange}
	onIonBlur={onBlur}
	label={labelPlacement === 'above' ? undefined : normalizedLabel}
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
