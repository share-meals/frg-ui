// todo: when clustering, RText is always rendered on top

import {
  createEmpty,
  extend,
  getHeight,
  getWidth
} from 'ol/extent';
import {
  RCircle,
  RFill,
  RIcon,
  RStroke,
  RStyle,
  RText,
} from 'rlayers/style';
import {useCallback} from 'react';

export interface LayerStyle {
  fillColor?: string,
  icon?: string,
  radius?: number,
  scale?: number,
  strokeColor?: string,
  textScale?: number,
  textFillColor?: string,
  textStrokeColor?: string,
  textStrokeWidth?: number,
  type: 'Cluster' | 'LineString' | 'Point' | 'Spotlight',
  width?: number,
}

const SINGLE_CLUSTER_SIZE = 15
const MINIMUM_CLUSTER_SIZE = 25;

const extentFeatures = (features: any, resolution: number) => {
  const extent = createEmpty();
  for (const f of features) extend(extent, f.getGeometry().getExtent());
  if(features.length === 1){
    return SINGLE_CLUSTER_SIZE;
  }
  const size = Math.round((getWidth(extent) + getHeight(extent)) / resolution  * 0.25);
  return size < MINIMUM_CLUSTER_SIZE ? MINIMUM_CLUSTER_SIZE : size;
};

const LineStringStyle: React.FC<Pick<LayerStyle, 'strokeColor' | 'width'>> = ({
  strokeColor = '#106535',
  width = 1
}) => (<RStyle>
  <RStroke
    color={strokeColor}
    width={width}
  />
</RStyle>);

const PointStyle: React.FC<Pick<LayerStyle,
      'fillColor'
  | 'icon'
  | 'radius'
  | 'scale'
  | 'strokeColor'
  | 'width'
>> = ({
  fillColor = '#106535',
  icon,
  radius = 1,
  scale = 1,
  strokeColor = '#106535',
  width = 1
}) => {
  if(icon === undefined){
    return (
      <RStyle>
	<RCircle radius={radius * scale}>
	  <RStroke color={strokeColor} width={width * 0.25 * scale} />
	  <RFill color={fillColor} />
	</RCircle>
      </RStyle>
    );
  }else{
    return (
      <RStyle>
	<RIcon
	  src={icon}
	  scale={scale}
	/>
      </RStyle>
    );
  }
}

const ClusterStyle: React.FC<Pick<LayerStyle,
      'fillColor'
  | 'radius'
  | 'scale'
  | 'strokeColor'
  | 'textFillColor'
  | 'textScale'
  | 'textStrokeColor'
  | 'textStrokeWidth'
  | 'width'
>> = ({
  fillColor,
  radius = 1,
  scale = 1,
  strokeColor = '#106535',
  textScale = 1,
  textFillColor = '#ffffff',
  textStrokeColor = '#000000',
  textStrokeWidth = 1,
  width = 1,
}) => (
  <RStyle
    render={useCallback((feature: any, resolution: number) => {
      const size = feature.get('features').length;
      const radiusFeatures = extentFeatures(
	feature.get('features'),
	resolution
      );
      return <>
	<RCircle radius={radiusFeatures < radius ? radius : radiusFeatures}>
	  <RFill color={fillColor} />
	  <RStroke color={strokeColor} width={width} />
	</RCircle>
	{size > 1 &&
	 <RText text={size.toString()} scale={textScale * scale}>
	   <RFill color={textFillColor} />
	   <RStroke color={textStrokeColor} width={textStrokeWidth} />
	 </RText>
	}
      </>
    }, [])}
  />
);

export const LayerStyle: React.FC<LayerStyle> = ({
  type,
  ...props
}) => {
  switch(type){
    case 'Cluster':
      return <ClusterStyle {...props} />;
      break;
    case 'LineString':
      return <LineStringStyle {...props} />;
      break;
    case 'Point':
      return <PointStyle {...props} />;
      break;
    default:
      return <></>;
      break;
  }
}
