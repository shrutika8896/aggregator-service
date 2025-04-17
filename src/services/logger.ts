import newrelic from 'newrelic';
export class LoggerService {
    static info(message: string): void {
         newrelic.recordLogEvent( {
                    message: 'Fetching GitHub organization members',
                    level: 'info'
                });
    }

    static error(error: Error): void {
        newrelic.noticeError(error);
    }
}
