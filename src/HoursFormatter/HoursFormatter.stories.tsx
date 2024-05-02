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
    timeStart: string,
    timeEnd?: string,
    timeZone: string
}

const TimeDisplay = ({
    time
}: {
    time: ITime
}) => {
    let payload_New_York = '';
    payload_New_York += formatHour({
	time: time.timeStart,
	format: 'h:mmA',
	timeZone: time.timeZone,
	//timeZone_display: 'America/New_York'
    });
    if(time.timeEnd){
	payload_New_York += ' - ';
	payload_New_York += formatHour({
	    time: time.timeEnd,
	    format: 'h:mmA',
	    timeZone: time.timeZone,
	    //timeZone_display: 'America/New_York'
	});
    }
    let payload_Berlin = '';
    payload_Berlin += formatHour({
	time: time.timeStart,
	format: 'h:mmA',
	timeZone: time.timeZone,
	timeZone_display: 'Europe/Berlin'
    });
    if(time.timeEnd){
	payload_Berlin += ' - ';
	payload_Berlin += formatHour({
	    time: time.timeEnd,
	    format: 'h:mmA',
	    timeZone: time.timeZone,
	    timeZone_display: 'Europe/Berlin'
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
		    {hour.timeStart !== null && hour.timeZone !== null && <TimeDisplay time={hour as ITime} />}
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
	days: 'FR',
	timeStart: '12:00',
	timeEnd: '14:00',
	notes: null,
	timeZone: 'America/New_York'
    },
    {
	days: null,
	timeStart: '9:00',
	timeEnd:'11:00',
	notes: 'Once a month, usually on Friday',
	timeZone: 'America/New_York'
    },
    {
	days: 'Mo-Fr',
	timeStart: '10:00',
	timeEnd:'14:00',
	notes: null,
	timeZone: 'America/New_York'
    },
    {
	days: 'Fr',
	timeStart: '10:00',
	timeEnd: '12:00',
	notes: null,
	timeZone: 'America/New_York'
    },
    {
	days: 'Tu',
	timeStart: '11:30',
	timeEnd:'13:00',
	notes: '',
	timeZone: 'America/New_York'
    },
    {
	days: 'MoTh',
	timeStart: '11:00',
	timeEnd: '13:00',
	notes: null,
	timeZone: 'America/New_York'
    },
    {
	days: 'MoWe',
	timeStart: null,
	timeEnd: null,
	notes: 'Eat-In Meals',
	timeZone: 'America/New_York'
    },
    {
	days: 'FrMoTuSu',
	timeStart: '13:00',
	timeEnd: '13:30',
	notes: 'Grab-and-Go Meal Distribution',
	timeZone: 'America/New_York'
    },
    {
	days: 'MWF',
	timeStart: '12:00',
	timeEnd: '13:00',
	notes: 'Eat-In Meals',
	timeZone: 'America/New_York'
    },
    {
	days: 'MoTuWeThFr',
	timeStart: '13:00',
	timeEnd: '13:30',
	notes: 'Grab-and-Go Meal Distribution',
	timeZone: 'America/New_York'
    },
    {
	days: 'MoTuWeThFrSaSu',
	timeStart: '9:00',
	timeEnd: '10:30',
	notes: 'Breakfast',
	timeZone: 'America/New_York'
    },
    {
	days: 'MoTuWeThFrSaSu',
	timeStart: '11:00',
	timeEnd: '13:30',
	notes: null,
	timeZone: 'America/New_York'
    },
    {
	days: 'MoTuWe',
	timeStart: '15:00',
	timeEnd: '13:30',
	notes: null,
	timeZone: 'America/New_York'
    }
];

export const Primary = Template.bind({});

Primary.args = {
    hours: hoursData,
    dictionary: {
	and: ' and ',
	comma: ', ',
	lastComma: ', and ',
	'Mo': 'Mondays',
	'Tu': 'Tuesdays',
	'We': 'Wednesdays',
	'Th': 'Thursdays',
	'Fr': 'Fridays',
	'Sa': 'Saturdays',
	'Su': 'Sundays'
    }
};
