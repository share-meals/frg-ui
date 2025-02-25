import {IonIcon} from '@ionic/react';
import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {locate} from 'ionicons/icons';

import type {StateButtonProps} from './StateButton';
import {StateButton} from './StateButton';

interface StateButtonStoryType extends StateButtonProps {
  label: string | React.ReactNode
};

const meta: Meta<StateButtonStoryType> = {
  component: StateButton,
  render: (props) => {
    const {label, ...stateButtonProps} = props;
    return (
      <>
	<StateButton {...stateButtonProps}>
	  {label}
	</StateButton>
	<br />
	<StateButton {...stateButtonProps} isLoading={true}>
	  {label}
	</StateButton>
      </>
    );
    },
    title: 'Components/StateButton',
};

export default meta;
type Story = StoryObj<StateButtonStoryType>;

export const Default: Story = {
  args: {
    label: 'default'
  }
}

export const WithIcon: Story = {
  args: {
    label: <IonIcon src={locate} />
  }
}

export const Success: Story = {
  args: {
    color: 'success',
    label: 'success'
  }
}

export const Danger: Story = {
  args: {
    color: 'danger',
    label: 'danger'
  }
}

export const Warning: Story = {
  args: {
    color: 'warning',
    label: 'warning'
  }
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'secondary'
  }
}

export const FillOutline: Story = {
  args: {
    fill: 'outline',
    label: 'fill outline'
  }
}

export const FillClear: Story = {
  args: {
    fill: 'clear',
    label: 'fill clear'
  }
}



export const ExpandBlock: Story = {
  args: {
    expand: 'block',
    label: 'expand block'
  }
}

export const ExpandFull: Story = {
  args: {
    expand: 'full',
    label: 'expand full'
  }
}
