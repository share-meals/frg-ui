import {
  Control,
  Controller,
} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {
  IonCheckbox,
  IonNote
} from '@ionic/react';

export interface CheckboxProps extends React.ComponentProps<typeof IonCheckbox> {
  control: Control<any>,
  label: string,
  name: string, // redefine prop as required
  required?: boolean,
  testId?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({
  control,
  label,
  name,
  required,
  testId,
  ...props
}) => {
  return <Controller
	   control={control}
	   name={name}
	   render={
	   ({
	     fieldState: {
	       invalid,
	     },
	     formState: {
	       isSubmitted,
	       errors
	     },
	     field: {
	       onBlur,
	       onChange,
	       value,
	       ...fields
	     }
	   }) => {
	     const normalizedLabel = `${label}${required ? ' *' : ''}`;
	     const showErrors = invalid && isSubmitted;
	     return <div style={showErrors ? {color: 'var(--ion-color-danger)'} : {}}>
	       <IonCheckbox
		 checked={value}
		 style={showErrors ? {'--border-color': 'var(--ion-color-danger)'} : {}}
		 data-testid={testId}
		 onIonChange={(event) => {
		   onChange(event.detail.checked);
		 }}
		 {...fields}
		 {...props}>
		 {normalizedLabel}
	       </IonCheckbox>
	       {errors[name] && showErrors && <IonNote style={{display: 'block', color: 'var(--ion-color-danger)'}}>
		 <ErrorMessage errors={errors} name={name} />
	       </IonNote>}
	     </div>
	   }}
  />;
}
