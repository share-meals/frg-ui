import {
  Control,
  Controller
} from "react-hook-form";
import {
  IonRadio,
  IonRadioGroup
} from "@ionic/react";
import {
  JSX,
  //  useState
} from "react";

export type InlineSelectOption = string | {
  value: string;
  label: string;
}

// TODO: somehow also integrate RadioGroup Props?
export interface InlineSelectProps extends React.ComponentProps<typeof IonRadio> {
  control: Control<any>;
  //  defaultValue: string[];
  name: string;
  //  onChange?: (arg: any) => void;
  options: InlineSelectOption[];
  testId?: string;
  wrapper?: React.FC<{ children: JSX.Element }>;
};

export const InlineSelect: React.FC<InlineSelectProps> = ({
  control,
  name,
  options,
  testId,
  wrapper: Wrapper = ({ children }) => children,
  ...props
}) => {
  return (
    <Controller
    control={control}
    data-testid={testId || "extended-radio-component"}
    name={name}
    render={
      (
	{field: { onChange } }
      ): JSX.Element => {
	return <IonRadioGroup
	       	 onIonChange={(event) => {
		   onChange(event.detail.value);
		 }}
	       >
	  {
	  options.map((o) => {
	    const v = typeof o === 'string' ? o : o.value;
	    const l = typeof o === 'string' ? o : o.label;
	    return <Wrapper key={v}>
	      <IonRadio
		value={v}
		{...props}>
	      {l}
	      </IonRadio>
	    </Wrapper>;
	  })
	}
	</IonRadioGroup>;
      }
    }
  />
);
};
