import {Input} from '@/Input';
import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
} from '@ionic/react';
import {
    searchSharp
} from 'ionicons/icons';
import type {
    LatLng,
} from '../interfaces';
import {
    useForm
} from 'react-hook-form';
import {useGeocoder} from './GeocoderContext';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

export interface GeocoderInputProps {
    label?: string,
    onGeocode: (props: onGeocodeProps) => void,
    placeholder?: string
};

export interface GeocoderGeocodeProps {
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

export interface onGeocodeProps {
    latlng: LatLng | null,
    address: string
};

const geocodeNominatim = async (
    data: GeocoderGeocodeProps,
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

/*
   const geocodeGoogle = async (
   data: GeocoderInputProps,
   apiKey: string | undefined
   ): Promise<LatLng | null> => {
   if(apiKey === null){
   // todo: error checking
   return null;
   }
   GoogleGeocoder.setApiKey(apiKey);
   const response = await GoogleGeocoder.fromAddress(data.address);
   if(response.status === 'OK'){
   return {
   lat: response.results[0].geometry.location.lat,
   lng: response.results[0].geometry.location.lng
   };
   }else{
   // todo: error checking
   return {
   lat: 0,
   lng: 0
   }
   }
   };
 */

export const GeocoderInput = ({
    label,
    onGeocode,
    placeholder
}: GeocoderInputProps) => {
    const schema = z.object({
	address: z.string()
		  .min(3)
		  .max(100)
    });
    const {
	control,
	formState: {isSubmitting},
	handleSubmit
    } = useForm<z.infer<typeof schema>>({
	//mode: 'onChange',
	resolver: zodResolver(schema)
    });
    const {
	platform,
	url,
	//apiKey // used for Google Geocoder
    } = useGeocoder();
    const onSubmit = handleSubmit(async (data) => {
	switch(platform){
	    case 'nominatim':
		onGeocode({
		    latlng: await geocodeNominatim(
			data,
			url
		    ),
		    address: data.address
		});
		break;
	    default:
		// do nothing?
		break;
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
			    label={label || 'Address'}
			    name='address'
			    placeholder={placeholder}
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
				icon={searchSharp}
				slot='icon-only'
			    />
			</IonButton>
		    </IonCol>
		</IonRow>
	    </IonGrid>
	</form>
    </>;
}
