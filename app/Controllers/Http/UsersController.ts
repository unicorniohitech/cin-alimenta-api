import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const body = request.only([
      'name',
      'email',
      'password',
      'address',
      'document',
      'rising_date',
      'telephone',
      'role',
    ])
    const address = {
      street: body.address.street,
      number: body.address.number,
      neighborhood: body.address.neighborhood,
      postcode: body.address.postcode,
      complement: body.address.complement,
    }
    const user = await User.create({
      name: body.name,
      rising_date: body.rising_date,
      telephone: body.telephone,
      email: body.email,
      document: body.document,
      role: body.role,
      password: body.password,
      address: JSON.stringify(address),
    })

    console.log(user, address)
    return user
  }

  public async show({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.find(userId)

    return user
  }

  public async update({ request }: HttpContextContract) {
    const userId = request.param('id')
    const body = request.only(['name', 'document', 'email', 'telephone', 'password', 'address'])
    const user = await User.findOrFail(userId)
    await user.merge(body).save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { message: 'Usuário excluído com sucesso' }
  }
}
