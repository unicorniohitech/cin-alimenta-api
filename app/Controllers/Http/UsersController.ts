import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'



export default class UsersController {
  public async index({ }: HttpContextContract) {
    const user = await User.all()
    const address = await User.all()
    return [user, address]

  }

  public async store({ request }: HttpContextContract) {
    const body = request.only(['name', 'email', 'password', 'street', 'number', 'neighborhood', 'postcode', 'complement'])
    const user = await User.create({
      name: body.name,

      email: body.email,
      password: body.password,

    })

    const address = await User.create({
      street: body.street,
      number: body.number,
      neighborhood: body.neighborhood,
      postcode: body.postcode,
      complement: body.complement,

    })

    console.log(user, address.$isPersisted)
    return [user, address]

  }

  public async show({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.find(userId)
    const address = await User.find(userId)

    return [user, address]

  }

  public async update({ request }: HttpContextContract) {
    const userId = request.param('id')
    const body = request.only(['name', 'username', 'email', 'password', 'street', 'number', 'neighborhood', 'postcode', 'complement'])
    const user = await User.findOrFail(userId)
    const address = await User.findOrFail(userId)
    await user.merge(body).save()
    await address.merge(body).save()

    return [user, address]

  }

  public async destroy({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)
    const address = await User.findOrFail(userId)
    await user.delete()
    await address.delete()

    return true

  }
}
