import {
  GeocoderInput,
//  GeocoderProvider
} from './Geocoder';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {LayerToggles} from './MapLayers';
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

const coordinates: {[key: string]: number[]} = {
  prospect: [-73.96947593651886, 40.66019478378121],
  central: [-73.96539607078506, 40.78249320246721]
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
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={{lat: coordinates[park][1], lng: coordinates[park][0]}}
	  layers={[{
	    fillColor: 'red',
	    geojson: {
	      type: 'FeatureCollection',
	      features: [
		{
		  type: 'Feature',
		  geometry: {
		    type: 'Point',
		    coordinates: coordinates[park]
		  },
		  properties: {}
		}
	      ]
	    },
	    name: 'Prospect Park',
	    strokeColor: 'blue',
	    type: 'vector'
	  }]}
	  maxZoom={16}
	  minZoom={12}>
	  <IonGrid>
	    <IonRow style={{height: '50vh'}}>
	      <IonCol size='8'>
		<Map
		protomapsApiKey={import.meta.env.VITE_PROTOMAPS_API_KEY}
		protomapsStyles={protomapsStyles}
		{...props}
		/>
	      </IonCol>
	      <IonCol size='4'>
		<LayerToggles />
		<GeocoderInput
		helperText='To find food near you, please enter your address, city, and zip code'
		fill='outline'
		onGeocodeZoom={17}
		onGeocode={() => {	    
		}}
		/>
	      </IonCol>
	    </IonRow>
	  </IonGrid>
	</MapProvider>
      </div>
    </>;
  },
  title: 'Components/Map'
}

export default meta;
type Story = StoryObj<typeof Map>;

export const DynamicFeatures: Story = {};
