import {
  MethodDecoratorFactory,
  MethodMultiDecoratorFactory,
} from '@loopback/metadata';
import {X_HTTP_HEADER, X_HTTP_STATUS_CODE} from './keys';

import {RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';

const request = () => inject(RestBindings.Http.REQUEST);

const response = () => inject(RestBindings.Http.RESPONSE);

const context = () => inject(RestBindings.Http.CONTEXT);

const header = (key: string, value: string) =>
  MethodMultiDecoratorFactory.createDecorator<XHttpHeader>(
    X_HTTP_HEADER,
    {key, value},
    {decoratorName: '@http.header'},
  );

const status = (code: number) =>
  MethodDecoratorFactory.createDecorator<XHttpStatusCode>(
    X_HTTP_STATUS_CODE,
    code,
    {decoratorName: '@http.statusCode'},
  );

export const http = {
  request,
  response,
  header,
  context,
  status,
};
