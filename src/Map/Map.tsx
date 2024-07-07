import {apply} from 'ol-mapbox-style';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  fromLonLat,
  toLonLat,
} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {IonIcon} from '@ionic/react';
import {LayerStyle} from './LayerStyle';
import {
  RFeature,
  RLayerCluster,
  RLayerVector,
  RLayerVectorTile,
  RMap,
} from 'rlayers';
import { MVT } from 'ol/format';
import type {RMapProps} from 'rlayers/RMap';
import LockIcon from '@material-symbols/svg-400/rounded/lock-fill.svg';
import {useMap} from './MapContext';

import 'ol/ol.css';

import type {MapLayer} from './MapLayers';

export * from './MapContext';

export interface MapProps extends Partial<RMapProps> {
  controls?: React.ReactElement,
  featureRadius?: number,
  featureWidth?: number,
  locked?: boolean,
  onMapCenter?: ({lat, lng, address}: {lat: number | null, lng: number | null, address: string}) => void,
  onFeatureClick?: ({data, lat, lng}: {data: any, lat: number, lng: number}) => void,
  protomapsApiKey: string,
  protomapsStyles: number,
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
  featureRadius = 10,
  featureWidth = 10,
  locked = false,
  onFeatureClick,
  protomapsApiKey,
  protomapsStyles,
  spotlightColor = 'red',
  spotlightRadius = 16,
}: MapProps) => {
  const mapRef = useRef<any>();
  useEffect(() => {
    if(mapRef.current){
      // todo: this gets called twice, possibly because it's run in dev mode?
      apply(mapRef.current.ol, protomapsStyles);
    }
  }, [mapRef.current]);
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
      layer: MapLayer,
    ) => {
      const features: any = new GeoJSON({
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
      layer: any, // todo: better typing
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
	      radius={featureRadius}
	      strokeColor={layer.strokeColor}
	      type={layer.featureType}
	      width={featureWidth}
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
	      radius={featureRadius}
	      strokeColor={layer.strokeColor}
	      textScale={layer.textScale}
	      textFillColor={layer.textFillColor}
	      textStrokeColor={layer.textStrokeColor}
	      textStrokeWidth={layer.textStrokeWidth}
	      width={featureWidth}
	    />
	  </RLayerCluster>;
	  break;
	default:
	  return <></>;
      }
    }
    )).reverse();
  }, [features, visibleLayers, zoomPercentage]);
  // wrap in a relative div so controls can be positioned absolute inside
  return <div style={{position: 'relative', height: '100%'}}>
    <RMap
      enableRotation={false}
      height='100%'
      initial={view}
      maxZoom={maxZoom}
      minZoom={minZoom}
      noDefaultControls={true}
      ref={mapRef}
      view={[view, setView]}
      width='100%'>
      {controls !== undefined && controls}
      {locked && <div style={lockedDivStyle} className='frg-ui-map-lock'>
	<IonIcon src={LockIcon}  style={{width: '33%', height: '33%'}} />
      </div>}
      <RLayerVectorTile
	url={`https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=${protomapsApiKey}`}
	format={parser} />
      {layersRendered}
      <RLayerVector zIndex={2}>
	<LayerStyle
	strokeColor={spotlightColor}
	type='Spotlight'
	radius={spotlightRadius}
	zoomPercentage={zoomPercentage}
	/>
	<RFeature geometry={spotlight} />
      </RLayerVector>
    </RMap>
  </div>;
};
