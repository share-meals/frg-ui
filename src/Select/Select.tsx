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

export interface SelectOption {
  value: string,
  label: string
};

export interface Select extends React.ComponentProps<typeof IonSelect> {
  control: Control<any>,
  name: string,
  options: SelectOption[],
  testId?: string
}

export const Select = ({
  control,
  name,
  options,
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
