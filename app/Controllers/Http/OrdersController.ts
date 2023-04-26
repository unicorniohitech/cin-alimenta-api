import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
  public async index({}: HttpContextContract) {
    const orders = await Order.query().preload('user').preload('products')
    //  const { id } = request.only(['id', 'user_id', 'total_price', 'status', 'products'])
    // const orders = await Order.all()
    return orders
  }

  public async store({ request, response }) {
    try {
      // Obter os dados do pedido do corpo da requisição
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id, total_price, status, products } = request.only([
        'user_id',
        'total_price',
        'status',
        'products',
      ])

      // Criar o pedido no banco de dados
      const order = await Order.create({
        user_id,
        total_price,
        status,
      })

      // Adicionar os produtos ao pedido
      await products.map((product) => {
        order.related('products').attach({
          [product.product_id]: {
            product_qtd: product.product_qtd,
          },
        })
      })

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
    const order = await Order.query()
      .where('id', params.id)
      .preload('user')
      .preload('products', (productsQuery) => {
        productsQuery.preload('restaurant')
      })
    // Relacionamento entre O)rder e User (assumindo que o nome do relacionamento é "user")
    return order
  } //catch (error) {
  // Caso ocorra um erro durante a busca do pedido
  //return response.status(500).json({ message: error })
  //}

  public async update({ params, request }: HttpContextContract) {
    const product = await Order.findOrFail(params.id)
    const data = request.only(['user_id', 'total_price', 'status', 'products'])
    product.merge(data)
    await product.save()
    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const order = await Order.findOrFail(params.id)
    await order.delete()
    return { message: 'Pedido excluído com sucesso' }
  }

  public async cancel({ params, response }) {
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
