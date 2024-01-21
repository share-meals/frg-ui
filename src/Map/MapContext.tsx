import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
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

export const MapProvider = ({
    center,
    children,
    layers = [],
    maxZoom = 20,
    minZoom = 10,
    zoom: zoomFromProps,
}: PropsWithChildren<MapProvider>) => {
    const [internalCenter, setInternalCenter] = useState<MapContext['internalCenter']>(center);
    const [clickedFeatures, setClickedFeatures] = useState<MapContext['clickedFeatures']>([]);
    const [spotlight, setSpotlight] = useState<MapContext['spotlight']>();
    const [visibleLayers, setVisibleLayers] = useState<MapContext['visibleLayers']>(Object.fromEntries(Object.values(layers).map((
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
    const [view, setView] = useState<RView>({
	center: fromLonLat([
	    center.lng,
	    center.lat
	]),
	zoom: zoomFromProps || minZoom
    });
    const [zoom, setZoom] = useState<number>(zoomFromProps || 10);

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
