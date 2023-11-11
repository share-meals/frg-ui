import {
    IonText,
} from '@ionic/react';
import {PrivacyPolicy} from './PrivacyPolicy';
import ReactMarkdown from 'react-markdown';

const formatData = (data: any) => {
    return (
`**${data.name}**  
${data.address}    
${data.city}, ${data.state} ${data.zipcode}  
[get directions](https://www.google.com/maps/dir/${data.lat},${data.lng}//@${data.lat},${data.lng},18.5z?entry=ttu)
${data.website ? '\nvisit the [website](' + data.website + ')' :''}
${data.hours && data.hours.trim() !== '' ? '\n\n**Hours of Operation**\n' + data.hours.trim().split('\n').map((hour: string) => `- ${hour}`).join('\n') : ''}
${data.notes && data.notes.trim() !== '' ? '\n\n**Notes**  \n' + data.notes : ''}
${data.trackedBy && data.trackedBy.includes('Plentiful') ? '\n  \nBook an appointment on [plentiful](https://plentifulapp.com/)' : ''}`
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
