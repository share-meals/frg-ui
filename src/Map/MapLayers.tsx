import {
    useMemo
} from 'react';
import {
    IonItem,
    IonCheckbox
} from '@ionic/react';
import {
    useMap
} from './MapContext';

export interface MapLayerProps {
  clusterDistance?: number;
  featureRadius?: number;
  featureWidth?: number;
  fillColor: string;
  geojson: GeoJSON.GeoJSON;
  icon?: string;
  name: string;
  strokeColor: string;
  textScale?: number;
  textFillColor?: string;
  textStrokeColor?: string;
  textStrokeWidth?: number;
  type: string; // 'cluster' | 'vector'
};

export interface VisibleMapLayer extends Omit<MapLayerProps, 'geojson'> {
  visible: boolean,
  featureType: any
}

export interface VisibleMapLayers {
    [key: string]: VisibleMapLayer
}

export const generateMapLayerType = (geojson: GeoJSON.GeoJSON): GeoJSON.GeoJsonTypes => {
  switch(geojson.type){
    case 'FeatureCollection':
      if(geojson.features.length === 0){
	return 'Point';
      }
      return geojson.features[0].geometry.type;
    default:
      // todo: process other GeoJsonTypes
      return 'Point';
  }
}

export const LayerToggles = () => {
    const {
	setVisibleLayers,
	visibleLayers
    } = useMap();
    const layerToggles: JSX.Element[] = useMemo(() => {
	return Object.values(visibleLayers).map((
	    {fillColor, name}: any, // todo: better typing
	    index: number
	) => {
	    return (
		<IonItem key={index}>
		    <IonCheckbox
			checked={visibleLayers[name].visible}
			justify='start'
			labelPlacement='end'
			mode='md'
			onIonChange={(e) => {
			    setVisibleLayers({
				...visibleLayers,
				[name]: {
				    ...visibleLayers[name],
				    visible: e.target.checked
				}
			    });
			}}
			style={{
			    '--border-color': fillColor,
			    '--border-color-checked': fillColor,
			    '--checkbox-background-checked': fillColor,
			    '--checkmark-color': fillColor
			}}>
			{name}
		    </IonCheckbox>
		</IonItem>
	    );
	}
	);
    }, [visibleLayers]);
    return <>
	{layerToggles}
    </>;
}
