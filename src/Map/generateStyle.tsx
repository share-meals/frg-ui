import {JSX} from 'react';
import {
    RCircle,
    RFill,
    RIcon,
    RStroke,
    RStyle,
} from 'rlayers/style';

export interface generateStyleProps {
    strokeColor: string,
    fillColor?: string,
    type: 'Point' | 'LineString' | 'Spotlight',
    icon?: {
	src: string,
	scale: number
    },
    radius?: number,
    width?: number,
    zoomPercentage?: number    
}
export const generateStyle = ({
    strokeColor,
    fillColor,
    type,
    icon,
    radius = 12,
    width = 12,
    zoomPercentage = 1
}: generateStyleProps): JSX.Element => {
    switch(type){
	case 'Point':
	    if(icon === undefined){
		return (
		    <RStyle>
			<RCircle radius={radius * zoomPercentage}>
			    <RStroke color={strokeColor} width={width * 0.25 * zoomPercentage} />
			    <RFill color={fillColor} />
			</RCircle>
		    </RStyle>
		);
	    }else{
		return (
		    <RStyle>
			<RIcon
			src={icon.src}
			scale={icon.scale * zoomPercentage}
			/>
		    </RStyle>
		);
	    }
	    break;
	case 'LineString':
	    return (
		<RStyle>
		    <RStroke color={strokeColor} width={width} />
		</RStyle>
	    );
	    break;
	case 'Spotlight':
	    return (
		<RStyle>
		    <RCircle radius={radius * zoomPercentage}>
			<RFill color={strokeColor} />
		    </RCircle>
		</RStyle>
	    );
	default:
	    return (
		<RStyle>
		    <RCircle radius={radius}>
			<RFill color={strokeColor} />
		    </RCircle>
		</RStyle>
	    );
    }
}
