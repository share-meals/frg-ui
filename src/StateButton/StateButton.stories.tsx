import type {
    Meta,
    StoryObj
} from '@storybook/react';

import type {StateButtonProps} from './StateButton';
import {StateButton} from './StateButton';

interface StateButtonStoryType extends StateButtonProps {
  label: string
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
      </>
    );
    },
    title: 'Components/StateButton',
};

export default meta;
type Story = StoryObj<StateButtonStoryType>;

export const Default: Story = {
  args: {
    isLoading: false,
    label: 'default'
  }
}

export const DefaultLoading: Story = {
  args: {
    isLoading: true,
    label: 'default loading'
  }
}

export const Success: Story = {
  args: {
    color: 'success',
    isLoading: false,
    label: 'success'
  }
}

export const SuccessLoading: Story = {
  args: {
    color: 'success',
    isLoading: true,
    label: 'success loading'
  }
}

export const Danger: Story = {
  args: {
    color: 'danger',
    isLoading: false,
    label: 'danger'
  }
}

export const DangerLoading: Story = {
  args: {
    color: 'danger',
    isLoading: true,
    label: 'danger loading'
  }
}

export const ExpandBlock: Story = {
  args: {
    expand: 'block',
    label: 'expand block'
  }
}

export const ExpandBlockLoading: Story = {
  args: {
    expand: 'block',
    isLoading: true,
    label: 'expand block loading'
  }
}

export const ExpandFull: Story = {
  args: {
    expand: 'full',
    label: 'expand full'
  }
}

export const ExpandFullLoading: Story = {
  args: {
    expand: 'full',
    isLoading: true,
    label: 'expand full loading'
  }
}
