import {MetadataAccessor} from '@loopback/context';

export const X_HTTP_HEADER = MetadataAccessor.create<
  XHttpHeader,
  MethodDecorator
>('extended-http:header');

export const X_HTTP_STATUS_CODE = MetadataAccessor.create<
  XHttpStatusCode,
  MethodDecorator
>('extended-http:status-code');
