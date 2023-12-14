import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState
} from 'react';

import {
    generateMapLayerType,
} from './MapLayers';

import type {
    MapLayer,
    VisibleMapLayers
} from './MapLayers';

interface MapContextProps {
    clickedFeatures: any[],
    layers: MapLayer[],
    setClickedFeatures: Dispatch<SetStateAction<any>>
    setVisibleLayers: Dispatch<SetStateAction<VisibleMapLayers>>,
    visibleLayers: VisibleMapLayers
};

const MapContext = createContext<MapContextProps>({
    clickedFeatures: [],
    layers: [],
    setClickedFeatures: () => {},
    setVisibleLayers: () => {},
    visibleLayers: {}
});

export const useMap = () => useContext(MapContext);

export interface MapProvider {
    layers: MapLayer[],
    visibleLayers: VisibleMapLayers
}

export const MapProvider = ({
    children,
    layers = []
}: PropsWithChildren<MapProvider>) => {
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

    
    return <MapContext.Provider value={{
	clickedFeatures,
	layers,
	setClickedFeatures,
	setVisibleLayers,
	visibleLayers
    }}>
    {children}
    </MapContext.Provider>
};
