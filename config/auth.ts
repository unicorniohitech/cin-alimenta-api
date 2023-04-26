/* eslint-disable prettier/prettier */
import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'



const authConfig: AuthConfig = {

  guard: 'api',

  guards: {

    api: {

      driver: 'oat',



      tokenProvider: {

        driver: 'database',

        table: 'api_tokens',

     

      },



      provider: {

        driver: 'lucid',



        identifierKey: 'id',



        uids: ['email'],



        model: () => import('App/Models/User'),

      },

    },

  },

}



export default authConfig

