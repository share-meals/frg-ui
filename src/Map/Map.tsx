import {applyStyle} from 'ol-mapbox-style';
import {
  fromLonLat,
  toLonLat,
} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {IonIcon} from '@ionic/react';
import {LayerStyle} from './LayerStyle';
import type {MapLayerProps} from './MapLayers';
import { MVT } from 'ol/format';
import {
  RLayerCluster,
  RLayerVector,
  RLayerVectorTile,
  RMap,
} from 'rlayers';
import type {RMapProps} from 'rlayers/RMap';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useMap} from './MapContext';

import {lockClosed} from 'ionicons/icons';
import 'ol/ol.css';

export * from './MapContext';

const getClosestValue = (haystack: {[key: number]: number}, needle: number) => {
  const keys = Object.keys(haystack).map(Number).sort((a, b) => a - b);
  const normalizedNeedle = Math.floor(needle);
  let closestValue = 0;
  // base case
  if(keys[0] > normalizedNeedle){
    return keys[0];
  }
  for(const key of keys){
    if(key <= normalizedNeedle){
      closestValue = haystack[key];
    } else {
      break;
    }
  }
  return closestValue;
}


export interface MapOnFeatureClickProps {
  data: any;
  lat: number;
  lng: number;
}

export interface MapProps extends Partial<RMapProps> {
  controls?: React.ReactElement;
  locked?: boolean;
  onMapCenter?: ({lat, lng, address}: {lat: number | null, lng: number | null, address: string}) => void;
  onFeatureClick?: (arg0: MapOnFeatureClickProps) => void;
  protomapsApiKey: string;
  protomapsStyles: any;
  scalingLookup?: {[key: number]: number};
};

const lockedDivStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  position: 'absolute',
  zIndex: 99
};

export const Map: React.FC<React.PropsWithChildren<MapProps>> = ({
  controls,
  locked = false,
  onFeatureClick,
  protomapsApiKey,
  protomapsStyles,
  scalingLookup = {0: 1},
}: MapProps) => {
  const baseMapRef = useRef<any>();
  const [scale, setScale] = useState<number>(0);
  useEffect(() => {
    if(baseMapRef.current && baseMapRef.current.ol){
      if(baseMapRef.current.ol.getPreload() !== Infinity){
	baseMapRef.current.ol.setPreload(Infinity);
      }else{
	// setting preload retriggers this useEffect
	applyStyle(baseMapRef.current.ol, protomapsStyles);
      }
    }
  }, [baseMapRef.current]);
  const parser = useMemo(() => new MVT(), []);
  const {
    internalCenter: center,
    layers,
    maxZoom,
    minZoom,
    setClickedFeatures,
    setView,
    visibleLayers,
    view,
  } = useMap();

  useEffect(() => {
    setView({
      center: fromLonLat([
	center.lng,
	center.lat
      ]),
      zoom: view.zoom
    });
  }, [center, setView]);

  useEffect(() => {
    const newZoom = view.zoom;
    const newScale = getClosestValue(scalingLookup, newZoom)
    if(scale !== newScale){
      setScale(newScale);
    }
  }, [setScale, view]);
  /////
  
  const features = useMemo(() => {
    return layers.map((
      layer: MapLayerProps,
    ) => {
      const features = new GeoJSON({
	featureProjection: 'EPSG:3857',
      }).readFeatures(layer.geojson);
      for(const feature of features){
	feature.setProperties({
	  layerName: layer.name
	});
      }
      return features;
    });
  }, [layers]);
  
  const layersRendered = useMemo(() => {
    return (Object.values(visibleLayers).map((
      layer: any, //LayerStyle,
      index: number
    ) => {      
      // need to append a new number to key prop
      // to force refresh on changes
      switch(layer.type){
	case 'vector':
	  return <RLayerVector
		   key={`${layer.name}${Date.now()}`}
		   features={features[index]}
		   onClick={(event) => {
		     // TODO: convert this to useCallback
		     // TODO: when features are stacked, this gets called multiple times for each feature
		     const data = event.target.getProperties();
		     setClickedFeatures([data]);
		     if(onFeatureClick){
		       const [lng, lat] = toLonLat(event.coordinate);
		       onFeatureClick({
			 data,
			 lat,
			 lng
		       });
		     }
		     // TODO: log action
		   }}
		   visible={layer.visible}
		   zIndex={layer.zIndex ?? 1}>
	    <LayerStyle
	      fillColor={layer.fillColor}
	      icon={layer.icon}
	      radius={layer.featureRadius}
	      scale={scale}
	      strokeColor={layer.strokeColor}
	      type={layer.featureType}
	      width={layer.featureWidth}
	    />
	  </RLayerVector>;
	  break;
	case 'cluster':
	  return <RLayerCluster
		   distance={layer.clusterDistance}
		   features={features[index]}
		   key={`${layer.name}${Date.now()}`}
		   onClick={(event) => {
		     // TODO: convert this to useCallback
		     const features = event.target.get('features').map((f: any) => {
		       const {geometry, layerName, ...props} = f.getProperties();
		       return props;
		     });
		     setClickedFeatures(features);
		     if(onFeatureClick){
		       const [lng, lat] = toLonLat(event.coordinate);
		       onFeatureClick({
			 data: features,
			 lat,
			 lng
		       });
		     }
		   }}
		   visible={layer.visible}
		   zIndex={layer.zIndex ?? 1}
		 >
	    <LayerStyle
	      fillColor={layer.fillColor}
	      type='Cluster'
	      radius={layer.featureRadius}
	      scale={scale}
	      strokeColor={layer.strokeColor}
	      textScale={layer.textScale}
	      textFillColor={layer.textFillColor}
	      textStrokeColor={layer.textStrokeColor}
	      textStrokeWidth={layer.textStrokeWidth}
	      width={layer.featureWidth}
	    />
	  </RLayerCluster>;
	  break;
	default:
	  return <></>;
      }
    }
    )).reverse();
  }, [features, scale, visibleLayers]);
  
  // wrap in a relative div so controls can be positioned absolute inside
  return <div style={{position: 'relative', height: '100%'}}>
    <RMap
      enableRotation={false}
      height='100%'
      initial={view}
      maxZoom={maxZoom}
      minZoom={minZoom}
      noDefaultControls={true}
      view={[view, setView]}
      width='100%'>
      {controls !== undefined && controls}
      {locked && <div style={lockedDivStyle} className='frg-ui-map-lock'>
	<IonIcon icon={lockClosed} style={{width: '33%', height: '33%'}} />
      </div>}
      <RLayerVectorTile
	format={parser}
	ref={baseMapRef}
	url={`https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=${protomapsApiKey}`}
      />
      {layersRendered}
    </RMap>
  </div>;
};
