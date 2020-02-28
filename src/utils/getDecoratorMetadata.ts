import {ControllerClass, CoreBindings} from '@loopback/core';
import {MetadataInspector, MetadataKey} from '@loopback/context';

import {RequestContext} from '@loopback/rest';

export async function getDecoratorMetadata<T>(
  context: RequestContext,
  key: MetadataKey<T, MethodDecorator>,
): Promise<T | undefined> {
  const name = await context.get<string>(CoreBindings.CONTROLLER_METHOD_NAME, {
    optional: true,
  });
  if (!name) {
    return;
  }
  const ctor = await context.get<ControllerClass>(
    CoreBindings.CONTROLLER_CLASS,
    {optional: true},
  );
  if (!ctor) {
    return;
  }
  return MetadataInspector.getMethodMetadata<T>(key, ctor.prototype, name);
}
