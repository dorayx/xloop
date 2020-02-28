import {ErrorWriterOptions, writeErrorToResponse} from 'strong-error-handler';
import {HandlerContext, LogError, Reject, RestBindings} from '@loopback/rest';
import {Provider, config, inject} from '@loopback/context';

import {HttpError} from 'http-errors';

export interface ErrorStatusCodeMap {
  [code: string]: number;
}

const builtinStatusCodeMap: ErrorStatusCodeMap = {
  ENTITY_NOT_FOUND: 404,
};

export class CustomRejectProvider implements Provider<Reject> {
  constructor(
    @inject(RestBindings.SequenceActions.LOG_ERROR)
    protected logError: LogError,
    @inject(RestBindings.ERROR_WRITER_OPTIONS, {optional: true})
    protected errorWriterOptions?: ErrorWriterOptions,
    @config()
    protected statusCodeMap: ErrorStatusCodeMap = {},
  ) {}

  value(): PromiseLike<Reject> | Reject {
    return (context, error) => this.action(context, error);
  }

  action({request, response}: HandlerContext, error: Error) {
    const httpError = error as HttpError;

    if (!httpError.status && !httpError.statusCode && httpError.code) {
      const customStatus =
        this.statusCodeMap[httpError.code] ??
        builtinStatusCodeMap[httpError.code];
      if (customStatus) {
        httpError.statusCode = customStatus;
      }
    }

    const statusCode = httpError.statusCode || httpError.status || 500;
    writeErrorToResponse(httpError, request, response, this.errorWriterOptions);
    this.logError(httpError, statusCode, request);
  }
}
