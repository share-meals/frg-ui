import {JSX} from 'react';
import {
    IonButton,
    IonIcon
} from '@ionic/react';
import {
    addSharp,
    removeSharp
} from 'ionicons/icons';
import type {
    IonButton as IonButtonProps
} from '../interfaces/ionic';

import {
    useMap
} from './MapContext';

export interface ZoomButton extends Omit<IonButtonProps, 'disabled'>{
    direction: '-' | '+'
};

export interface MapControl {
    className: string,
    element: JSX.Element
};

export const ZoomButton = ({
    direction,
    ...props
}: ZoomButton) => {
    const {
	maxZoom,
	minZoom,
	setZoom,
	zoom
    } = useMap();
    return <IonButton
	       disabled={direction === '+' ? zoom! >= maxZoom : zoom! <= minZoom}
	       onClick={() => {
		   const newZoom: number  = zoom! + (direction === '+' ? 1 : -1);
		   setZoom(direction === '+'
			 ? (newZoom > maxZoom ? maxZoom : newZoom)
			 : (newZoom < minZoom ? minZoom : newZoom));
	       }}
    {...props}
    >
	<IonIcon slot='icon-only' icon={direction === '+' ? addSharp : removeSharp} />
    </IonButton>
}

export const ZoomButtons: React.FC<Omit<IonButtonProps, 'disabled'>> = (props) => <>
    <ZoomButton direction='+' {...props} />
    <ZoomButton direction='-' {...props} />
</>;
