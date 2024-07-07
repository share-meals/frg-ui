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
import protomapsStyles from './stories_data/protomapsStyles.json';
import {useState} from 'react';

const parks = {
  prospect: {lat: 40.66019478378121, lng: -73.96947593651886},
  central: {lat: 40.78249320246721, lng: -73.96539607078506}
};

const meta: Meta<typeof Map> = {
  component: Map,
  render: (props) => {
    const [park, setPark] = useState<['prospect', 'central']>('prospect');
    
    return <>
      <IonSegment value={park} onIonChange={(event) => {setPark(event.detail.value);}}>
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
	  center={parks[park]}
	  layers={[]}
	  maxZoom={16}
	  minZoom={12}>
	  <Map
	    protomapsApiKey='64a4cc037916729f'
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
