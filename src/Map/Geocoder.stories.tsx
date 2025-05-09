import {getMapStyle} from './MapStyle';
import {
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import {
  Map,
  MapProvider,
  useMap,
} from './Map';
import type {
  Meta,
  StoryObj
} from '@storybook/react';

import {Geocoder} from './Geocoder';


const GeocoderWrapper: React.FC<any> = ({onGeocode, ...props}) => {
  const {setInternalCenter} = useMap();
  return <>
    <Geocoder
      apiKey={import.meta.env.VITE_GOOGLEMAPS_GEOCODER_API_KEY as string}
      helperText={JSON.stringify(props)}
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

const meta: Meta<typeof Geocoder> = {
  component: Geocoder,
  render: (props) => {
    return <>
      <div style={{height: '100vh', width: '100%'}}>
	<MapProvider
	  center={{
	    lat: 40.7127281,
	    lng: -74.0060152
	  }}
	  layers={[]}
	  maxZoom={15}
	  minZoom={15}>
	  <IonGrid>
	    <IonRow>
	      <IonCol>
		<GeocoderWrapper {...props} />
	      </IonCol>
	    </IonRow>
	    <IonRow style={{height: '40rem'}}>
	      <IonCol>
		<Map
		  protomapsApiKey={import.meta.env.VITE_PROTOMAPS_API_KEY as string}
		  protomapsStyles={getMapStyle({apiKey: import.meta.env.VITE_PROTOMAPS_API_KEY, theme: 'grayscale'})}
		/>
	      </IonCol>
	    </IonRow>
	  </IonGrid>
	</MapProvider>
      </div>
    </>;
  }
};

export default meta;
type Story = StoryObj<typeof Geocoder>;

export const Default: Story = {args: {}};

export const WithComponents: Story = {
  args: {
    components: {
      locality: 'Brooklyn'
    }
  }
}

export const WithRegion: Story = {
  args: {
    region: 'ca'
  }
}

export const WithBounds: Story = {
  args: {
    bounds: {
      east: -73.9667,
      west: -74.0200, 
      north: 40.7300,
      south: 40.6974
    }
  }
}

export const WithLanguage: Story = {
  args: {
    language: 'es'
  }
}
