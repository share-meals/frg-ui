import {
  Control,
  Controller
} from 'react-hook-form';
import {IonTextarea} from '@ionic/react';


export interface TextareaProps
extends React.ComponentProps<typeof IonTextarea>{
  control: Control<any>,
  className?: string,
  name: string,
  testId?: string
}

export const Textarea = ({
  className,
  control,
  disabled,
  label,
  name,
  testId,
  ...props
}: TextareaProps): React.JSX.Element =>
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
      let classes: string[] = ['frg-ui-textarea'];
      if(className){
	classes.push(className);
      }
      if(invalid){
	classes.push('ion-invalid');
      }else{
	classes.push('ion-valid');
      }
      if(isTouched
	 || isSubmitted){
	classes.push('ion-touched');
      }
      // todo: label accessibility
      const normalizedLabel = `${label}${props.required ? ' *' : ''}`;
      return <IonTextarea
	  aria-label={normalizedLabel}
	  className={classes.join(' ')}
	  data-testid={testId}
	  errorText={error?.message}
	  onIonInput={onChange}
	  onIonBlur={onBlur}
	  label={normalizedLabel}
	  {...props}
	{...fields}
	/>;
    }}
  />;
