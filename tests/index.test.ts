// src/test/index.test.ts

import { CausaDB } from '../src/CausaDB';

test('outputs the correct string', () => {
  expect('hello world').toBe('hello world');
});

test('CausaDB initializes with the default connection string', () => {
  const db = new CausaDB();
  expect(db).toBeDefined();
  expect(db).toBeInstanceOf(CausaDB);
  expect(db['connectionString']).toBe('default-connection-string');
  expect(db['connectionString']).not.toBe('some-other-connection-string');
});
