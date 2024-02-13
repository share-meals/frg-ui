import {
  Control,
  Controller
} from 'react-hook-form';
import {
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import {
  JSX
} from 'react';

import './Select.scss';

export interface SelectOption {
  value: string,
  label: string
};

export interface Select extends React.ComponentProps<typeof IonSelect> {
  control: Control<any>,
  name: string,
  options: SelectOption[],
  required?: boolean,
  testId?: string
}

export const Select = ({
  control,
  name,
  options,
  required = false,
  testId,
  ...props
}: Select): JSX.Element =>
  <Controller
  control={control}
  name={name}
  render={({
    field: {
      onChange,
      onBlur,
      ...fields
    }
  }: any): JSX.Element =>
    <IonSelect
      required={required}
      data-testid={testId}
      onIonChange={(event) => {
	onChange(event.detail.value);
      }}
      {...props}
      {...fields}>
      {options.map((option: SelectOption) => 
	<IonSelectOption value={option.value} key={option.value}>
	  {option.label}
	</IonSelectOption>)
      }
    </IonSelect>
  }
  />;
