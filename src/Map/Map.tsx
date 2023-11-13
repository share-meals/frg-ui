import {
    chevronBackSharp,
    chevronForwardSharp
} from 'ionicons/icons';
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
import {
    GeocoderInput,
    GeocoderProvider,
    useGeocoder
} from './Geocoder';
import type {
    onGeocodeProps
} from './Geocoder';
import GeoJSON from 'ol/format/GeoJSON';
import {generateStyle} from './generateStyle';
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonCol,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {Point} from 'ol/geom';
import {
    RFeature,
    //    RLayerTile,
    RLayerVector,
    RMap,
    ROSM,
} from 'rlayers';
import type {
    RMapProps
} from 'rlayers/RMap';
import {
    RView
} from 'rlayers/RMap';

import 'ol/ol.css';

import type {
    LatLng,
} from './interfaces';

export interface RendererControlsProps {
    page: number,
    setPage: (page: number) => void,
    totalPages: number
};

export interface RendererProps {
    data: any,
    pageRenderer: FC<{data: any}> // todo: better typing
}

export interface MapLayer {
    name: string,
    geojson: GeoJSON.GeoJSON,
    fillColor: string,
    strokeColor: string,
    icon?: {
	src: string,
	scale: number
    }
};

export interface MapProps extends Partial<RMapProps> {
    center: {
	lat: number,
	lng: number
    },
    featureRadius?: number,
    featureWidth?: number,
    geocoderApiKey?: string,
    geocoderLabel?: string,
    geocoderPlatform?: 'nominatim' | 'google',
    geocoderUrl?: string,
    layers: MapLayer[],
    onMapCenter?: ({lat, lng, address}: {lat: number | null, lng: number | null, address: string}) => void,
    onMapClick?: (latlng: LatLng) => void,
    renderer: FC,
    spotlightColor?: string,
    spotlightRadius?: number,
    zoom?: number,
};


const generateMapLayerType = (geojson: GeoJSON.GeoJSON): GeoJSON.GeoJsonTypes => {
    switch(geojson.type){
	case 'FeatureCollection':
	    return geojson.features[0].geometry.type;
	default:
	    // todo: process other GeoJsonTypes
	    return 'Point';
    }
}

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

export const Map: FC<MapProps> = (props) => {
    return <GeocoderProvider>
	<MapComponent {...props} />
    </GeocoderProvider>
}

