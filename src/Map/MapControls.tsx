import {JSX} from 'react';
import {
    IonButton,
    IonIcon
} from '@ionic/react';
import {
    addSharp,
    removeSharp
} from 'ionicons/icons';

import {
    useMap
} from './MapContext';

export interface ZoomButton {
    type: '-' | '+'
};

export interface MapControl {
    className: string,
    element: JSX.Element
};

export const ZoomButton = ({
    type
}: ZoomButton) => {
    const {
	maxZoom,
	minZoom,
	setZoom,
	zoom
    } = useMap();
    return <IonButton
    disabled={type === '+' ? zoom! >= maxZoom : zoom! <= minZoom}
    onClick={() => {
	const newZoom: number  = zoom! + (type === '+' ? 1 : -1);
	setZoom(type === '+'
	      ? (newZoom > maxZoom ? maxZoom : newZoom)
	      : (newZoom < minZoom ? minZoom : newZoom));
	       }}>
	<IonIcon slot='icon-only' icon={type === '+' ? addSharp : removeSharp} />
    </IonButton>
}

export const ZoomButtons: JSX.Element = <>
    <ZoomButton type='+' />
    <ZoomButton type='-' />
</>;
