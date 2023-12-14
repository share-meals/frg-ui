import type {
    Meta,
    StoryObj
} from '@storybook/react';
import {
    IonCol,
    IonGrid,
    IonRow
} from '@ionic/react';

import {
    Map,
    MapProvider
} from './Map';
import {
    LayerToggles
} from './MapLayers';
import type {MapLayer} from './Map';
import {
    GeocoderInput,
    GeocoderProvider
} from './Geocoder';
import {Renderer} from './stories_data/Renderer';

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


const meta: Meta<typeof Map> = {
    component: Map,
    render: (props) => {
	return <>
	    <div style={{height: '100vh', width: '100vw'}}>
		<MapProvider
			layers={layers}
		>
		    <GeocoderProvider>
			<IonGrid>
			    <IonRow style={{height: '100vh'}}>
				<IonCol>
				    <Map
				    center={{
					lat: 40.7127281,
					lng: -74.0060152
				    }}
				    geocoderPlatform='nominatim'
				    geocoderUrl='https://nominatim.openstreetmap.org/search'
				    {...props}
				    />
				</IonCol>
				<IonCol>
				    <LayerToggles />
				    <Renderer />
				    <GeocoderInput
				    placeholder={'abc'}
				    onGeocode={({latlng, address}: onGeocodeProps) => {
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
				    }}/>
				</IonCol>
			    </IonRow>
			</IonGrid>
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
