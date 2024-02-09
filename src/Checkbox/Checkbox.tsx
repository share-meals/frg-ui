import {
    Control,
    Controller,
} from 'react-hook-form';
import {
    IonCheckbox
} from '@ionic/react';

export interface CheckboxProps extends React.ComponentProps<typeof IonCheckbox> {
  control: Control<any>,
  label: string,
  name: string, // redefine prop as required
  testId?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({
  control,
  label,
  name,
  testId,
  ...props
}) => {
  return <Controller
	   control={control}
	   name={name}
	   render={
	   ({
	     field: {
	       onBlur,
	       onChange,
	       value,
	       ...fields
	     }
	   }) => <IonCheckbox
		   checked={value}
		   data-testid={testId}
		   onIonChange={(event) => {
		     onChange(event.detail.checked);
		   }}
	     {...fields}
	     {...props}>
	     {label}
	   </IonCheckbox>
	   }
  />;
}
