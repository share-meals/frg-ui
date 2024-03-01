import {
  Control,
  Controller
} from 'react-hook-form';
import {
  IonLabel,
  IonTextarea,
} from '@ionic/react';


export interface TextareaProps
extends Omit<React.ComponentProps<typeof IonTextarea>, 'labelPlacement'>{
  control: Control<any>,
  className?: string,
  labelPlacement?: 'above' | 'end' | 'fixed' | 'floating' | 'stacked' | 'start',
  name: string,
  testId?: string
}

export const Textarea = ({
  className,
  control,
  disabled,
  fill = 'outline',
  label,
  labelPlacement = 'floating',
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
      fieldState,
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
      const normalizedLabel = `${label}${props.required ? ' *' : ''}`;
      return <>
	{
	  labelPlacement === 'above' &&
	  <IonLabel>
	    {normalizedLabel}
	  </IonLabel>
	}
	<IonTextarea
	  aria-label={normalizedLabel}
	  className={classes.join(' ')}
	  data-testid={testId}
	  errorText={fieldState.error?.message}
	  fill={fill}
	  onIonInput={onChange}
	  onIonBlur={onBlur}
	  label={labelPlacement === 'above' ? undefined : normalizedLabel}
	  labelPlacement={labelPlacement === 'above' ? undefined : labelPlacement}
	  {...props}
	{...fields}
	/>
      </>;
    }}
  />;
