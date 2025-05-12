import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import {fromLonLat} from 'ol/proj';
import type {
  LatLng,
} from './interfaces';
import {RView} from 'rlayers/RMap';
import {
  generateMapLayerType,
} from './MapLayers';

import type {
  MapLayerProps,
  VisibleMapLayers
} from './MapLayers';

export interface TimestampedLatLng extends LatLng {
  timestamp?: Date
}

export interface TimestampedZoom {
  level: number,
  timestamp?: Date
}


interface MapContext {
  clickedFeatures: any[],
  internalCenter: TimestampedLatLng,
  layers: MapLayerProps[],
  maxZoom: number,
  minZoom: number,
  setClickedFeatures: Dispatch<SetStateAction<any>>
  setInternalCenter: Dispatch<SetStateAction<TimestampedLatLng>>,
  setView: Dispatch<SetStateAction<RView>>,
  setVisibleLayers: Dispatch<SetStateAction<VisibleMapLayers>>,
  setZoom: Dispatch<SetStateAction<TimestampedZoom>>,
  visibleLayers: VisibleMapLayers,
  view: RView,
  zoom?: TimestampedZoom
};

const MapContext = createContext<MapContext>({
  clickedFeatures: [],
  internalCenter: {
    lat: 0,
    lng: 0,
    timestamp: new Date()
  },
  layers: [],
  maxZoom: 16,
  minZoom: 12,
  setClickedFeatures: () => {},
  setInternalCenter: () => {},
  setView: () => {},
  setVisibleLayers: () => {},
  setZoom: () => {},
  visibleLayers: {},
  view: {
    center: fromLonLat([0, 0]),
    zoom: 0
  },
  zoom: {level: 12}
});

export const useMap = () => useContext(MapContext);

export interface MapProviderProps {
  center: TimestampedLatLng,
  layers: MapLayerProps[],
  maxZoom: number,
  minZoom: number,
  zoom?: TimestampedZoom,
}

const convertToGeojson = (
  layer: MapLayerProps,
  visible: boolean = true
) => {
  const {geojson, ...layerProps} = layer;
  return [
    layerProps.name,
    {
      ...layerProps,
      visible,
      featureType: generateMapLayerType(layer.geojson)
    }
  ];
};

export const MapProvider = ({
  center,
  children,
  layers = [],
  maxZoom = 16,
  minZoom = 12,
  zoom: zoomFromProps,
}: PropsWithChildren<MapProviderProps>) => {
  const [internalCenter, setInternalCenter] = useState<MapContext['internalCenter']>(center);
  const [propsCenter, setPropsCenter] = useState<MapContext['internalCenter']>(center);
  const [propsLayers, setPropsLayers] = useState<string>(JSON.stringify(layers));
  const [clickedFeatures, setClickedFeatures] = useState<MapContext['clickedFeatures']>([]);
  const [visibleLayers, setVisibleLayers] = useState<MapContext['visibleLayers']>(Object.fromEntries(Object.values(layers).map(
    (l) => {
      return convertToGeojson(l);
    }
  )));
  const [view, setView] = useState<RView>({
    center: fromLonLat([
      center.lng,
      center.lat
    ]),
    zoom: zoomFromProps ? zoomFromProps.level : minZoom
  });
  const [zoom, setZoom] = useState<TimestampedZoom>(zoomFromProps || {level: minZoom});

  useEffect(() => {
    if(propsCenter.timestamp !== center.timestamp){
      setPropsCenter(center);
      setInternalCenter(center);
      setView({
	center: fromLonLat([
	  center.lng,
	  center.lat
	]),
	zoom: zoom.level
      });
    }
  }, [center]);

  useEffect(() => {
    if(zoomFromProps !== undefined){
      setZoom(zoomFromProps);
    }
  }, [zoomFromProps]);

  useEffect(() => {
    if(propsLayers !== JSON.stringify(layers)){
      const newVisibleLayers = Object.fromEntries(Object.values(layers).map(
	(l) => {
	  return convertToGeojson(l, visibleLayers[l.name]?.visible);
	}
      ));
      setVisibleLayers(newVisibleLayers);
      setPropsLayers(JSON.stringify(layers));
    }
  }, [layers]);

  return <MapContext.Provider value={{
    internalCenter,
    clickedFeatures,
    layers,
    maxZoom,
    minZoom,
    setClickedFeatures,
    setInternalCenter,
    setView,
    setVisibleLayers,
    setZoom,
    visibleLayers,
    view,
    zoom
  }}>
    {children}
  </MapContext.Provider>
};
