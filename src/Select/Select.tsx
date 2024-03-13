import {
  Control,
  Controller
} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {
  IonNote,
  IonSelect,
  IonSelectOption,
  IonText,
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
  label,
  name,
  options,
  required,
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
      },
      fieldState: {invalid},
      formState: {
	isSubmitted,
	errors
      },
    }: any): JSX.Element => {
      const normalizedLabel = `${label}${required ? ' *' : ''}`;
      const showErrors = invalid && isSubmitted;
      // todo: arrow icon is not colored on error
      return <div className='frg-ui-select' style={showErrors ? {color: 'var(--ion-color-danger)'} : {}}>
	<IonSelect
	  data-testid={testId}
	  label={normalizedLabel}
	  onIonChange={(event) => {
	    onChange(event.detail.value);
	  }}
	  style={showErrors ? {'--border-color': 'var(--ion-color-danger)'} : {}}
	  {...props}
	  {...fields}>
	  {options.map((option: SelectOption, index: number) => 
	    <IonSelectOption value={option.value} key={number}>
	      {option.label}
	    </IonSelectOption>)
	  }
	</IonSelect>
	{errors[name] && showErrors
	&& <IonNote className='ion-margin-top' style={{display: 'block'}}>
	  <IonText color='danger'>
	    <ErrorMessage errors={errors} name={name} />
	  </IonText>
	</IonNote>}
      </div>
    }}
  />;
