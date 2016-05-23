"use strict";
import {EventEmitter} from 'events';
export {EventEmitter} from 'events';

export class SRBEvent {
  static event: EventEmitter;

  constructor() {
    if (!SRBEvent.event) {
      SRBEvent.event = new EventEmitter();
      process.on(
        'exit', (code?: number) => {
          SRBEvent.event.emit('exit', code);
        }
      );
      process.on(
        'uncaughtException', (err: Error) => {
          SRBEvent.event.emit('uncaughtException', err);
          process.exit(1);
        }
      );
      process.on(
        'unhandledRejection', (reason: Error, p: Promise<any>) => {
          SRBEvent.warn(
            "Unhandled Rejection at: Promise ",
            p,
            " reason: ",
            reason
          );
        }
      );
    }
  }

  static debug(...data: any[]): void;
  static debug(): void {
    let args = (
      arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    );
    SRBEvent.event.emit(
      'debug',
      args.length === 1 ? args[0] : args
    );
    args.unshift('DEBUG:');
    console.info.apply(null, args);
  };

  static log(...data: any[]): void;
  static log(): void {
    let args = (
      arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    );
    SRBEvent.event.emit(
      'log',
      args.length === 1 ? args[0] : args
    );
    console.log.apply(null, args);
  };

  static info(...data: any[]): void;
  static info(): void {
    let args = (
      arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    );
    SRBEvent.event.emit(
      'info',
      args.length === 1 ? args[0] : args
    );
    args.unshift('INFO:');
    console.info.apply(null, args);
  };

  static warn(...data: any[]): void;
  static warn(): void {
    let args = (
      arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    );
    SRBEvent.event.emit(
      'warn',
      args.length === 1 ? args[0] : args
    );
    args.unshift('WARN:');
    console.error.apply(null, args);
  };

  /**
   * emits a 'err'-event. An 'error'-event is to be thrown manually!
   * @param data
   */
  static err(...data: any[]): void;
  static err(): void {
    let args = (
      arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    );
    SRBEvent.event.emit(
      'err',
      args.length === 1 ? args[0] : args
    );
    args.unshift('ERROR:');
    console.error.apply(null, args);
  };

  static error = SRBEvent.err;

  /**
   * FATAL: Kills the current process after emitting err and fatal handlers
   * @param data
   */
  static fatal(...data: any[]): void;
  static fatal(): void {
    let args = (
      arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    );
    SRBEvent.event.emit(
      'err',
      args.length === 1 ? args[0] : args
    );
    SRBEvent.event.emit(
      'fatal',
      args.length === 1 ? args[0] : args
    );
    args.unshift('FATAL:');
    console.error.apply(null, args);
    process.exit(1);
  };
}

new SRBEvent();
