import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductOrders extends BaseSchema {
  protected tableName = 'order_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('product_qtd')
      table.unique(['order_id', 'product_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
