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

  Route.get('/products/:product_name', async ({ params }) => {
    const { product_name} = params
    return `Exibindo o produto ${product_name}`
  })

  Route.post('/products', async ({ request }) => {
    const data = request.only(['product_name', 'product_price', 'product_description'])
    return `Criando novo produto com nome ${data.product_name}, preço ${data.product_price} e descrição ${data.product_description}`
  })

  Route.put('/products/product_name', async ({ params, request }) => {
    const { product_name } = params
    const data = request.only(['product_name', 'product_price', 'product_description'])
    return `Atualizando o produto ${product_name} para nome  ${data.product_name}, preço ${data.product_price} e descrição ${data.product_description}`
})

  Route.put('/products/:product_name', async ({ params, request }) => {
    const { product_name } = params
    const data = request.only(['product_name', 'product_price', 'product_description'])
    return `Atualizando o produto ${product_name} para nome  ${data.product_name}, preço ${data.product_price} e descrição ${data.product_description}`
})

  Route.delete('/products/:product_name', async ({ params }) => {
    const { product_name } = params
    return `Excluindo o produto ${product_name}`
  })
  
  Route.resource('/products', 'ProductsController').apiOnly()
