import {Form} from './Form';
import {
  FormType,
  FormPageType
} from './schema';
import {IonButton} from '@ionic/react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import pages from './pages.stories.json';
import {useState} from 'react';

const json: FormType = {
  meta: {
    id: '20240214',
  },
  pages: []
};


const meta: Meta<typeof Form> = {
  component: Form,
  render: ({...props}) => {
    const [response, setResponse] = useState<any>(null);
    const [resetKey, setResetKey] = useState<number>(0);
    return <>
    <Form
      {...props}
      key={resetKey}
      onSubmit={(data) => {
	setResponse(data);
      }}
    />
    <IonButton onClick={() => {
      setResetKey((n) => n + 1);
    }}>
      Reset
    </IonButton>
    {response && JSON.stringify(response)}
   </>;
  },
  title: 'Components/Form'
}

export default meta;
type Story = StoryObj<typeof Form>;

export const ExternalReset: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.mc1, pages.mc2, pages.mc3, pages.mc4, pages.mc5] as FormPageType[]
    }
  }
}
