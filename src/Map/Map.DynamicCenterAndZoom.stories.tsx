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

const parks: {[key: string]: any} = {
  prospect: {lat: 40.66019478378121, lng: -73.96947593651886},
  central: {lat: 40.78249320246721, lng: -73.96539607078506}
};

const meta: Meta<typeof Map> = {
  component: Map,
  render: ({protomapsApiKey, protomapsStyles: protomapsStylesProp, ...props}) => {
    const [zoom, setZoom] = useState<TimestampedZoom>({
      level: 10,
      timestamp: new Date()
    });
    const [park, setPark] = useState<string>('prospect');
    console.log(park);
    return <>
      <IonButton onClick={() => {
	setPark('prospect');
	setZoom({
	  level: 5,
	  timestamp: new Date()
	});
      }}>
	Prospect Park
      </IonButton>
      <IonButton onClick={() => {
	setPark('central');
	/*
	setZoom({
	  level: 10,
	  timestamp: new Date()
	});
	*/
      }}>
	Central Park
      </IonButton>
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={{...parks[park], timestamp: new Date()}}
	  layers={[]}
	  maxZoom={16}
	  minZoom={12}
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

export const DynamicCenterAndZoom: Story = {};
