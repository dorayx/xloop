import {RequestContext} from '@loopback/rest';
import {X_HTTP_HEADER} from '../../decorators/http/keys';
import {getDecoratorMetadata} from '../../utils/getDecoratorMetadata';
import {hooks} from '../hooks';

hooks.presend.use(async function(result: unknown, context: RequestContext) {
  const headers = await getDecoratorMetadata<XHttpHeaderSpec>(
    context,
    X_HTTP_HEADER,
  );

  if (!headers || headers.length === 0) {
    return;
  }

  const response = context.response;
  headers.forEach(({key, value}) => {
    response.setHeader(key, value);
  });
});
