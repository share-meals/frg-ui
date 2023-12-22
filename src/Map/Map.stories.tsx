import {
    useEffect,
    useRef,
    useState
} from 'react';
import {RControl} from 'rlayers'
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
import {
    Map,
    MapProvider
} from './Map';
import {ZoomButtons} from './MapControls';
import type {MapControl} from './MapControls';
import {LayerToggles} from './MapLayers';
import type {MapLayer} from './MapLayers';
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
	// @ts-ignore
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
	// @ts-ignore
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
	// @ts-ignore
	geojson: food_pantries,
	fillColor: '#64a70b',
	strokeColor: 'white'
    },
    {
	name: 'Soup Kitchens',
	// @ts-ignore
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
	helperText='To find food near you, please enter your address, city, and zip code'
	fill='outline'
	onGeocode={() => {
	    
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
	    height: number | null,
	    width: number | null
	} = useWindowSize();
	const isMobile: boolean = size.width === null ? false : size.width < 576; // if size is not available, assume desktop
	const controls: MapControl[] = [
	    {
		className: '',
		element: <IonButton>
		    hello world
		</IonButton>
	    },
	    /*
	    {
		className: 'secondaryButtons',
		element: <IonButton id='openLayerToggles'>
		    <IonIcon slot='icon-only' icon={layersSharp} />
		</IonButton>
	    }
	    */
	];
	console.log(controls);
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
				     <Map {...props}>
					 <RControl.RCustom className='primaryButtons'>
					     <ZoomButtons size='small' />
					 </RControl.RCustom>
				     </Map>
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
				onMapClick={() => {
				    setInfoTrigger((new Date()).toString());
				}}>
				<RControl.RCustom className='primaryButtons'>
				    <ZoomButtons size='small' />
				</RControl.RCustom>
				<RControl.RCustom className='secondaryButtons'>
				    <IonButton id='openLayerToggles' size='small'>
					<IonIcon slot='icon-only' icon={layersSharp} />
				    </IonButton>
				</RControl.RCustom>
			    </Map>

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
