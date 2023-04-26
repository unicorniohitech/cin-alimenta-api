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
      await Promise.all(
        products.map(async (product) => {
          await order.related('products').attach(product.id)
        })
      )
      await order.load('products')
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
  public async show({ params, response }: HttpContextContract) {
    try {
      const order = await Order.query()
        .preload('products', (query) => {
          query.select('products.id', 'products.name', 'products.price')
          query.select('order_product.product_qtd as pivot_product_qtd')
        })
        .where('id', params.id)
        .firstOrFail()
      const formattedProducts = order.products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          qtd: product.$extras.pivot_product_qtd,
        }
      })
      return response.json({
        id: order.id,
        user_id: order.user_id,
        total_price: order.total_price,
        status: order.status,
        products: formattedProducts,
      })
    } catch (error) {
      return response.status(500).json({ message: error.message })
    }
  }

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
