import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Db',
  connector: 'mongodb',
  url: 'mongodb+srv://hayk:200868g@cluster0.w5st2.mongodb.net/store?retryWrites=true&w=majority',
  host: 'cluster0.w5st2.mongodb.net',
  port: 27017,
  user: 'hayk',
  password: '200868g',
  database: 'store',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
