import {CoreBindings, inject} from '@loopback/core';
import {RestApplication, RestBindings} from '@loopback/rest';

import {Component} from '@loopback/core/dist/component';
import {CustomRejectProvider} from './providers';
import {XHttpSequence} from './sequences';

export class XLoop implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    protected app: RestApplication,
  ) {
    this.init();
  }

  init() {
    this.app.sequence(XHttpSequence);
    this.app
      .bind(RestBindings.SequenceActions.REJECT)
      .toProvider(CustomRejectProvider);
  }
}
