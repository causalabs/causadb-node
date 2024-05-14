import { CausaDB } from './causadb'

import dotenv from 'dotenv'

dotenv.config()

let client: CausaDB

describe('CausaDB', () => {
  describe('constructor', () => {
    test('with token', async () => {
      client = new CausaDB('test-token')
      expect(client).toBeDefined()
    })

    test('without token', async () => {
      client = new CausaDB()
      expect(client).toBeDefined()
    })

    test('without token and set after', async () => {
      client = new CausaDB()
      client.tokenSecret = 'test-token'
      expect(client).toBeDefined()
    })
  })
})
