import {DefaultCrudRepository} from '@loopback/repository';
import {Product, ProductRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.Db') dataSource: DbDataSource,
  ) {
    super(Product, dataSource);
  }
}
