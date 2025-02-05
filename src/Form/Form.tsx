import type {
  FormType,
  FormMultipleChoiceQuestionType,
  FormPageType,
  FormQuestionModuleType,
  FormSingleChoiceQuestionType,
  FormTextModuleType
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
import {useCallback, useState} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const MultipleChoiceQuestion: React.FC<Omit<FormMultipleChoiceQuestionType, 'type'>> = ({
  maxSelections,
  name,
  options,  
  text,
}) => {
  const {
    control,
    formState: {disabled},
    getValues,
  } = useFormContext();
  return <>
  <ReactMarkdown children={text} />
  <MultipleCheckbox
  control={control}
  defaultValue={getValues(name)}
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

const SingleChoiceQuestion: React.FC<Omit<FormSingleChoiceQuestionType, 'type'>> = ({
  name,
  text,
  ...props
}) => {
  const {
    control,
    formState: {disabled},
    getValues,
    //    getFieldState,
    //    trigger
  } = useFormContext();
  return <>
    <ReactMarkdown children={text} />
    <InlineSelect
      control={control}
      defaultValue={getValues(name)}
      disabled={disabled}
      justify='start'
      labelPlacement='end'
      name={name}
      wrapper={({children}) => <IonItem>{children}</IonItem>}
      {...props}
    />
  </>;
};

const QuestionModule: React.FC<FormQuestionModuleType> = ({
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

const TextModule: React.FC<FormTextModuleType> = ({text}) => {
  return <ReactMarkdown children={text} />;
}

export const Page: React.FC<{
  data: any,
  isLoading?: boolean,
  json: FormPageType,
  onSubmit: (lastPageData: any) => void,
  pageNumber: number,
  setData: any,
  setPageNumber: any,
  totalPages: number,
}> = ({
  data,
  isLoading = false,
  json,
  onSubmit: onSubmitProps,
  pageNumber,
  setData,
  setPageNumber,
  totalPages,
}) => {
  const schema = z.object(
    Object.fromEntries(
      json
	.filter((m) => m.module === 'question')
      // @ts-ignore
	.map((q) => [q.name, generateZodSchema(q)])
    )
  );
  
  const methods = useForm<z.infer<typeof schema>>({
    disabled: isLoading,
    mode: 'onChange',
    resolver: zodResolver(schema)
  });

  const onSubmit = methods.handleSubmit(
    useCallback((pageData) => {
      setData({
	...data,
	...pageData,
      });
      if(pageNumber + 1 < totalPages){
	setPageNumber(pageNumber + 1);
      }else{
	onSubmitProps(pageData);
      }
    }, [
      data,
      pageNumber,
      setData,
      setPageNumber,
      totalPages,
    ]
  ));
  return<FormProvider {...methods}>
  <form onSubmit={onSubmit}>
    {
      json.map(({module, ...props}, index: number) => {
	return <div key={`${pageNumber}-${index}`}>
	  {module === 'text' && <TextModule {...props as FormTextModuleType} />}
	  {module === 'question' && <QuestionModule {...props as FormQuestionModuleType} />}
	</div>;
      }
      )}
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
	  <StateButton
	    isLoading={isLoading}
	    type='submit'>
	    {pageNumber + 1 < totalPages ? 'Next Page' : 'Submit'}
	  </StateButton>
	</IonCol>
      </IonRow>
    </IonGrid>
  </form>
  </FormProvider>;
}

const generateZodSchema = (q: FormQuestionModuleType) => {
  let schema;
  if(q.type === 'multipleChoice'){
    schema = z.array(z.string());
    if(q.required){
      schema = schema.nonempty();
    }
  }
  if(q.type === 'singleChoice'){
    schema = z.string();
    if(q.required){
      schema = schema.nonempty();
    }
  }
  return schema;
};

export const Form: React.FC<{
  isLoading: boolean,
  json: FormType,
  onSubmit: (data: any) => void,
}> = ({
  isLoading,
  json,
  onSubmit: onSubmitProps,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [data, setData] = useState<{[key: string]: any}>({});
  const onSubmit = useCallback((lastPageData: any) => {
    // need to merge with lastPageData since last submit will not have enough time to update
    const finalData = {
      ...data,
      ...lastPageData
    }
    setData(finalData);
    onSubmitProps(finalData);
  }, [data, onSubmitProps]);
  return <Page
	   json={json.pages[pageNumber]}
	   totalPages={json.pages.length}
	   {...{
	     data,
	     isLoading,
	     onSubmit,
	     pageNumber,
	     setData,
	     setPageNumber,
	   }}
  />;
}

