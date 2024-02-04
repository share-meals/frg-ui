import {JSX} from 'react';
import {
  Control,
  Controller,
} from 'react-hook-form';
import {IonToggle} from '@ionic/react';

export interface ToggleProps extends React.ComponentProps<typeof IonToggle> {
  control: Control<any>,
  label?: string,
  testId?: string
};

export const Toggle: React.FC<ToggleProps> = ({
  control,
  label,
  testId,
  ...props
}) => {
  return (
    <>
      <Controller
	name={props.name || ''}
	control={control}
	render={({
	  field: {
	    onChange,
	    onBlur,
	    value,
	    ...fields
	  },
	}: any): JSX.Element => (
	  <IonToggle
	    checked={value}
	    data-testid={testId}
	    onIonChange={(event) => {
	      onChange(event.detail.checked);
	    }}
	    {...fields}
	    {...props}>
	    {label}
	  </IonToggle>
	)} />
    </>
  );
};
