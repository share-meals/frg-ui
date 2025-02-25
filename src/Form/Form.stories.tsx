import {Form} from './Form';
import {
  FormType,
  FormPageType
} from './schema';
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
    const [response, setResponse] = useState<any>(null)
    return <>
    <Form
      {...props}
      onSubmit={(data) => {
	setResponse(data);
      }}
    />
    {response && JSON.stringify(response)}
   </>;
  },
  title: 'Components/Form'
}

export default meta;
type Story = StoryObj<typeof Form>;

export const OnePageMC: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.mc1] as FormPageType[]
    }
  }
};

export const TwoPagesMC: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.mc1, pages.mc2] as FormPageType[]
    }
  }
}

export const FivePagesMC: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.mc1, pages.mc2, pages.mc3, pages.mc4, pages.mc5] as FormPageType[]
    }
  }
}

export const OnePageSC: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.sc1] as FormPageType[]
    }
  }
};

export const TwoPagesSC: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.sc1, pages.sc2] as FormPageType[]
    }
  }
}

export const FivePagesSC: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.sc1, pages.sc2, pages.sc3, pages.sc4, pages.sc5] as FormPageType[]
    }
  }
}

export const TwoPagesMixedChoice: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.mc1, pages.sc1] as FormPageType[]
    }
  }
}

export const NotRequired: Story = {
  args: {
    json: {
      ...json,
      pages: [pages.nr1, pages.nr1] as FormPageType[]
    }
  }
}


export const Loading: Story = {
  args: {
    isLoading: true,
    json: {
      ...json,
      pages: [pages.mc1, pages.mc2] as FormPageType[]
    },
  }
};
