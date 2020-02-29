# xloop

Add sugar & enhanced APIs inspired by NestJS to Loopback v4

## Installation

- Nodejs >= 10
- Loopback 4

```bash
npm install xloop
```

## API Reference

- HTTP Decorators
  - [@http.request()](#httprequest)
  - [@http.response()](#httpresponse)
  - [@http.header(string, string)](#httpheaderstring-string)
  - [@http.status(number)](#httpstatusnumber)
  - [@http.context()](#httpcontext)
- [Custom Error Codes](#custom-error-codes)

## HTTP Decorators

HTTP decorators are used to annotate controller methods.

### @http.request()

Decorate a param of a controller method to get the `request` object.

```js
import { http } from 'xloop/decorators';

export class SomeController {
  sayHello(@http.request() req: Request) {}
}
```

### @http.response()

Decorate a param of a controller method to get the `response` object.

```js
import { http } from 'xloop/decorators';

export class SomeController {
  sayHello(@http.response() res: Response) {}
}
```

### @http.header(string, string)

Decorate a controller method to specify a custom response header.

```js
import { http } from 'xloop/decorators';

export class SomeController {
  @http.header('Cache-Control', 'no-cache')
  sayHello() {}
}
```

You can apply multiple header decorators to the method for more custom headers:

```js
import { http } from 'xloop/decorators';

export class SomeController {
  @http.header('Cache-Control', 'no-cache')
  @http.header('X-Hello', 'Hello World')
  sayHello() {}
}
```

### @http.status(number)

Decorate a controller method to change the status code of the response statically.

```js
import { http } from 'xloop/decorators';

export class SomeController {
  @http.status(202)
  sayHello() {}
}
```

### @http.context()

Decorate a param of a controller method to get the `context` object.

```js
import { http } from 'xloop/decorators';

export class SomeController {
  sayHello(@http.context() ctx: Context) {}
}
```

## Custom Error Codes

Loopback v4 defines a few [error codes](https://loopback.io/doc/en/lb4/Error-handling.html) and we can set up our own codes:  

```js
const ENTITY_DUPLICATED = 'ENTITY_DUPLICATED';
class EntityDuplicatedError extends Error {
  ...
  code = ENTITY_DUPLICATED;
}

class Application extends RestApplication {
  constructor(...) {
    ...
    this.configure(RestBindings.SequenceActions.REJECT).to(
      {
        [ENTITY_DUPLICATED]: 422,
      },
    );
  }
}
``` 
