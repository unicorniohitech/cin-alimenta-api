import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'


export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public users: BelongsTo<typeof User>

  @column()
  public total_price: number


  @column()
  public status: string

  @column()
  public user_name: string

  @hasMany(() => Order, {
    serializeAs: 'products'
  })
  public posts: HasMany<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
