import {RequestContext} from '@loopback/rest';
import {X_HTTP_STATUS_CODE} from '../../decorators/http/keys';
import {getDecoratorMetadata} from '../../utils/getDecoratorMetadata';
import {hooks} from '../hooks';

hooks.presend.use(async function(result: unknown, context: RequestContext) {
  const statusCode = await getDecoratorMetadata<XHttpStatusCode>(
    context,
    X_HTTP_STATUS_CODE,
  );

  if (!statusCode) {
    return;
  }

  const response = context.response;
  response.status(statusCode);
});
