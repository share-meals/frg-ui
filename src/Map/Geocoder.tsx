// TODO: allow to be multilingual

import {Input} from '../Input';
import {IonInput} from '@ionic/react';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from '@ionic/react';
import { Library } from '@googlemaps/js-api-loader';
import {search} from 'ionicons/icons';
import {useForm} from 'react-hook-form';
import {useJsApiLoader} from '@react-google-maps/api';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

interface ComponentRestrictions {
  country?: string | string[] | any;
  administrativeArea?: string;
  locality?: string;
  postalCode?: string;
  route?: string;
}

interface GeocodingOptions {
  address: string;
  region?: string;
  language?: string;
  componentRestrictions?: ComponentRestrictions;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  placeId?: string;
}

const geocode = async (options: GeocodingOptions): Promise<google.maps.GeocoderResult[]> => {
  const geocoder = new window.google.maps.Geocoder(); // assume this is only called once google has been loaded
  
  // Set default parameters
  const params = {
    language: 'en',
    region: '',
    componentRestrictions: {},
    ...options
  };

  return new Promise((resolve, reject) => {
    geocoder.geocode(params, (results, status) => {
      if (status === 'OK') {
        resolve(results as google.maps.GeocoderResult[]);
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
};

const libraries: Library[] = ['places'];

// use partial extend because name field is required by IonInput
export interface GeocoderProps extends Partial<React.ComponentProps<typeof IonInput>>{
  apiKey: string,
  bounds?: any,
  components?: any,
  language?: string,
  region?: string,
  onGeocode: (props: onGeocode) => void,
};

export type onGeocode =  google.maps.GeocoderResult[];

export const Geocoder = ({
  apiKey,
  bounds,
  components,
  label = 'Address',
  language,
  onGeocode,
  placeholder,
  region,
  ...props
}: GeocoderProps) => {
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
  const {isLoaded: isGoogleMapsLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries
  });
  const onSubmit = handleSubmit(async (data) => {
    try{
      const results: google.maps.GeocoderResult[] = await geocode({
	address: data.address,
	bounds,
	componentRestrictions: components,
	language,
	region
      });
      onGeocode(results);
    }catch(error){
      setError(
	'address',
	{
	  type: 'custom',
	  message: 'Address not found. Please try a different one.'
	}
      );
    }
  });
  return <>
    <form onSubmit={onSubmit}>
      <IonGrid>
	<IonRow className='ion-align-items-start'>
	  <IonCol>
	    <Input
	      aria-label='address'
	      control={control}
	      disabled={isSubmitting || !isGoogleMapsLoaded}
	      label={label}
	      name='address'
	      placeholder={placeholder}
	      role='textbox'
	    {...props}
	    />
	  </IonCol>
	  <IonCol size='auto' style={{paddingLeft: 0, paddingTop: 10}}>
	    <IonButton
	      aria-label='search'
	      disabled={isSubmitting || !isGoogleMapsLoaded}
	      fill='clear'
	      role='button'
	      type='submit'>
	      <IonIcon
		aria-hidden='true'
		icon={search}
		slot='icon-only'
	      />
	    </IonButton>
	  </IonCol>
	</IonRow>
      </IonGrid>
    </form>
  </>;
}
