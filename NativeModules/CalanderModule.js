import {NativeModules, NativeEventEmitter} from 'react-native';
const {CalendarModule} = NativeModules;

export const actions = {
  createCalenderEvent: ({title, location, callback}) => {
    CalendarModule.createCalendarEvent(title, location, callback);
  },
  createCalenderEventPromise: async ({title, location}) => {
    return await CalendarModule.createCalenderEventPromise(title, location);
  },
  getConstants: () => {
    return CalendarModule.getConstants();
  },
  onCalenderEvent: () => {
    const eventEmitter = new NativeEventEmitter(NativeModules.CalendarModule);
    return eventEmitter.addListener;
  },
};

export default actions;
