import {Coordinate} from 'ol/coordinate';
import {
    FC,
    useEffect,
    useMemo,
    useState
} from 'react';
import {Feature} from 'ol';
import {
    fromLonLat,
    toLonLat
} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {generateStyle} from './generateStyle';
import {Point} from 'ol/geom';
import {
    RControl,
    RFeature,
    RLayerVector,
    RMap,
    ROSM,
} from 'rlayers';
import type {RMapProps} from 'rlayers/RMap';
import {useMap} from './MapContext';

import 'ol/ol.css';

import type {LatLng} from './interfaces';
import type {MapControl} from './MapControls';
import type {MapLayer} from './MapLayers';

export * from './MapContext';

export interface MapProps extends Partial<RMapProps> {
    controls?: MapControl[],
    featureRadius?: number,
    featureWidth?: number,
    onMapCenter?: ({lat, lng, address}: {lat: number | null, lng: number | null, address: string}) => void,
    onMapClick?: (latlng: LatLng) => void,
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

export const Map: FC<React.PropsWithChildren<MapProps>> = ({
    controls,
    featureRadius = 10,
    featureWidth = 10,
    onMapClick,
    spotlightColor = 'red',
    spotlightRadius = 16,
}: MapProps) => {
    const {
	internalCenter: center,
	layers,
	maxZoom,
	minZoom,
	setClickedFeatures,
	setSpotlight,
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
	    console.log(9999999);
	    console.log(zoom);
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
    }, []);
    
    const controlsRendered = useMemo(() => {
	if(controls){
	    return controls.map((control, index) => {
		return <RControl.RCustom className={control.className} key={index}>
		    {control.element}
		</RControl.RCustom>
	    });
	}else{
	    return <></>;
	}
    }, [controls]);

    const handleClick = (event: any) => {
	const features: Feature[] = event.map.getFeaturesAtPixel(
	    event.pixel,
	    {hitTolerance: 10 * zoomPercentage}
	);
	if(features.length > 0){
	    const featureProperties = features.filter((feature) => {
		return (feature.getProperties()).id !== undefined;
	    }).map((feature: Feature, index: number) => {
		const geometry: any = feature.getGeometry();
		const coords: Coordinate = toLonLat(
		    geometry.getCoordinates()
		);
		const latlng: LatLng = {
		    lat: coords[1],
		    lng: coords[0]
		};
		if(index == 0){
		    setSpotlight(new Point(fromLonLat(coords)));
		    if(onMapClick !== undefined){
			onMapClick(latlng);
		    }
		}

		return {
		    coords: latlng,
		    ...(feature.getProperties())
		}
	    });
	    setClickedFeatures(featureProperties);
	}
    }

    const layersRendered = useMemo(() => {
	return (Object.values(visibleLayers).map((
	    layer: any, // todo: better typing
	    index: number
	) =>
	    <RLayerVector
		key={layer.name}
		features={features[index]}
		visible={layer.visible}
		zIndex={1}>
		{
		    generateStyle({
			fillColor: layer.fillColor,
			strokeColor: layer.strokeColor,
			type: layer.type,
			icon: layer.icon,
			radius: featureRadius,
			width: featureWidth,
			zoomPercentage
		    })
		}
	    </RLayerVector>
	)).reverse();
    }, [features, visibleLayers, zoomPercentage]);

    // wrap in a relative div so controls can be positioned absolute inside
    return <div style={{position: 'relative', height: '100%'}}>
    <RMap
	height='100%'
	initial={view}
	maxZoom={maxZoom}
	minZoom={minZoom}
	noDefaultControls={true}
	onClick={handleClick}
	view={[view, setView]}
	width='100%'>
	<ROSM />
	{controlsRendered}
	{layersRendered}
	<RLayerVector zIndex={2}>
	    {generateStyle({
		strokeColor: spotlightColor,
		type: 'Spotlight',
		radius: spotlightRadius,
		zoomPercentage
	    })}
	    <RFeature geometry={spotlight} />
	</RLayerVector>
	</RMap>
    </div>
    ;
};
