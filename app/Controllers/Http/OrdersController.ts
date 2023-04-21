import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
  public async index({}: HttpContextContract) {
    const orders = await Order.all()
    return orders
  }
  public async create(request) {
    const { products, ...data } = request.only(['user_id', 'total_price', 'status', 'products'])
    const order = await Order.create(data)
    await order.related('products').attach(products)

    return order
  }
  public async show({ params }: HttpContextContract) {
    const product = await Order.findOrFail(params.name)
    return product
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Order.findOrFail(params.id)
    const data = request.only(['total_price', 'status', 'products'])
    product.merge(data)
    await product.save()
    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Order.findOrFail(params.id)
    await product.delete()
    return { message: 'Produto excluído com sucesso' }
  }
}
