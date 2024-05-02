import advanced from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import merge from 'deepmerge';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advanced);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

const daysRegex = /^(?:Mo|Tu|We|Th|Fr|Sa|Su)+$/;
//const timeRegex = /[0]?[0-9]:[0-6][0-9]/;
//fconst notesRegex = '"(.*)"';

export interface Hours {
    days: string | null,
    timeStart: string | null,
    timeEnd: string | null,
    notes: string | null,
    timeZone: string | null
}

export const isValid = ({
    days,
    timeStart,
    timeEnd,
//    notes,
//    timeZone
}: Hours): boolean => {
    const start = dayjs(timeStart, 'H:mm');
    const end = dayjs(timeEnd, 'H:mm');
    return ((days !== null && daysRegex.test(days)) || days === null)
	&& (start.isValid() || timeStart === null)
	&& (end.isValid() || timeEnd === null)
	&& !(timeStart === null && timeEnd !== null)
	&& (start.isBefore(end) || timeStart == null || timeEnd == null);
};

export interface Dictionary {
    [key: string]: string
    /*
    and?: string,
    comma?: string,
    lastComma?: string,
    Mo?: string,
    Tu?: string,
    We?: string,
    Th?: string,
    Fr?: string,
    Sa?: string,
    Su?: string
    */
}

const defaultDictionary = {
    and: ' and ',
    comma: ', ',
    lastComma: ', and ',
    Mo: 'Mo',
    Tu: 'Tu',
    We: 'We',
    Th: 'Th',
    Fr: 'Fr',
    Sa: 'Sa',
    Su: 'Su'
};

export const formatDays = ({
    days,
    dictionary = {}
}: {
    days: string,
    dictionary?: Dictionary
}): string => {
    const mergedDictionary: Dictionary = merge(defaultDictionary, dictionary);
    if(!daysRegex.test(days)){
	return '';
    }
    if(days.length === 2){
	return mergedDictionary[days];
    }
    if(days.length === 4){
	return `${mergedDictionary[days.slice(0, 2)]}${mergedDictionary.and}${mergedDictionary[days.slice(-2)]}`;
    }
  let tempDays = days.match(/.{1,2}/g).map((s) => mergedDictionary[s]);
    tempDays[tempDays.length-2] = `${tempDays[tempDays.length-2]}${mergedDictionary.lastComma}${tempDays[tempDays.length-1]}`;
    tempDays.pop();
    return tempDays.join(mergedDictionary.comma);
}

interface FormatHour {
    time: string,
    timeZone: string,
    timeZone_display?: string,
    format: string
}

export const formatHour = ({
    time,
    timeZone,
    timeZone_display,
    format
}: FormatHour): string => {
    const t = dayjs(`${time} ${timeZone}`, 'H:mm z');
    if(!t.isValid()){
	throw new Error('invalid date');
    }else{
	return t.tz(timeZone_display || timeZone).format(format);
    }
}
