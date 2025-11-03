import {
  Map,
  MapProvider
} from './Map';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import protomapsStyles from './stories_data/protomapsStyles';
import {
  ZoomControls
} from './controls';
import type {
  ZoomControlProps
} from './controls';

import './Map.AccessibilityControls.stories.css';

const meta: Meta<typeof Map> = {
  component: Map,
  render: ({protomapsApiKey, protomapsStyles: protomapsStylesProp, ...props}) => {
    const increment = 1;
    const zoomControlProps: ZoomControlProps = {
      fill: 'outline',
      increment: increment,
      size: 'small'
    };
    return <>
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={{lat: 40.78249320246721, lng: -73.96539607078506}}
	  layers={[]}
	  maxZoom={16}
	  minZoom={12}>
	  <Map
	    controls={
	      <ZoomControls
		increment={increment}
		zoomInControlProps={zoomControlProps}
		zoomOutControlProps={zoomControlProps}
	      />
	    }
	    protomapsApiKey={import.meta.env.VITE_PROTOMAPS_API_KEY}
	    protomapsStyles={protomapsStyles}
	  {...props}
	  />
	</MapProvider>
      </div>
    </>;
  },
  title: 'Components/Map'
}

export default meta;
type Story = StoryObj<typeof Map>;

export const AccessibilityControls: Story = {};
