import {
    IonText,
} from '@ionic/react';
import {
    formatDays,
    formatHour,
} from '@/HoursFormatter';
import type {
    Dictionary,
    Hours
} from '@/HoursFormatter';
import {PrivacyPolicy} from './PrivacyPolicy';
import ReactMarkdown from 'react-markdown';

const dictionary: Dictionary = {
    and: ' and ',
    comma: ', ',
    lastComma: ', and ',
    '1': 'Mondays',
    '2': 'Tuesdays',
    '3': 'Wednesdays',
    '4': 'Thursdays',
    '5': 'Fridays',
    '6': 'Saturdays',
    '7': 'Sundays',
}

const formatHours = (hours: any) => {
    return hours.map((h: Hours) => {
	const days = h.days ? formatDays({days: h.days, dictionary}) : null;
	const time_start = h.time_start ? formatHour({time: h.time_start, time_zone: h.time_zone!, format: 'h:mma'}) : null;
	const time_end = h.time_end ? formatHour({time: h.time_end, time_zone: h.time_zone!, format: 'h:mma'}) : null;
	let payload = '- ';
	if(days)payload += days;
	if(time_start){
	    if(days)payload += '  \n';
	    payload += time_start;
	}
	if(time_end){
	    if(time_start)payload += ' - ';
	    payload += time_end;
	}
	if(h.notes){
	    if(days || time_start)payload += '  \n';
	    payload += h.notes;
	}
	return payload;
    }).join('\n');
}

const formatData = (data: any) => {
    return (
`**${data.name}**  
${data.address || ''}  
${data.city || ''}, ${data.state || ''} ${data.zipcode || ''}  
[Get directions](https://www.google.com/maps/dir/${data.lat},${data.lng}//@${data.lat},${data.lng},18.5z?entry=ttu)  
${data.website ? '\nVisit the [website](' + data.website + ')' :''}  
${data.hours !== null ? '\n\n**Hours of Operation**\n' + formatHours(data.hours) : ''}  
${data.notes && data.notes.trim() !== '' ? '\n\n**Notes**  \n' + data.notes : ''}  
${data.trackedBy && data.trackedBy.includes('Plentiful') ? '\n  \nBook an appointment on [Plentiful](https://plentifulapp.com/)' : ''}
`
    );
}


export const Renderer = ({data}: any) => {
    if(data === null){
	return (
	    <>
		<IonText>
		    <p>
			Welcome to the City Harvest Resource Map! Here are all of the food pantries, soup kitchens, community partners. Click on any marker for more information.
		    </p>
		</IonText>
		<PrivacyPolicy />
	    </>
	);
    }else{
	return <IonText>
	    <ReactMarkdown children={formatData(data)} />
	</IonText>;
    }
}
