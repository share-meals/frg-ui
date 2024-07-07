import {
  GeocoderInput,
  GeocoderProvider
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
import protomapsStyles from './stories_data/protomapsStyles.json';
import {useState} from 'react';

const highland = {
  fillColor: 'orange',
  geojson: {
    type: 'FeatureCollection',
    features: [
      {
	type: 'Feature',
	geometry: {
	  type: 'Point',
	  coordinates: [
	    -73.8874755125659,
	    40.688693163669114
	  ]
	}
      }
    ]
  },
  name: 'Highland Park',
  strokeColor: 'orange',
  type: 'vector'
};

const parks = {
  prospect: {
    fillColor: 'red',
    geojson: {
      type: 'FeatureCollection',
      features: [
	{
	  type: 'Feature',
	  geometry: {
	    type: 'Point',
	    coordinates: [
	      -73.96947593651886,
	      40.66019478378121
	    ]
	  }
	}
      ]
    },
    name: 'Prospect Park',
    strokeColor: 'blue',
    type: 'vector'
  },
  central: {
    fillColor: 'purple',
    geojson: {
      type: 'FeatureCollection',
      features: [
	{
	  type: 'Feature',
	  geometry: {
	    type: 'Point',
	    coordinates: [
	      -73.96539607078506,
	      40.78249320246721
	    ]
	  }
	}
      ]
    },
    name: 'Central Park',
    strokeColor: 'red',
    type: 'vector'
  }
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
	<div style={{height: '50vh', width: '100vw'}}>
      <MapProvider
	center={{
	  lat: 40.66019478378121,
	  lng: -73.96947593651886	    
	}}
	layers={[parks[park], highland]}
	maxZoom={16}
	minZoom={12}>
	  <IonGrid>
	    <IonRow style={{height: '50vh'}}>
	      <IonCol size='8'>
		<Map
		protomapsApiKey='64a4cc037916729f'
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

export const DynamicLayers: Story = {};
