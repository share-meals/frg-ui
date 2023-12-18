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
import {useMap} from '../MapContext';
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

export const GeocoderInput = ({
    label = 'Address',
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
	setInternalCenter
    } = useMap();
    const onSubmit = handleSubmit(async (data) => {
	switch(platform){
	    case 'nominatim':
		const latlng: LatLng | null = await geocodeNominatim(
		    data,
		    url
		);
		if(latlng === null){
		    setError(
			'address',
			{
			    type: 'custom',
			    message: 'Address not found. Please try a different one.'
			}
		    );
		}else{
		    setInternalCenter(latlng);
		    onGeocode({
			latlng,
			address: data.address
		    });
		}
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
			    label={label}
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
