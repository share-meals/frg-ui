import {
  GeocoderInput,
  GeocoderProvider
} from './Geocoder';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonRow,
  IonToolbar
} from '@ionic/react';
import {LayerToggles} from './MapLayers';
import Lock from '@material-symbols/svg-400/sharp/lock-fill.svg';
import {
  Map,
  MapProvider,
  MapProviderProps,
} from './Map';
import type {MapLayerProps} from './MapLayers';
import type {
  MapOnFeatureClickProps,
  MapProps
} from './Map';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import protomapsStyles from './stories_data/protomapsStyles.json';
import {Renderer} from './stories_data/Renderer';
import {
  useEffect,
  useRef,
  useState
} from 'react';
import {useWindowSize} from '@uidotdev/usehooks';

import Close from '@material-symbols/svg-400/sharp/close.svg';

import './Map.stories.css';

import food_pantries from './stories_data/food_pantries.json';
import soup_kitchens from './stories_data/soup_kitchens.json';
import mms from './stories_data/mms.json';
import mm_truck from './stories_data/mm_truck.png';
import cpds from './stories_data/cpds.json';
import cpd_truck from './stories_data/cpd_truck.png';

const layers: MapLayerProps[] = [
  {
    name: 'Community Partner Distributions',
    geojson: cpds as GeoJSON.GeoJSON,
    fillColor: '#54688b',
    strokeColor: 'white',
    icon: {
      src: cpd_truck,
      scale: 0.13312
    },
    type: 'vector'
  },
  {
    name: 'Mobile Markets',
    geojson: mms as GeoJSON.GeoJSON,
    fillColor: '#006747',
    strokeColor: 'white',
    icon: {
      src: mm_truck,
      scale: 0.065
    },
    type: 'vector'
  },
  {
    name: 'Food Pantries',
    featureRadius: 10,
    featureWidth: 10,
    geojson: food_pantries as GeoJSON.GeoJSON,
    fillColor: '#64a70b',
    strokeColor: 'white',
    type: 'vector'
  },
  {
    name: 'Soup Kitchens',
    featureRadius: 10,
    featureWidth: 10,
    geojson: soup_kitchens as GeoJSON.GeoJSON,
    fillColor: '#893B67',
    strokeColor: 'white',
    type: 'vector'
  }
];

const layersCluster: MapLayerProps[] = [
  {
    name: 'Food Pantries',
    geojson: food_pantries as GeoJSON.GeoJSON,
    fillColor: 'rgba(100, 167, 11, 0.9)',
    strokeColor: 'rgba(255, 255, 255, 0.9)',
    textScale: 1.5,
    textFillColor: '#ffffff',
    textStrokeColor: '#000000',
    textStrokeWidth: 4,
    type: 'cluster',
    clusterDistance: 50
  }
];

type MapStoryProps = MapProps & MapProviderProps;

const InfoModal = ({trigger}: {trigger: string}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsOpen(trigger !== '');
  }, [trigger]);
  return <IonModal isOpen={isOpen}>
    <IonHeader>
      <IonToolbar>
	<IonButtons slot='end'>
	  <IonButton onClick={() => {setIsOpen(false);}}>
	    <IonIcon slot='icon-only' icon={Close} />
	  </IonButton>
	</IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <Renderer />
    </IonContent>
  </IonModal>;    
}

const LayerTogglesModal = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return <IonModal ref={modal} trigger='openLayerToggles'>
    <IonHeader>
      <IonToolbar>
	<IonButtons slot='end'>
	  <IonButton onClick={() => {modal.current?.dismiss();}}>
	    <IonIcon slot='icon-only' icon={Close} />
	  </IonButton>
	</IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <LayerToggles />
    </IonContent>
  </IonModal>;
}

const meta: Meta<MapStoryProps> = {
  // @ts-ignore
  component: Map,
  render: ({
    controls,
    protomapsApiKey,
    protomapsStyles: protomapsStylesProp,
    ...props
  }) => {
    const geocoderInput = <GeocoderInput
			    helperText='To find food near you, please enter your address, city, and zip code'
			    fill='outline'
			    onGeocodeZoom={17}
			    onGeocode={() => {	    
			    }}
    />;
    const size: {
      height: number | null,
      width: number | null
    } = useWindowSize();
    const isMobile: boolean = size.width === null ? false : size.width < 576; // if size is not available, assume desktop
    const [infoTrigger, setInfoTrigger] = useState<string>('');
    useEffect(() => {
      if(!isMobile && infoTrigger !== ''){
	setInfoTrigger('');
      }
    }, [isMobile, infoTrigger, setInfoTrigger]);
    return <>
      <div style={{height: '100vh', width: '100vw'}}>
	<MapProvider
	  center={{
	    lat: 40.7127281,
	    lng: -74.0060152
	  }}
	  layers={props.layers}
	  maxZoom={16}
	  minZoom={12}>
	  <GeocoderProvider
	    platform='nominatim'
	    url='https://nominatim.openstreetmap.org/search'>
	    {!isMobile &&
	     <IonGrid>
	       <IonRow style={{height: '100vh'}}>
		 <IonCol>
		   <Map
		     controls={controls}
		     protomapsApiKey='64a4cc037916729f'
		     protomapsStyles={protomapsStyles}
		   {...props}
		   />
		 </IonCol>
		 <IonCol>
		   <LayerToggles />
		   <Renderer />
		   {geocoderInput}
		 </IonCol>
	       </IonRow>
	     </IonGrid>
	    }
	    {isMobile && <>
	      <Map
		controls={controls}
		protomapsApiKey='64a4cc037916729f'
		protomapsStyles={protomapsStyles}
		{...props} />
	      <InfoModal trigger={infoTrigger} />
	      <LayerTogglesModal />
	    </>}
	  </GeocoderProvider>
	</MapProvider>
      </div>
    </>;
  },
  title: 'Components/Map'
};

export default meta;
type Story = StoryObj<MapStoryProps>;

export const Default: Story = {
  args: {
    layers
  }
};

export const Cluster: Story = {
  args: {
    layers: layersCluster,
  }
}

export const EmptyLayer: Story = {
  args: {
    layers: [{
      name: 'Food Pantries',
      featureRadius: 10,
      featureWidth: 10,
      geojson: {
	features: [],
	type: 'FeatureCollection'
      },
      fillColor: '#64a70b',
      strokeColor: 'white',
      type: 'vector'
    }]
  }
}

export const Locked: Story = {
  args: {
    controls: <div style={{position: 'absolute', zIndex: 999, right: '1rem', top: '1rem'}}>
      <IonButton>
	<IonIcon slot='icon-only' src={Lock} />
      </IonButton>
    </div>,
    layers,
    locked: true
  }
}

export const OnFeatureClickVector: Story = {
  args: {
    layers,
    onFeatureClick: ({lat, lng, data}: MapOnFeatureClickProps) => {
      console.log(lat, lng, data);
    }
  }
}

export const OnFeatureClickCluster: Story = {
  args: {
    layers: layersCluster,
    onFeatureClick: ({lat, lng, data}: MapOnFeatureClickProps) => {
      console.log(lat, lng, data);
    }
  }
}
