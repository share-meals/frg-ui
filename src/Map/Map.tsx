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
  RFeature,
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

import LockIcon from '@material-symbols/svg-400/rounded/lock-fill.svg';
import 'ol/ol.css';

export * from './MapContext';
export interface MapOnFeatureClickProps {
  data: any,
  lat: number,
  lng: number,
}

export interface MapProps extends Partial<RMapProps> {
  controls?: React.ReactElement,
  locked?: boolean,
  onMapCenter?: ({lat, lng, address}: {lat: number | null, lng: number | null, address: string}) => void,
  onFeatureClick?: (arg0: MapOnFeatureClickProps) => void,
  protomapsApiKey: string,
  protomapsStyles: any,
  spotlightColor?: string,
  spotlightRadius?: number,
};

const calculateZoomLevel = ({
  zoom,
  minZoom,
  maxZoom
}: {
  zoom: number,
  minZoom: number,
  maxZoom: number
}): number => {
  const newZoomPercentage: number = (zoom - minZoom) / (maxZoom - minZoom);
  if(newZoomPercentage <= 0.25){
    return 0.5;
  }else if(newZoomPercentage <= 0.5){
    return 0.75;
  }else if(newZoomPercentage <= 0.75){
    return 1;
  }else{
    return 1.5;
  }
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
  spotlightColor = 'red',
  spotlightRadius = 16,
}: MapProps) => {
  const baseMapRef = useRef<any>();
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
    //setSpotlight,
    setView,
    setZoom,
    spotlight,
    visibleLayers,
    view,
    zoom
  } = useMap();
  const [zoomPercentage, setZoomPercentage] = useState<number>(1);

  useEffect(() => {
    if(zoom !== undefined){
      setView({
	center: view.center,
	zoom: zoom
      });
    }
  }, [zoom]);
  
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
    const newZoomPercentage: number = calculateZoomLevel({
      zoom: view.zoom,
      minZoom,
      maxZoom
    });
    setZoom(view.zoom);
    if(newZoomPercentage !== zoomPercentage){
      setZoomPercentage(newZoomPercentage);
    }
  }, [view]);

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
		     // todo: convert this to useCallback
		     // todo: when features are stacked, this gets called multiple times for each feature
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
		     // todo: set spotlight
		     // todo: log action
		   }}
		   visible={layer.visible}
		   zIndex={1}>
	    <LayerStyle
	      fillColor={layer.fillColor}
	      icon={layer.icon}
	      radius={layer.featureRadius}
	      strokeColor={layer.strokeColor}
	      type={layer.featureType}
	      width={layer.featureWidth}
	      zoomPercentage={zoomPercentage}
	    />
	  </RLayerVector>;
	  break;
	case 'cluster':
	  return <RLayerCluster
		   distance={layer.clusterDistance}
		   features={features[index]}
		   key={`${layer.name}${Date.now()}`}
		   onClick={(event) => {
		     // todo: convert this to useCallback
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
		 >
	    <LayerStyle
	      fillColor={layer.fillColor}
	      type='Cluster'
	      radius={layer.featureRadius}
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
  }, [features, visibleLayers, zoomPercentage]);
  
  const spotlightLayer = useMemo(() => (
    <RLayerVector zIndex={2}>
      <LayerStyle
	strokeColor={spotlightColor}
	type='Spotlight'
	radius={spotlightRadius}
	zoomPercentage={zoomPercentage}
      />
      <RFeature geometry={spotlight} />
    </RLayerVector>
  ), [spotlightColor, spotlightRadius, zoomPercentage, spotlight]);
  
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
	<IonIcon src={LockIcon}  style={{width: '33%', height: '33%'}} />
      </div>}
      <RLayerVectorTile
	format={parser}
	ref={baseMapRef}
	url={`https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=${protomapsApiKey}`}
      />
      {layersRendered}
      {spotlightLayer}
    </RMap>
  </div>;
};
