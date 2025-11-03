import {
  IonIcon,
  IonButton
} from '@ionic/react';
import {
  useMap
} from '../MapContext';
import {
  ReactNode
} from 'react';

import {
  addSharp,
  removeSharp,
} from 'ionicons/icons';

interface InternalZoomControlProps extends IonButtonProps{
  direction: 'zoomOut' | 'zoomIn';
  icon: ReactNode;
  increment: number;
}

const ZoomControl: React.FC<ZoomControlProps & InternalZoomControlProps> = ({
  icon,
  direction,
  increment,
  ...props
}) => {
  const {
    maxZoom,
    minZoom,
    setZoom,
    zoom
  } = useMap();
  const currentZoom = zoom ? zoom.level : minZoom;
  return <IonButton
	   mode='ios'
	   disabled={direction === 'zoomOut' ? currentZoom <= minZoom
		   : currentZoom >= maxZoom}
	   onClick={() => {
	     switch(direction){
	       case 'zoomOut':
		 setZoom({
		   level: Math.max(minZoom, currentZoom - increment),
		   timestamp: new Date()
		 });
		 break;
	       case 'zoomIn':
		 setZoom({
		   level: Math.min(maxZoom, currentZoom + increment),
		   timestamp: new Date()
		 });
		 break;
	       default:
		 // do nothing
	     }
	   }}
	   {...props}
    >
      {icon}
    </IonButton>;
}


type IonButtonProps = React.ComponentProps<typeof IonButton>;

export interface ZoomControlProps extends IonButtonProps {
  className?: string;
  icon?: ReactNode;
  increment: number;
}

export const ZoomControlIn: React.FC<ZoomControlProps> = ({
  icon,
  ...props
}) => {
  return <ZoomControl
	   direction='zoomIn'
	   {...props}
	   icon={icon ?? <IonIcon slot='icon-only' icon={addSharp} />}
  />;
};

export const ZoomControlOut: React.FC<ZoomControlProps> = ({
  icon,
  ...props
}) => {
  return <ZoomControl
	   direction='zoomOut'
	   {...props}
	   icon={icon ?? <IonIcon slot='icon-only' icon={removeSharp} />}
  />;
};

export interface ZoomControlsProps {
  increment: number;
  wrapperClassName?: string;
  zoomInControlProps?: IonButtonProps;
  zoomOutControlProps?: IonButtonProps;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  increment,
  wrapperClassName,
  zoomInControlProps,
  zoomOutControlProps
}) => {
  return <div className={wrapperClassName ?? 'frg-ui-map-zoom-wrapper'}>
    <ZoomControlIn
      increment={increment}
      {...zoomInControlProps}/>
    <ZoomControlOut
      increment={increment}
      {...zoomOutControlProps} />
  </div>;
};
