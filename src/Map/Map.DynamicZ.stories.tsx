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

const zoo = {
  featureRadius: 10,
  fillColor: 'orange',
  geojson: {
    type: 'FeatureCollection' as 'FeatureCollection',
    features: [
      {
	type: 'Feature' as 'Feature',
	geometry: {
	  type: 'Point' as 'Point',
	  coordinates: [
	    -73.96510215607324,
	    40.66435855414387
	  ]
	},
	properties: {}
      }
    ]
  },
  name: 'Prospect Park Zoo',
  strokeColor: 'orange',
  type: 'vector'
};

const carousel = {
  featureRadius: 10,
  fillColor: 'red',
  geojson: {
    type: 'FeatureCollection' as 'FeatureCollection',
    features: [
      {
	type: 'Feature' as 'Feature',
	geometry: {
	  type: 'Point' as 'Point',
	  coordinates: [
	    -73.96423569021013,
	    40.6637406467249
	  ]
	},
	properties: {}
      }
    ]
  },
  name: 'Prospect Park Carousel',
  strokeColor: 'blue',
  type: 'vector'
}

const meta: Meta<typeof Map> = {
  component: Map,
  render: ({protomapsApiKey, protomapsStyles: protopmapsStylesProp, ...props}) => {
    const [priorityLayer, setPriorityLayer] = useState<string>('zoo');
    return <>
      <IonSegment value={priorityLayer} onIonChange={(event) => {setPriorityLayer(event.detail.value as string);}}>
	<IonSegmentButton value='zoo'>
	  <IonLabel>Zoo</IonLabel>
	</IonSegmentButton>
	<IonSegmentButton value='carousel'>
	  <IonLabel>Carousel</IonLabel>
	</IonSegmentButton>
      </IonSegment>
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={{
	    lat: 40.66019478378121,
	    lng: -73.96947593651886	    
	  }}
	  layers={[
	    {
	      ...carousel,
	      zIndex: priorityLayer === 'carousel' ? 2 : 1
	    },
	    {
	      ...zoo,
	      zIndex: priorityLayer === 'zoo' ? 2 : 1
	    }
	  ]}
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

export const DynamicZ: Story = {};
