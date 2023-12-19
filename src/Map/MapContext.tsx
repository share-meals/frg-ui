import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState
} from 'react';
import type {
    LatLng,
} from './interfaces';

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
    setVisibleLayers: Dispatch<SetStateAction<VisibleMapLayers>>,
    setZoom: Dispatch<SetStateAction<number>>,
    visibleLayers: VisibleMapLayers,
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
    setVisibleLayers: () => {},
    setZoom: () => {},
    visibleLayers: {},
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

export const MapProvider = ({
    center,
    children,
    layers = [],
    maxZoom = 20,
    minZoom = 10,
    zoom: zoomFromProps,
}: PropsWithChildren<MapProvider>) => {
    const [internalCenter, setInternalCenter] = useState<LatLng>(center);
    const [clickedFeatures, setClickedFeatures] = useState<any[]>([])
    const [visibleLayers, setVisibleLayers] = useState<VisibleMapLayers>(Object.fromEntries(Object.values(layers).map((
	layer: MapLayer
    ) =>
	[
	    layer.name,
	    {
		name: layer.name,
		visible: true,
		fillColor: layer.fillColor,
		strokeColor: layer.strokeColor,
		icon: layer.icon,
		type: generateMapLayerType(layer.geojson)
	    }
	]
    )));
    const [zoom, setZoom] = useState<number>(zoomFromProps || 10);

    
    return <MapContext.Provider value={{
	internalCenter,
	clickedFeatures,
	layers,
	maxZoom,
	minZoom,
	setClickedFeatures,
	setInternalCenter,
	setVisibleLayers,
	setZoom,
	visibleLayers,
	zoom
    }}>
    {children}
    </MapContext.Provider>
};
