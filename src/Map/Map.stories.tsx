import {
  Geocoder
} from './Geocoder';
import {getMapStyle} from './MapStyle';
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
import {
  Map,
  MapProvider,
  MapProviderProps,
  useMap,
} from './Map';
import type {MapLayerProps} from './MapLayers';
import type {
  MapProps
} from './Map';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import {Renderer} from './stories_data/Renderer';
import {
  useEffect,
  useRef,
  useState
} from 'react';
import {useWindowSize} from '@uidotdev/usehooks';

import {
  cafe,
  close,
  lockClosed
} from 'ionicons/icons';
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
    icon: cpd_truck,
    type: 'vector'
  },
  {
    name: 'Mobile Markets',
    geojson: mms as GeoJSON.GeoJSON,
    fillColor: '#006747',
    strokeColor: 'white',
    icon: mm_truck,
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

const GeocoderWrapper: React.FC<any> = ({onGeocode, ...props}) => {
  const {setInternalCenter} = useMap();
  return <>
    <Geocoder
      apiKey={import.meta.env.VITE_GOOGLEMAPS_GEOCODER_API_KEY as string}
      helperText={'find food near you'}
      onGeocode={(data) => {
	const result = data[0];
	setInternalCenter({
	  lat: result.geometry.location.lat(),
	  lng: result.geometry.location.lng()
	});
      }}
      {...props}
    />
  </>;
};


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
	    <IonIcon slot='icon-only' icon={close} />
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
	    <IonIcon slot='icon-only' icon={close} />
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
	  maxZoom={15}
	  minZoom={5}>
	    {!isMobile &&
	     <IonGrid>
	       <IonRow style={{height: '100vh'}}>
		 <IonCol>
		   <Map
		     controls={controls}
		     protomapsApiKey={import.meta.env.VITE_PROTOMAPS_API_KEY as string}
		     protomapsStyles={getMapStyle({apiKey: import.meta.env.VITE_PROTOMAPS_API_KEY, theme: 'grayscale'})}
		   {...props}
		   />
		 </IonCol>
		 <IonCol>
		   <LayerToggles />
		   <Renderer />
		   <GeocoderWrapper />
		 </IonCol>
	       </IonRow>
	     </IonGrid>
	    }
	    {isMobile && <>
	      <Map
		controls={controls}
		protomapsApiKey={import.meta.env.VITE_PROTOMAPS_API_KEY as string}
		protomapsStyles={getMapStyle({
		  apiKey: import.meta.env.VITE_PROTOMAPS_API_KEY as string,
		  theme: 'grayscale'
		})}
		{...props} />
	      <InfoModal trigger={infoTrigger} />
	      <LayerTogglesModal />
	    </>}
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

export const TransparentColors: Story = {
  args: {
    layers: [
      {
	name: 'Food Pantries',
	featureRadius: 10,
	featureWidth: 10,
	geojson: food_pantries as GeoJSON.GeoJSON,
	fillColor: 'rgba(100, 167, 11, 0.25)',
	strokeColor: 'white',
	type: 'vector'
      },
      {
	name: 'Soup Kitchens',
	featureRadius: 10,
	featureWidth: 10,
	geojson: soup_kitchens as GeoJSON.GeoJSON,
	fillColor: 'rgba(137, 59, 103, 0.25)',
	strokeColor: 'white',
	type: 'vector'
      }
    ]
  }
};

export const WithScalingLookup: Story = {
  args: {
    layers,
    scalingLookup: {
      0: 0.4,
      3: 0.5,
      5: 0.6,
      8: 0.7,
      10: 0.8,
      13: 0.9,
      15: 1
    }
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
      <IonButton aria-label='lock map'>
	<IonIcon aria-hidden='true' slot='icon-only' src={lockClosed} />
      </IonButton>
    </div>,
    layers,
    locked: true
  }
}

export const LockedCustomIcon: Story = {
  args: {
    controls: <div style={{position: 'absolute', zIndex: 999, right: '1rem', top: '1rem'}}>
      <IonButton aria-label='lock map'>
	<IonIcon aria-hidden='true' slot='icon-only' src={lockClosed} />
      </IonButton>
    </div>,
    layers,
    locked: true,
    lockIcon: <IonIcon aria-label='cafe icon' icon={cafe} />
  }
}

export const OnMapClick: Story = {
  args: {
    layers,
    onMapClick: ({lat, lng, data}: /*MapOnClickProps*/ any) => {
      console.log(lat, lng, data);
    }
  }
}
