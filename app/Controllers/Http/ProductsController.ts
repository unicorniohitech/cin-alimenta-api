import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.all()
    return products
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only([
     'product_id',
     'user_id',
     'product_name',
     'product_price',
     'product_description',
     'product_category',
     'product_observation'
    ])
    const product = await Product.create({
        product_id: data.product_id,
        user_id: data.user_id,
        product_name: data.product_name,
        product_price: data.product_price,
        product_description: data.product_description,
        product_category: data.product_category,
        product_observation: data.product_observation
    })
    return product
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.product_name)
    return product
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findOrFail(params.product_name)
    const data = request.only(['product_id', 'user_id', 'product_name', 'product_price', 'product_description', 'product_category', 'product_observation'])
    product.merge(data)
    await product.save()
    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.product_name)
    await product.delete()
    return { message: 'Produto excluído com sucesso' }
  }
}
