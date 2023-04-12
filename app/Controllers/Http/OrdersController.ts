import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {

  public async index({ }: HttpContextContract) {
    const orders = await Order.all()

    return orders

  }
}
