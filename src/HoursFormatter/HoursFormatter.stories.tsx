import {
    ComponentStory,
    ComponentMeta
} from '@storybook/react';
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonRow,
} from '@ionic/react';
import {
    checkmarkSharp,
    closeSharp
} from 'ionicons/icons';

import {
    formatDays,
    formatHour,
    isValid,
    Hours,
    Dictionary
} from './HoursFormatter';

export default {
    title: 'Utilities/HoursFormatter',
    component: IonContent
} as ComponentMeta<typeof IonContent>;


interface ITime {
    time_start: string,
    time_end?: string,
    time_zone: string
}

const TimeDisplay = ({
    time
}: {
    time: ITime
}) => {
    let payload_New_York = '';
    payload_New_York += formatHour({
	time: time.time_start,
	format: 'h:mmA',
	time_zone: time.time_zone,
	//time_zone_display: 'America/New_York'
    });
    if(time.time_end){
	payload_New_York += ' - ';
	payload_New_York += formatHour({
	    time: time.time_end,
	    format: 'h:mmA',
	    time_zone: time.time_zone,
	    //time_zone_display: 'America/New_York'
	});
    }
    let payload_Berlin = '';
    payload_Berlin += formatHour({
	time: time.time_start,
	format: 'h:mmA',
	time_zone: time.time_zone,
	time_zone_display: 'Europe/Berlin'
    });
    if(time.time_end){
	payload_Berlin += ' - ';
	payload_Berlin += formatHour({
	    time: time.time_end,
	    format: 'h:mmA',
	    time_zone: time.time_zone,
	    time_zone_display: 'Europe/Berlin'
	});
    }
    return <>
	{payload_New_York}
	<br />
	{payload_Berlin}
    </>
}

const HoursRow = ({
    hour,
    dictionary
}: {
    hour: Hours,
    dictionary: Dictionary
}) => {
    const days = hour.days ? formatDays({days: hour.days, dictionary}) : '';
    if(isValid(hour)){
	return (
	    <IonRow>
		<IonCol size='1'>
		    <IonButton color='success'>
			<IonIcon icon={checkmarkSharp} slot='icon-only'/>
		    </IonButton>
		</IonCol>
		<IonCol size='4' style={{whiteSpace: 'pre'}}>
		    {JSON.stringify(hour, null, '    ')}
		</IonCol>
		<IonCol size='2'>
		    {days}
		</IonCol>
		<IonCol size='2'>
		    {hour.time_start !== null && hour.time_zone !== null && <TimeDisplay time={hour as ITime} />}
		</IonCol>
		<IonCol size='3'>
		    {hour.notes}
		</IonCol>
	    </IonRow>
	);
    }else{
	return(
	    <IonRow>
		<IonCol size='1'>
		    <IonButton color='danger'>
			<IonIcon icon={closeSharp} slot='icon-only' />
		    </IonButton>
		</IonCol>
		<IonCol size='4' style={{whiteSpace: 'pre'}}>
		    {JSON.stringify(hour, null, '    ')}
		</IonCol>
	    </IonRow>
	);
    }
}


// @ts-ignore
const Template: ComponentStory<typeof Wrapper> = (
    {
	hours,
	dictionary
    }: {
	hours: Hours[],
	dictionary: Dictionary
    }
) => {
    return (
	<IonGrid>
	    <IonRow>
		<IonCol size='1'>
		    
		</IonCol>
		<IonCol size='4'>
		    input
		</IonCol>
		<IonCol size='2'>
		    days
		</IonCol>
		<IonCol size='2'>
		    hours
		</IonCol>
		<IonCol size='3'>
		    notes
		</IonCol>
	    </IonRow>
	    {
		hours.map((hour: Hours, index: number) => 
		    <HoursRow key={index} hour={hour} dictionary={dictionary} />
		)
	    }
	</IonGrid>
    );
};

const hoursData = [
    {
	days: 'x6',
	time_start: '12:00',
	time_end: '14:00',
	notes: null,
	time_zone: 'America/New_York'
    },
    {
	days: null,
	time_start: '9:00',
	time_end:'11:00',
	notes: 'Once a month, usually on Friday',
	time_zone: 'America/New_York'
    },
    {
	days: '1234',
	time_start: '10:00',
	time_end:'14:00',
	notes: null,
	time_zone: 'America/New_York'
    },
    {
	days: '5',
	time_start: '10:00',
	time_end: '12:00',
	notes: null,
	time_zone: 'America/New_York'
    },
    {
	days: '2',
	time_start: '11:30',
	time_end:'13:00',
	notes: '',
	time_zone: 'America/New_York'
    },
    {
	days: '14',
	time_start: '11:00',
	time_end: '13:00',
	notes: null,
	time_zone: 'America/New_York'
    },
    {
	days: '12345',
	time_start: null,
	time_end: null,
	notes: 'Eat-In Meals',
	time_zone: 'America/New_York'
    },
    {
	days: '12345',
	time_start: '12:00',
	time_end: '13:00',
	notes: 'Eat-In Meals',
	time_zone: 'America/New_York'
    },
    {
	days: '12345',
	time_start: '13:00',
	time_end: '13:30',
	notes: 'Grab-and-Go Meal Distribution',
	time_zone: 'America/New_York'
    },
    {
	days: '02345',
	time_start: '12:00',
	time_end: '13:00',
	notes: 'Eat-In Meals',
	time_zone: 'America/New_York'
    },
    {
	days: '12345',
	time_start: '13:00',
	time_end: '13:30',
	notes: 'Grab-and-Go Meal Distribution',
	time_zone: 'America/New_York'
    },
    {
	days: '123456',
	time_start: '9:00',
	time_end: '10:30',
	notes: 'Breakfast',
	time_zone: 'America/New_York'
    },
    {
	days: '123456',
	time_start: '11:00',
	time_end: '13:30',
	notes: null,
	time_zone: 'America/New_York'
    },
    {
	days: '123',
	time_start: '15:00',
	time_end: '13:30',
	notes: null,
	time_zone: 'America/New_York'
    }
];

export const Primary = Template.bind({});

Primary.args = {
    hours: hoursData,
    dictionary: {
	and: ' and ',
	comma: ', ',
	lastComma: ', and ',
	'1': 'Mondays',
	'2': 'Tuesdays',
	'3': 'Wednesdays',
	'4': 'Thursdays',
	'5': 'Fridays',
	'6': 'Saturdays',
	'7': 'Sundays'
    }
};
