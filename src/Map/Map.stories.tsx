import {
    useEffect,
    useRef,
    useState
} from 'react';

import type {
    Meta,
    StoryObj
} from '@storybook/react';
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
import {RControl} from 'rlayers';
import {
    Map,
    MapProvider
} from './Map';
import {
    ZoomButtons
} from './MapControls';
import {
    LayerToggles
} from './MapLayers';
import type {MapLayer} from './Map';
import {
    GeocoderInput,
    GeocoderProvider
} from './Geocoder';
import {Renderer} from './stories_data/Renderer';
import {useWindowSize} from '@uidotdev/usehooks';
import {
    closeSharp,
    layersSharp
} from 'ionicons/icons';

import './Map.stories.css';

import food_pantries from './stories_data/food_pantries.json';
import soup_kitchens from './stories_data/soup_kitchens.json';
import mms from './stories_data/mms.json';
import mm_truck from './stories_data/mm_truck.png';
import cpds from './stories_data/cpds.json';
import cpd_truck from './stories_data/cpd_truck.png';

const layers: MapLayer[] = [
    {
	name: 'Community Partner Distributions',
	geojson: cpds,
	fillColor: '#54688b',
	strokeColor: 'white',
	icon: {
	    src: cpd_truck,
	    scale: 0.13312
	}
    },
    {
	name: 'Mobile Markets',
	geojson: mms,
	fillColor: '#006747',
	strokeColor: 'white',
	icon: {
	    src: mm_truck,
	    scale: 0.065
	}
    },
    {
	name: 'Food Pantries',
	geojson: food_pantries,
	fillColor: '#64a70b',
	strokeColor: 'white'
    },
    {
	name: 'Soup Kitchens',
	geojson: soup_kitchens,
	fillColor: '#893B67',
	strokeColor: 'white'
    }
];

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
		    <IonIcon slot='icon-only' icon={closeSharp} />
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
		    <IonIcon slot='icon-only' icon={closeSharp} />
		</IonButton>
	    </IonButtons>
	    </IonToolbar>
	</IonHeader>
	<IonContent className='ion-padding'>
	    <LayerToggles />
	</IonContent>
    </IonModal>;
}

const meta: Meta<typeof Map> = {
    component: Map,
    render: (props) => {
	const geocoderInput = <GeocoderInput
	onGeocode={({latlng, address}: onGeocodeProps) => {
	    
	    /*
	       if(onMapCenter !== undefined){
	       onMapCenter({
	       address,
	       lat: latlng?.lat || null,
	       lng: latlng?.lng || null,
	       });
	       }
	       if(latlng !== null){
	       const point: Coordinate = fromLonLat([latlng.lng, latlng.lat]);
	       setView({
						    center: point,
						    zoom: view.zoom
						});
						setSpotlight!(new Point(point));
						setGeocoderErrorMessage(null);
					    }else{
						setGeocoderErrorMessage('Address not found');
					    }
				    */
	}}
	/>;
	const size: {
	    height: number,
	    width: number
	} = useWindowSize();
	const isMobile: boolean = size.width < 576;
	const controls: MapControl[] = [
	    {
		className:'primaryButtons',
		element: ZoomButtons
	    },
	    {
		className: 'secondaryButtons',
		element: <IonButton id='openLayerToggles'>
		    <IonIcon slot='icon-only' icon={layersSharp} />
		</IonButton>
	    }
	];
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
		    layers={layers}
		    maxZoom={20}
		    minZoom={10}>
		    <GeocoderProvider
			platform='nominatim'
			url='https://nominatim.openstreetmap.org/search'>
			{!isMobile &&
			 <IonGrid>
			     <IonRow style={{height: '100vh'}}>
				 <IonCol>
				     <Map
				     {...props}
					 controls={controls.slice(0, 1)}
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
			    {...props}
				controls={controls}
				onMapClick={() => {
				    setInfoTrigger(new Date());
				}}
			    />
			    <InfoModal trigger={infoTrigger} />
			    <LayerTogglesModal />
			</>}
		    </GeocoderProvider>
		</MapProvider>
	    </div>
	</>;
    }
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {
};
