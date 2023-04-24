/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.group(() => {
//   Route.get('/', async () => {
//     return { hello: 'oi' }
//   })
//   Route.post('login', async ({ auth, request, response }) => {
//     const email = request.input('email')
//     const password = request.input('password')

//     try {
//       const token = await auth.use('api').attempt(email, password)
//       return token
//     } catch {
//       return response.unauthorized('Invalid credentials')
//     }
//   })
//   Route.get('dashboard', async ({ auth }) => {
//     await auth.use('api').authenticate()
//     console.log(auth.use('api').user!)
//   })

//   Route.resource('/users', 'UsersController').apiOnly()
// })

// Route.group(() => {
//   Route.get('/', async () => {
//     return 'products'
//   })

//   Route.get('/products/:name', async ({ params }) => {
//     const { name } = params
//     return `Exibindo o produto: ${name}`
//   })

//   Route.post('/products', async ({ request }) => {
//     const data = request.only(['name', 'price', 'description'])
//     return `Criando novo produto com nome ${data.name}, preço ${data.price} e descrição ${data.description}`
//   })

//   Route.put('/products/:name', async ({ params, request }) => {
//     const { name } = params
//     const data = request.only(['name', 'price', 'description'])
//     return `Atualizando o produto ${name} para nome ${data.name}, preço ${data.price} e descrição ${data.description}`
//   })

//   Route.delete('/products/:name', async ({ params }) => {
//     const { name } = params
//     return `Excluindo o produto ${name}`
//   })

//   Route.resource('/products', 'ProductsController').apiOnly()
// })

Route.group(() => {
  Route.get('products', 'ProductsController.index')
  Route.post('products', 'ProductsController.store')
  // Route.get('products/:id', 'ProductsContolller.show')
  Route.put('products', 'ProductsContolller.update')
}).namespace('App/Controllers/Http/ProductsController')

Route.group(() => {
  Route.get('users', 'UsersController.index')
  Route.post('users', 'UsersController.store')
  //Route.get('users/:id', 'UsersContolller.show')
  Route.put('users', 'UsersContolller.update')
}).namespace('App/Controllers/Http/UsersController')

Route.group(() => {
  Route.get('orders', 'OrdersController.index')
  Route.post('orders', 'OrdersController.store')
  // Route.get('orders/:id', 'OrdersContolller.show')
  Route.put('orders', 'OrdersContolller.update')
}).namespace('App/Controllers/Http/OrdersController')

// Route.group(() => {
//   Route.resource('/products', 'ProductsController').apiOnly()
// })

// Route.group(() => {
//   Route.resource('/users', 'UsersController').apiOnly()
// })
