import {fromLonLat} from 'ol/proj';
import {Input} from '../../Input';
import {IonInput} from '@ionic/react';
import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
} from '@ionic/react';
import type {LatLng} from '../interfaces';
import {Point} from 'ol/geom';
import SearchIcon from '@material-symbols/svg-400/rounded/search.svg';
import {
    useForm
} from 'react-hook-form';
import {useGeocoder} from './GeocoderContext';
import {useMap} from '../MapContext';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

// use partial extend because name field is required by IonInput
export interface GeocoderInput extends Partial<React.ComponentProps<typeof IonInput>>{
    onGeocode?: (props: onGeocode) => void,
    onGeocodeZoom?:  number
};

export interface GeocoderGeocode {
    address: string
};

export interface NominatimSearchResult {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    boundingbox: string[],
    lat: string,
    lon: string,
    display_name: string,
    class: string,
    type: string,
    importance: number,
    // Defined when SearchOptions.addressdetails is provided
    address?: {
	road: string,
	suburb: string,
	city_district: string,
	city: string,
	county: string,
	state: string,
	postcode: string,
	country: string,
	country_code: string,
    }
};

export interface onGeocode {
    latlng: LatLng | null,
    address: string
};

const geocodeNominatim = async (
    data: GeocoderGeocode,
    url: string | undefined
): Promise<LatLng | null> => {
    const geocoderResponse = await fetch(`${url}?q=${data.address}&limit=1&format=json`);
    const geocoderJson: NominatimSearchResult[] = await geocoderResponse.json();
    if(geocoderJson.length > 0){
	return {
	    lat: parseFloat(geocoderJson[0].lat),
	    lng: parseFloat(geocoderJson[0].lon)
	};
    }else{
	// todo: error checking
	return null;
    }
};

export const GeocoderInput = ({
    label = 'Address',
    onGeocode,
    onGeocodeZoom,
    placeholder,
    ...props
}: GeocoderInput) => {
    const schema = z.object({
	address: z.string()
		  .min(3)
		  .max(100)
    });
    const {
	control,
	formState: {isSubmitting},
	handleSubmit,
	setError,
    } = useForm<z.infer<typeof schema>>({
	resolver: zodResolver(schema)
    });
    const {
	platform,
	url
    } = useGeocoder();
    const {
	setInternalCenter,
	setSpotlight,
	setView
    } = useMap();
    const onSubmit = handleSubmit(async (data) => {
	let latlng: LatLng | null = null;
	switch(platform){
	    case 'nominatim':
		latlng = await geocodeNominatim(
		    data,
		    url
		);
		break;
	    default:
		// do nothing?
		break;
	}
	
	if(latlng === null){
	    setError(
		'address',
		{
		    type: 'custom',
		    message: 'Address not found. Please try a different one.'
		}
	    );
	}else{
	    if(onGeocodeZoom){
		setView({
		    center: fromLonLat([latlng.lng, latlng.lat]),
		    zoom: onGeocodeZoom
		});
	    }else{
		setInternalCenter(latlng);
	    }
	    setSpotlight(
		new Point(
		    fromLonLat([
			latlng.lng,
			latlng.lat
		    ])
		)
	    );
	    if(onGeocode){
		onGeocode({
		    latlng,
		    address: data.address
		});
	    }
	}
    });
    return <>
	<form onSubmit={onSubmit}>
	    <IonGrid>
		<IonRow className='ion-align-items-start'>
		    <IonCol>
			<Input
			    control={control}
			    disabled={isSubmitting}
			    label={label}
			    name='address'
			    placeholder={placeholder}
			{...props}
			/>
		    </IonCol>
		    <IonCol size='auto' style={{paddingLeft: 0, paddingTop: 10}}>
			<IonButton
			    aria-label='search'
			    disabled={isSubmitting}
			    fill='clear'
			    type='submit'>
			    <IonIcon
				aria-hidden='true'
				icon={SearchIcon}
				slot='icon-only'
			    />
			</IonButton>
		    </IonCol>
		</IonRow>
	    </IonGrid>
	</form>
    </>;
}
