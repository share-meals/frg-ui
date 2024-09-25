import {GeocoderInput} from './Geocoder';
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

import cpds from './stories_data/cpds.json';
import mms from './stories_data/mms.json';
import food_pantries from './stories_data/food_pantries.json';

const FILL_OPACITY = 0.5;
const STROKE_OPACITY = 1;
const FEATURE_WIDTH = 4;
const TEXT_STROKE_WIDTH = 2;

const cpdsLayer = {
  name: 'Community Partner Distributors',
  geojson: cpds as GeoJSON.GeoJSON,
  featureWidth: FEATURE_WIDTH,
  fillColor: `rgba(167, 100, 11, ${FILL_OPACITY})`,
  strokeColor: `rgba(255, 255, 255, ${STROKE_OPACITY})`,
  textScale: 1.5,
  textFillColor: '#ffffff',
  textStrokeColor: '#000000',
  textStrokeWidth: TEXT_STROKE_WIDTH,
  type: 'cluster',
  clusterDistance: 50
};

const mmsLayer = {
  name: 'Mobile Markets',
  geojson: mms as GeoJSON.GeoJSON,
  featureWidth: FEATURE_WIDTH,
  fillColor: `rgba(11, 167, 100, ${FILL_OPACITY})`,
  strokeColor: `rgba(255, 255, 255, ${STROKE_OPACITY})`,
  textScale: 1.5,
  textFillColor: '#ffffff',
  textStrokeColor: '#000000',
  textStrokeWidth: TEXT_STROKE_WIDTH,
  type: 'cluster',
  clusterDistance: 50
};

const fpsLayer = {
  name: 'Food Pantries',
  geojson: food_pantries as GeoJSON.GeoJSON,
  featureWidth: FEATURE_WIDTH,
  fillColor: `rgba(100, 167, 11, ${FILL_OPACITY})`,
  strokeColor: `rgba(255, 255, 255, ${STROKE_OPACITY})`,
  textScale: 1.5,
  textFillColor: '#ffffff',
  textStrokeColor: '#000000',
  textStrokeWidth: TEXT_STROKE_WIDTH,
  type: 'cluster',
  clusterDistance: 50
};

const meta: Meta<typeof Map> = {
  component: Map,
  render: ({protomapsApiKey, protomapsStyles: protomapsStylesProp, ...props}) => {
    const [features, setFeatures] = useState<string>('cpds');
    return <>
      <IonSegment value={features} onIonChange={(event) => {setFeatures(event.detail.value as string);}}>
	<IonSegmentButton value='cpds'>
	  <IonLabel>CPDs</IonLabel>
	</IonSegmentButton>
	<IonSegmentButton value='mms'>
	  <IonLabel>MMs</IonLabel>
	</IonSegmentButton>
      </IonSegment>
      <div style={{height: '100vh', width: '100vw'}}>
	<MapProvider
	  center={{
	    lat: 40.66019478378121,
	    lng: -73.96947593651886	    
	  }}
	  layers={[features === 'cpds' ? cpdsLayer : mmsLayer, fpsLayer]}
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

export const DynamicClusters: Story = {};
