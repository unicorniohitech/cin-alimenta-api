import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductOrders extends BaseSchema {
  protected tableName = 'product_orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().references('orders.id')
      table.integer('product_id').unsigned().references('products.id')
      table.integer('product_qtd')
      table.unique(['order_id', 'product_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
