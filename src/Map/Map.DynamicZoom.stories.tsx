import {IonButton} from '@ionic/react';
import {
  Map,
  MapProvider,
  TimestampedZoom
} from './Map';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import protomapsStyles from './stories_data/protomapsStyles';
import {useState} from 'react';

const meta: Meta<typeof Map> = {
  component: Map,
  render: ({protomapsApiKey, protomapsStyles: protomapsStylesProp, ...props}) => {
    const [zoom, setZoom] = useState<TimestampedZoom>({
      level: 10,
      timestamp: new Date()
    });
    return <>
      <IonButton
	color={zoom.level === 5 ? 'success' : 'primary'}
	onClick={() => {setZoom({
	  level: 5,
	  timestamp: new Date()
	})}}>
	Zoom 5
      </IonButton>
      <IonButton
	color={zoom.level === 10 ? 'success' : 'primary'}
	onClick={() => {setZoom({
	  level: 10,
	  timestamp: new Date()
	})}}>
	Zoom 10
      </IonButton>
      <IonButton
	color={zoom.level === 15 ? 'success' : 'primary'}
	onClick={() => {setZoom({
	  level: 15,
	  timestamp: new Date()
	})}}>
	Zoom 15
      </IonButton>
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={{lat: 40.78249320246721, lng: -73.96539607078506}}
	  layers={[]}
	  maxZoom={16}
	  minZoom={5}
	  zoom={zoom}>
	  <Map
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

export const DynamicZoom: Story = {};
