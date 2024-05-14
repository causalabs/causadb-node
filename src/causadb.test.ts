import { CausaDB } from './causadb';

import dotenv from 'dotenv';

dotenv.config();

const causadbToken: string = process.env.CAUSADB_TOKEN || "";

let client: CausaDB;

describe('CausaDB', () => {
  
  describe('constructor', () => {
    test('with token', async () => {
      client = new CausaDB(causadbToken);
      expect(client).toBeDefined();
    })

    test('without token', async () => {
      client = new CausaDB();
      expect(client).toBeDefined();
    })

    test('without token and set after', async () => {
      client = new CausaDB();
      client.tokenSecret = causadbToken;
      expect(client).toBeDefined();
    })
  })
})
