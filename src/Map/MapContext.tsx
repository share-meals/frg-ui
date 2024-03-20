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
import {Point} from 'ol/geom';
import {
  generateMapLayerType,
} from './MapLayers';

import type {
  MapLayer,
  VisibleMapLayers
} from './MapLayers';

interface MapContext {
  clickedFeatures: any[],
  internalCenter: LatLng,
  layers: MapLayer[],
  maxZoom: number,
  minZoom: number,
  setClickedFeatures: Dispatch<SetStateAction<any>>
  setInternalCenter: Dispatch<SetStateAction<LatLng>>,
  setSpotlight: Dispatch<SetStateAction<Point | undefined>>,
  setView: Dispatch<SetStateAction<RView>>,
  setVisibleLayers: Dispatch<SetStateAction<VisibleMapLayers>>,
  setZoom: Dispatch<SetStateAction<number>>,
  spotlight: Point | undefined,
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
  maxZoom: 20,
  minZoom: 20,
  setClickedFeatures: () => {},
  setInternalCenter: () => {},
  setSpotlight: () => {},
  setView: () => {},
  setVisibleLayers: () => {},
  setZoom: () => {},
  spotlight: undefined,
  visibleLayers: {},
  view: {
    center: fromLonLat([0, 0]),
    zoom: 0
  },
  zoom: 10
});

export const useMap = () => useContext(MapContext);

export interface MapProvider {
  center: LatLng,
  layers: MapLayer[],
  maxZoom: number,
  minZoom: number,
  zoom?: number,
}

const convertToGeojson = (
  layer: MapLayer,
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

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const MapProvider = ({
  center,
  children,
  layers = [],
  maxZoom = 20,
  minZoom = 10,
  zoom: zoomFromProps,
}: PropsWithChildren<MapProvider>) => {
  const [internalCenter, setInternalCenter] = useState<MapContext['internalCenter']>(center);
  const [propsCenter, setPropsCenter] = useState<MapContext['internalCenter']>(center);
  const [propsLayers, setPropsLayers] = useState<string>(JSON.stringify(layers));
  const [clickedFeatures, setClickedFeatures] = useState<MapContext['clickedFeatures']>([]);
  const [spotlight, setSpotlight] = useState<MapContext['spotlight']>();
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
    setSpotlight,
    setView,
    setVisibleLayers,
    setZoom,
    spotlight,
    visibleLayers,
    view,
    zoom
  }}>
    {children}
  </MapContext.Provider>
};
