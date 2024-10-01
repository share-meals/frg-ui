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

interface MapContext {
  clickedFeatures: any[],
  internalCenter: LatLng,
  layers: MapLayerProps[],
  maxZoom: number,
  minZoom: number,
  setClickedFeatures: Dispatch<SetStateAction<any>>
  setInternalCenter: Dispatch<SetStateAction<LatLng>>,
  setView: Dispatch<SetStateAction<RView>>,
  setVisibleLayers: Dispatch<SetStateAction<VisibleMapLayers>>,
  setZoom: Dispatch<SetStateAction<number>>,
  visibleLayers: VisibleMapLayers,
  view: RView,
  zoom?: number
};

const MapContext = createContext<MapContext>({
  clickedFeatures: [],
  internalCenter: {
    lat: 0,
    lng: 0
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
  zoom: 10
});

export const useMap = () => useContext(MapContext);

export interface MapProviderProps {
  center: LatLng,
  layers: MapLayerProps[],
  maxZoom: number,
  minZoom: number,
  zoom?: number,
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
    zoom: zoomFromProps || minZoom
  });
  const [zoom, setZoom] = useState<number>(zoomFromProps || 10);

  useEffect(() => {
    if(propsCenter.lat !== center.lat
       || propsCenter.lng !== center.lng){
      setPropsCenter(center);
      setInternalCenter(center);
      setView({
	center: fromLonLat([
	  center.lng,
	  center.lat
	]),
	zoom: zoom
      });
    }
  }, [center]);

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
