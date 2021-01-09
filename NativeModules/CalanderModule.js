import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;

export const actions = {
  createCalenderEvent: ({title, location}) => {
    CalendarModule.createCalendarEvent(title, location);
  },
};

export default actions;
