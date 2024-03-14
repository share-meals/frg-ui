import {
  Control,
  Controller,
} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {
  IonCheckbox,
  IonNote,
  IonText,
} from '@ionic/react';

export interface CheckboxProps extends React.ComponentProps<typeof IonCheckbox> {
  control: Control<any>,
  label: string,
  name: string, // redefine prop as required
  required?: boolean,
  testId?: string,
  labelWrapper?: React.FC<{children: JSX.Element | string}>
}

export const Checkbox: React.FC<CheckboxProps> = ({
  control,
  label,
  name,
  required,
  testId,
  labelWrapper: LabelWrapper = ({children}) => children,
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
	     },
	     fieldState: {
	       invalid,
	     },
	     formState: {
	       isSubmitted,
	       errors
	     },
	   }) => {
	     const normalizedLabel = `${label}${required ? ' *' : ''}`;
	     const showErrors = invalid && isSubmitted;
	     return <>
	       
		 <IonCheckbox
		   checked={value}
		   data-testid={testId}
		   onIonChange={(event) => {
		     onChange(event.detail.checked);
		   }}
		   style={showErrors ? {'--border-color': 'var(--ion-color-danger)', color: 'var(--ion-color-danger)'} : {}}
		   {...fields}
		   {...props}>
		   <LabelWrapper>
		     {normalizedLabel}
		   </LabelWrapper>
		 </IonCheckbox>
	       {errors[name] && showErrors
	       && <IonNote className='ion-margin-top' style={{display: 'block'}}>
		 <IonText color='danger'>
		   <ErrorMessage errors={errors} name={name} />
		 </IonText>
	       </IonNote>}
	     </>
	   }}
  />;
}
