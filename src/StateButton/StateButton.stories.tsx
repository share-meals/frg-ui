import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {StateButton} from './StateButton';

const meta: Meta<typeof StateButton> = {
  component: StateButton,
  render: (props) => {
    const {label, ...stateButtonProps} = props;
    return (
      <>
	<StateButton {...stateButtonProps}>
	  {label}
	</StateButton>
      </>
    );
    },
    title: 'Components/StateButton',
};

export default meta;
type Story = StoryObj<typeof StateButton>;

export const Default: Story = {
  args: {
    isLoading: false,
    label: 'label'
  }
}

export const DefaultLoading: Story = {
  args: {
    isLoading: true,
    label: 'label'
  }
}

export const Success: Story = {
  args: {
    color: 'success',
    isLoading: false,
    label: 'label'
  }
}

export const SuccessLoading: Story = {
  args: {
    color: 'success',
    isLoading: true,
    label: 'label'
  }
}

export const Danger: Story = {
  args: {
    color: 'danger',
    isLoading: false,
    label: 'label'
  }
}

export const DangerLoading: Story = {
  args: {
    color: 'danger',
    isLoading: true,
    label: 'label'
  }
}
