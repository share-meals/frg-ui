import {
  Control,
  Controller
} from 'react-hook-form';
import {
  IonDatetime
} from '@ionic/react';

export interface DatetimeProps
extends React.ComponentProps<typeof IonDatetime> {
  control: Control<any>,
  className?: string,
  name: string,
  testId?: string
}

export const Datetime: React.FC<DatetimeProps> = ({
  className,
  control,
  name,
  testId,
  ...props
}: DatetimeProps): React.JSX.Element =>
  <Controller
    {...{
      control,
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
      return <>
	<IonDatetime
	  className={classes.join(' ')}
	  data-testid={testId}
	  errorText={fieldState.error?.message}
	  onIonChange={onChange}
	  onIonBlur={onBlur}
	  {...props}
	{...fields}
	/>
      </>;
    }}
  />;
