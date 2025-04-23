import newrelic from 'newrelic';
export class LoggerService {
  static info(message: string): void {
    newrelic.recordLogEvent({
      message: message,
      level: 'info'
    });
  }

  static error(error: Error): void {
    newrelic.noticeError(error);
  }

  static warn(message: string): void {
    newrelic.recordLogEvent({
      message: message,
      level: 'warn'
    });
  }
}