const MapComponent: FC<MapProps> = ({
    center,
    featureRadius = 10,
    featureWidth = 10,
    geocoderApiKey,
    geocoderLabel,
    geocoderPlatform,
    geocoderUrl,
    layers = [],
    maxZoom = 20,
    minZoom = 10,
    onMapCenter,
    onMapClick,
    renderer,
    spotlightColor = 'red',
    spotlightRadius = 16,
    zoom,
    //    ...props
}: MapProps) => {
    const [view, setView] = useState<RView>({
	center: fromLonLat([
	    center.lng,
	    center.lat
	]),
	zoom: zoom || minZoom
    });
    const [geocoderErrorMessage, setGeocoderErrorMessage] = useState<string | null>(null);
    const [popupData, setPopupData] = useState<{[key: string]: any}[]>([]);
    const [spotlight, setSpotlight] = useState<Point>();
    const [zoomPercentage, setZoomPercentage] = useState<number>(1);

    const {
	setApiKey: setGeocoderApiKey,
	setPlatform: setGeocoderPlatform,
	setUrl: setGeocoderUrl,
    } = useGeocoder();

    useEffect(() => {
	setGeocoderApiKey(geocoderApiKey);
    }, [geocoderApiKey]);
    useEffect(() => {
	setGeocoderPlatform(geocoderPlatform);
    }, [geocoderPlatform]);
    useEffect(() => {
	setGeocoderUrl(geocoderUrl);
    }, [geocoderUrl]);
    
    const geocoderInput = <GeocoderInput
			      placeholder={geocoderLabel}
			      onGeocode={({latlng, address}: onGeocodeProps) => {
				  if(onMapCenter !== undefined){
				      onMapCenter({
					  address,
					  lat: latlng?.lat || null,
					  lng: latlng?.lng || null,
				      });
				     }
				  if(latlng !== null){
				      const point: Coordinate = fromLonLat([latlng.lng, latlng.lat]);
				      setView({
					  center: point,
					  zoom: view.zoom
				      });
				      setSpotlight!(new Point(point));
				      setGeocoderErrorMessage(null);
				  }else{
				      setGeocoderErrorMessage('Address not found');
				  }
			      }}/>;

    useEffect(() => {
	const newZoomPercentage: number = calculateZoomLevel({
	    zoom: view.zoom,
	    minZoom,
	    maxZoom
	});
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

    const [visibleLayers, setVisibleLayers] = useState(Object.fromEntries(Object.values(layers).map((
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
    
    const layerToggles: JSX.Element[] = useMemo(() => {
	return Object.values(visibleLayers).map((
	    {fillColor, name}: any, // todo: better typing
	    index: number
	) => {
	    return (
		<IonItem key={index}>
		    <IonCheckbox
			checked={visibleLayers[name].visible}
			justify='start'
			labelPlacement='end'
			mode='md'
			onIonChange={(e) => {
			    setVisibleLayers({
				...visibleLayers,
				[name]: {
				    ...visibleLayers[name],
				    visible: e.target.checked
				}
			    });
			}}
			style={{
			    '--border-color': fillColor,
			    '--border-color-checked': fillColor,
			    '--checkbox-background-checked': fillColor,
			    '--checkmark-color': fillColor
			}}>
			{name}
		    </IonCheckbox>
		</IonItem>
	    );
	}
	);
    }, [visibleLayers]);

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

	    setPopupData(featureProperties);
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

    return (
	<>
	    <IonGrid style={{height: '100%'}}>
		<IonRow style={{height: '100%'}}>
		    <IonCol size='8' style={{height: '100%'}}>
			<RMap
			    height='100%'
			    initial={view}
			    maxZoom={maxZoom}
			    minZoom={minZoom}
			    onClick={handleClick}
			    view={[view, setView]}
			    width='100%'>
			    <ROSM />
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
		    </IonCol>
		    <IonCol size='4'>
			<IonList>
			    {layerToggles}
			</IonList>
			{geocoderInput}
			{geocoderErrorMessage !== null
			&&
			 <IonCard color='danger'>
			     <IonCardContent>
				 <IonText>
				     {geocoderErrorMessage}
				 </IonText>
			     </IonCardContent>
			 </IonCard>
			}
			<Renderer
			data={popupData}
			key={JSON.stringify(popupData)}
			pageRenderer={renderer}
			/>
		    </IonCol>
		</IonRow>
	    </IonGrid>
	</>
    );
};

const RendererControls: FC<RendererControlsProps> = ({
    page,
    setPage,
    totalPages
}) => {
    return <>
	<IonHeader class='ion-no-border'>
	    <IonToolbar>
		<IonButtons slot='start'>
		    <IonButton
			fill='clear'
			size='small'
			onClick={() => {
			    setPage(page - 1);
			}}>
			<IonIcon
			icon={chevronBackSharp}
			slot='icon-only' />
		    </IonButton>
		</IonButtons>
		<IonTitle className='ion-text-center' size='small'>
		    <IonText>
			{page + 1} of {totalPages}
		    </IonText>
		</IonTitle>
		<IonButtons slot='end'>
		    <IonButton
			fill='clear'
			size='small'
			onClick={() => {
			    setPage(page + 1);
			}}>
			<IonIcon
			icon={chevronForwardSharp}
			slot='icon-only' />
		    </IonButton>
		</IonButtons>
	    </IonToolbar>
	</IonHeader>
    </>;
};

const Renderer: FC<RendererProps> = ({
    data,
    pageRenderer: PageRenderer
}: RendererProps) => {
    const [page, setPage] = useState(0);
    if(data === undefined
       || data.length === 0){
	return (
	    <>
		<PageRenderer data={null} />
	    </>
	);
    }else{
	return (
	    <>
	    {data.length > 1
	  && <RendererControls {...{page, setPage}} totalPages={data.length} />}
		<PageRenderer data={data[page]}/>
	    </>
	);
    }
};
