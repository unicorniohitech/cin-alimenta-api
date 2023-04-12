import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @belongsTo(() => User, {
    foreignKey: 'clientId',
  })
  public users: BelongsTo<typeof User>

  @column.date()
  public time_order: DateTime

  @column()
  public status_order: string

  @column()
  public Name_client: string

  @hasMany(() => Order, {
    serializeAs: 'list_product'
  })
  public posts: HasMany<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
