import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
  public async index({ request }: HttpContextContract) {
    const { id } = request.only(['id', 'user_id', 'total_price', 'status', 'products'])
    const orders = await Order.findOrFail('id', id)

    return orders
  }

  public async store({ request, response }) {
    try {
      // Obter os dados do pedido do corpo da requisição
      const { products, ...data } = request.only(['user_id', 'total_price', 'status', 'products'])

      // Criar o pedido no banco de dados
      const order = await Order.create(data)

      // Adicionar os produtos ao pedido
      await order.related('products').attach(products)

      // Retorne o pedido criado com sucesso
      return order
    } catch (error) {
      // Retorne uma resposta de erro com mensagem adequada
      return response.status(500).json({
        message: 'Erro ao criar o pedido',
        error: error.message,
      })
    }
  }

  public async show({ params }: HttpContextContract) {
    const product = await Order.query().whereNull('deleted_at').where('id', params.id).firstOrFail
    return product
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Order.query().whereNull('deleted_at').where(params.id).firstOrFail()
    const data = request.only(['id', 'user_id', 'total_price', 'status', 'products'])
    product.merge(data)
    await product.save()
    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const order = await Order.query().whereNull('deleted_at').where('id', params.id).firstOrFail()
    await order.delete()
    return { message: 'Pedido excluído com sucesso' }
  }

  public async cancel({ params, response, request }) {
    try {
      // Lógica para cancelar o pedido com base no ID do pedido
      const order = await Order.findOrFail(params.id)
      order.status = 'cancelado'
      await order.save()

      return response.status(200).json({
        message: 'Pedido cancelado com sucesso',
        data: order,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cancelar o pedido',
        error: error.message,
      })
    }
  }
}
