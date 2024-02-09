import {
  Control,
  Controller,
} from 'react-hook-form';
import {
  IonCheckbox
} from '@ionic/react';
import {
  FC,
  JSX,
  useState
} from 'react';

export interface MultipleCheckboxOption {
  value: any,
  label: string 
}

export interface MultipleCheckboxProps extends React.ComponentProps<typeof IonCheckbox> {
  control: Control<any>,
  name: string,
  options: MultipleCheckboxOption[],
  testId?: string,
  wrapper?: FC<{children: JSX.Element}>
}

export const MultipleCheckbox = ({
  control,
  name,
  options = [],
  testId,
  wrapper: Wrapper = ({children}) => children,
  ...props
}: MultipleCheckboxProps): JSX.Element => {
  const [values, setValues] = useState<string[]>([]);
  return (
    <Controller
    control={control}
    name={name}
    render={
    ({
      field: {
	onChange
      }
    }): JSX.Element => (
      <div data-testid={testId}>
	{options.map((option) =>
	  <Wrapper key={option.value}>
	    <IonCheckbox
	      onIonChange={(event) => {
		let newValues: string[];
		if(event.detail.checked){
		  newValues = [
		    ...values,
		    option.value
		  ];
		} else {
		  newValues = values.filter(v => v !== option.value);
		}
		setValues(newValues);
		onChange(newValues);
	      }}
	      value={option.value}			
	      {...props}>
	      {option.label}
	    </IonCheckbox>
	  </Wrapper>
	)}
      </div>
    )}
    />
  );
}
