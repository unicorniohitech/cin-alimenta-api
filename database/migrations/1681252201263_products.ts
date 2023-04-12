import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'
  
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.string('product_name')
      table.float('product_price')
      table.string('product_description')
      table.string('product_category')
      table.string('product_observation')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
