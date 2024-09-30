import {IonButton} from '@ionic/react';
import {
  Map,
  MapProvider
} from './Map';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import protomapsStyles from './stories_data/protomapsStyles';
import {
  useCallback,
  useState,
} from 'react';

const prospectPark = {lat: 40.66019478378121, lng: -73.96947593651886};

const meta: Meta<typeof Map> = {
  component: Map,
  render: ({protomapsApiKey, protomapsStyles: protomapsStylesProp, ...props}) => {
    const [center, setCenter] = useState<any>(prospectPark);
    const jiggle = useCallback(() => {
	setCenter({
	  lat: prospectPark.lat + 0.001 * Math.random(),
	  lng: prospectPark.lng + 0.001 * Math.random(),
	});
    }, [setCenter]);
    return <>
      <IonButton onClick={jiggle}>
	Jiggle near Prospect Park
      </IonButton>
      <br />
      [{center.lat}, {center.lng}]
      <div style={{height: '50vh', width: '100vw'}}>
	<MapProvider
	  center={center}
	  layers={[]}
	  maxZoom={16}
	  minZoom={12}>
	  <Map
	    protomapsApiKey={import.meta.env.VITE_PROTOMAPS_API_KEY}
	    protomapsStyles={protomapsStyles}
	  {...props}
	  />
	</MapProvider>
      </div>
    </>;
  },
  title: 'Components/Map'
}

export default meta;
type Story = StoryObj<typeof Map>;

export const CenterButton: Story = {};
