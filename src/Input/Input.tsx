import {
  JSX
} from 'react';
import {
  Control,
  Controller
} from 'react-hook-form';
import {IonInput} from '@ionic/react';

export interface Input extends React.ComponentProps<typeof IonInput> {
  control: Control<any>,
  className?: string,
  name: string, // redefine prop as required
  testId?: string
}
export const Input = ({
  className,
  control,
  disabled,
  label,
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
      let classes: string[] = ['frg-ui-input'];
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
      const normalizedLabel = label ? `${label}${props.required ? ' *' : ''}` : undefined;
      return <IonInput
	       aria-label={normalizedLabel}
	       className={classes.join(' ')}
	       data-testid={testId}
	       errorText={error?.message}
	       onIonInput={(event) => {
		 if(props.type === 'number'){
		   event.target.value = Number(event.target.value);
		 }
		 onChange(event);
	       }}
	       onIonBlur={onBlur}
	       label={normalizedLabel}
	       {...props}
      {...fields}
      />;
    }}
  />;
