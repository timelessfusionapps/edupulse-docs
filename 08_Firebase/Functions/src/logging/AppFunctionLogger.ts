import * as logger from 'firebase-functions/logger';

export interface LogContext {
  schoolId?: string;
  uid?: string;
  eventId?: string;
  [key: string]: any;
}

export class AppFunctionLogger {
  private baseContext: LogContext;

  constructor(context: LogContext = {}) {
    this.baseContext = context;
  }

  private formatMessage(message: string, context?: LogContext): any {
    return {
      message,
      ...this.baseContext,
      ...context,
    };
  }

  info(message: string, context?: LogContext) {
    logger.info(this.formatMessage(message, context));
  }

  warn(message: string, context?: LogContext) {
    logger.warn(this.formatMessage(message, context));
  }

  error(message: string, error?: any, context?: LogContext) {
    logger.error(this.formatMessage(message, context), error);
  }

  debug(message: string, context?: LogContext) {
    logger.debug(this.formatMessage(message, context));
  }
}
