import {MetadataInspector, describeInjectedArguments} from '@loopback/context';
import {Request, RestBindings} from '@loopback/rest';
import {X_HTTP_HEADER, X_HTTP_STATUS_CODE} from '../../../decorators/http/keys';

import {expect} from '@loopback/testlab';
import {http} from '../../../decorators/http';

describe('Http Decorators', () => {
  describe('@http.header', () => {
    it('adds header metadata to target method', () => {
      class TestClass {
        @http.header('x-hello', 'world')
        doSomething() {}
      }

      const metaData = MetadataInspector.getMethodMetadata(
        X_HTTP_HEADER,
        TestClass.prototype,
        'doSomething',
      );
      expect(metaData).to.eql([
        {
          key: 'x-hello',
          value: 'world',
        },
      ]);
    });

    it('adds multiple header metadata to target method', () => {
      class TestClass {
        @http.header('x-hello', '1')
        @http.header('x-world', '2')
        doSomething() {}
      }

      const metaData = MetadataInspector.getMethodMetadata(
        X_HTTP_HEADER,
        TestClass.prototype,
        'doSomething',
      );
      expect(metaData).to.eql([
        {
          key: 'x-world',
          value: '2',
        },
        {
          key: 'x-hello',
          value: '1',
        },
      ]);
    });
  });

  describe('@http.status', () => {
    it('adds status code metadata to target method', () => {
      class TestClass {
        @http.status(304)
        doSomething() {}
      }

      const metadata = MetadataInspector.getMethodMetadata(
        X_HTTP_STATUS_CODE,
        TestClass.prototype,
        'doSomething',
      );
      expect(metadata).to.eql(304);
    });

    it('applies the first status code metadata to target method decorated with multiple status code', () => {
      class TestClass {
        @http.status(304)
        @http.status(404)
        doSomething() {}
      }

      const metadata = MetadataInspector.getMethodMetadata(
        X_HTTP_STATUS_CODE,
        TestClass.prototype,
        'doSomething',
      );
      expect(metadata).to.eql(304);
    });
  });

  describe('@http.request', () => {
    it('receives info about injected method arguments', () => {
      class TestClass {
        doSomething(@http.request() request: Request) {}
      }

      const meta = describeInjectedArguments(
        TestClass.prototype,
        'doSomething',
      );
      expect(meta.map(m => m.bindingSelector)).to.deepEqual([
        RestBindings.Http.REQUEST,
      ]);
    });
  });

  describe('@http.response', () => {
    it('receives info about injected method arguments', () => {
      class TestClass {
        doSomething(@http.response() request: Request) {}
      }

      const meta = describeInjectedArguments(
        TestClass.prototype,
        'doSomething',
      );
      expect(meta.map(m => m.bindingSelector)).to.deepEqual([
        RestBindings.Http.RESPONSE,
      ]);
    });
  });

  describe('@http.context', () => {
    it('receives info about injected method arguments', () => {
      class TestClass {
        doSomething(@http.context() request: Request) {}
      }

      const meta = describeInjectedArguments(
        TestClass.prototype,
        'doSomething',
      );
      expect(meta.map(m => m.bindingSelector)).to.deepEqual([
        RestBindings.Http.CONTEXT,
      ]);
    });
  });
});
