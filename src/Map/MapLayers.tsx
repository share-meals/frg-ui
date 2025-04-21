import {
    IonItem,
    IonCheckbox
} from '@ionic/react';
import {TinyColor} from '@ctrl/tinycolor';
import {useMap} from './MapContext';
import {useMemo} from 'react';

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
  zIndex?: number;
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
	  const fillColorWithoutAlpha = (new TinyColor(fillColor)).setAlpha(1).toString();
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
			    '--border-color': fillColorWithoutAlpha,
			    '--border-color-checked': fillColorWithoutAlpha,
			    '--checkbox-background-checked': fillColorWithoutAlpha,
			    '--checkmark-color': fillColorWithoutAlpha
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
