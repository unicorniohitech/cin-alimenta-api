import { DateTime } from 'luxon'
import { BaseModel, HasMany, hasMany, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public total_price: number

  @column()
  public status: string

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

  @hasMany(() => User, {
    foreignKey: 'user_id',
  })
  public users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
