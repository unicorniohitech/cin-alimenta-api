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

Route.get('/products', async () => {
  return 'products'
})

Route.get('/products/:name', async ({ params }) => {
  const { name } = params
  return `Exibindo o produto: ${name}`
})

Route.post('/products', async ({ request }) => {
  const data = request.only(['name', 'price', 'description'])
  return `Criando novo produto com nome ${data.name}, preço ${data.price} e descrição ${data.description}`
})

Route.put('/products/:name', async ({ params, request }) => {
  const { name } = params
  const data = request.only(['name', 'price', 'description'])
  return `Atualizando o produto ${name} para nome  ${data.name}, preço ${data.price} e descrição ${data.description}`
})

Route.delete('/products/:name', async ({ params }) => {
  const { name } = params
  return `Excluindo o produto ${name}`
})

Route.resource('/products', 'ProductsController').apiOnly()
