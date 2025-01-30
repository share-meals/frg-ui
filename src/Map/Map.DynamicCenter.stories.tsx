import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {
  Map,
  MapProvider
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
    const [park, setPark] = useState<string>('prospect');
    return <>
      <IonSegment value={park} onIonChange={(event) => {setPark(event.detail.value as string);}}>
	<IonSegmentButton value='prospect'>
	  <IonLabel>Prospect Park</IonLabel>
	</IonSegmentButton>
	<IonSegmentButton value='central'>
	  <IonLabel>Central Park</IonLabel>
	</IonSegmentButton>
      </IonSegment>
      [{parks[park].lat}, {parks[park].lng}]
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={{...parks[park], timestamp: new Date()}}
	  layers={[]}
	  maxZoom={16}
	  minZoom={12}>
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

export const DynamicCenter: Story = {};
