import type {
  Form as FormType,
  MultipleChoiceQuestion as MultipleChoiceQuestionType,
  Page as PageType,
  QuestionModule as QuestionModuleType,
  SingleChoiceQuestion as SingleChoiceQuestionType,
  TextModule as TextModuleType
} from './schema';
import {
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form';
import {
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
} from '@ionic/react';
import {MultipleCheckbox} from '../MultipleCheckbox';
import ReactMarkdown from 'react-markdown';
import {InlineSelect} from '../InlineSelect';
import {StateButton} from '../StateButton';
import {
  useState
} from 'react';
//import {zodResolver} from '@hookform/resolvers/zod';

const MultipleChoiceQuestion: React.FC<Omit<MultipleChoiceQuestionType, 'type'>> = ({
  maxSelections,
  name,
  options,  
  text,
}) => {
  const {
    control,
    formState: {disabled}
  } = useFormContext();
  return <>
    <ReactMarkdown children={text} />
    <MultipleCheckbox
      control={control}
      disabled={disabled}
      justify='start'
      labelPlacement='end'
      maxSelections={maxSelections}
      name={name}
      options={options}
      wrapper={({children}) => <IonItem>{children}</IonItem>}
    />
  </>;
};

const SingleChoiceQuestion: React.FC<Omit<SingleChoiceQuestionType, 'type'>> = ({
  text,
  ...props
}) => {
  const {
    control,
    formState: {disabled}
  } = useFormContext();
  return <>
    <ReactMarkdown children={text} />
    <InlineSelect
      control={control}
      disabled={disabled}
      justify='start'
      labelPlacement='end'
      wrapper={({children}) => <IonItem>{children}</IonItem>}
      {...props}
    />
  </>;
};

const QuestionModule: React.FC<QuestionModuleType> = ({
  type,
  ...props
}) => {
  switch(type){
    case 'multipleChoice':
      return <MultipleChoiceQuestion {...props} />;
      break;
    case 'singleChoice':
      return <SingleChoiceQuestion {...props} />;
      break;
    default:
      return <></>;
      break;
  }
};

const TextModule: React.FC<TextModuleType> = ({text}) => {
  return <ReactMarkdown children={text} />;
}

export const Page: React.FC<{
  json: PageType,
  pageNumber: number
}> = ({
  json,
  pageNumber
}) => {
  return json.map(({module, ...props}, index: number) => {
    return <div key={`${pageNumber}-${index}`}>
      {module === 'text' && <TextModule {...props as TextModuleType} />}
      {module === 'question' && <QuestionModule {...props as QuestionModuleType} />}
    </div>;
  });
}

export const Form: React.FC<{
  isLoading: boolean,
  json: FormType,
  onSubmit: (data: any) => void,
}> = ({
  isLoading,
  json,
  onSubmit,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const methods = useForm({
    disabled: isLoading
  });
  return <>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
	<Page
	  json={json.pages[pageNumber]}
	  pageNumber={pageNumber}
	/>
	<IonGrid>
	  <IonRow>
	    <IonCol>
	      {pageNumber > 0 &&
	       <StateButton
		 isLoading={isLoading}
		 onClick={() => {
		   setPageNumber(pageNumber - 1);
		 }}>
		 Previous Page
	       </StateButton>
	      }
	    </IonCol>
	    <IonCol className='ion-text-right'>
	      {pageNumber + 1 < json.pages.length &&
	       <StateButton
		 isLoading={isLoading}
		 onClick={() => {
		   setPageNumber(pageNumber + 1);
		 }}>
		 Next Page
	       </StateButton>
	      }
	      {pageNumber + 1 === json.pages.length &&
	       <StateButton isLoading={isLoading} type='submit'>
		 Submit
	       </StateButton>
	      }
	    </IonCol>
	  </IonRow>
	</IonGrid>
      </form>
    </FormProvider>
  </>;
}
