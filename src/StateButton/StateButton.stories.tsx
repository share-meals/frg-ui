import {IonIcon} from '@ionic/react';
import type {
    Meta,
    StoryObj
} from '@storybook/react';

import MyLocationIcon from '@material-symbols/svg-400/rounded/my_location-fill.svg';

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
    label: <IonIcon src={MyLocationIcon} />
  }
}

export const Success: Story = {
  args: {
    color: 'success',
    label: 'success'
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
