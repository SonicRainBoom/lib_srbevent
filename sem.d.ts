declare module 'simple-event-machine' {
  interface ISimpleEventMachine {
    on(
      eventName: string,
      callback?: (eventData: Object, eventName?: string)=>void
    ): void
    emit(eventName: string, eventData: Object): void
    Instance(injectionObject?: Object): ISimpleEventMachine
  }
  //export function (injectionObject?:Object):ISimpleEventMachine
  export = ISimpleEventMachine;
}
