import type {
  Form as FormType,
  MultipleChoiceQuestion as MultipleChoiceQuestionType,
  Page as PageType,
  QuestionModule as QuestionModuleType,
  TextModule as TextModuleType
} from './schema';
import {
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
} from '@ionic/react';
import {MultipleCheckbox} from '../MultipleCheckbox';
import ReactMarkdown from 'react-markdown';
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
  const {control} = useFormContext();
  return <>
    <ReactMarkdown children={text} />
    <MultipleCheckbox
      control={control}
      justify='start'
      labelPlacement='end'
      maxSelections={maxSelections}
      name={name}
      options={options}
      wrapper={({children}) => <IonItem>{children}</IonItem>}
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
  json: FormType
}> = ({
  json
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  return <>
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
	<Page
	  json={json.pages[pageNumber]}
	  pageNumber={pageNumber}
	/>
    <IonGrid>
      <IonRow>
	<IonCol>
	  {pageNumber > 0 &&
	  <IonButton onClick={() => {
	    setPageNumber(pageNumber - 1);
	    }}>
	     Previous Page
	   </IonButton>
	  }
	</IonCol>
	<IonCol className='ion-text-right'>
	  {pageNumber + 1 < json.pages.length &&
	  <IonButton onClick={() => {
	    setPageNumber(pageNumber + 1);
	    }}>
	     Next Page
	   </IonButton>
	  }
	  {pageNumber + 1 === json.pages.length &&
	   <StateButton type='submit'>
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
