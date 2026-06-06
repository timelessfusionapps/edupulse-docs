"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFunctionLogger = void 0;
const logger = require("firebase-functions/logger");
class AppFunctionLogger {
    constructor(context = {}) {
        this.baseContext = context;
    }
    formatMessage(message, context) {
        return Object.assign(Object.assign({ message }, this.baseContext), context);
    }
    info(message, context) {
        logger.info(this.formatMessage(message, context));
    }
    warn(message, context) {
        logger.warn(this.formatMessage(message, context));
    }
    error(message, error, context) {
        logger.error(this.formatMessage(message, context), error);
    }
    debug(message, context) {
        logger.debug(this.formatMessage(message, context));
    }
}
exports.AppFunctionLogger = AppFunctionLogger;
//# sourceMappingURL=AppFunctionLogger.js.map