import axios from 'axios'
import { CausaDB } from './causadb'
import * as fs from 'fs'
import csv from 'csv-parser'
import { getCausadbUrl } from './utils'

const causadbUrl = getCausadbUrl()

/**
 * Data class for interacting with data in the CausaDB system.
 */
export class Data {
  public client: CausaDB
  public dataName: string

  /**
     * Initializes the Data class.
     * @param dataName The name of the data.
     * @param client A CausaDB client.
     * @example
     * ```typescript
     * import { CausaDB, Data } from './causadb';
     *
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const data = new Data('test-data', client);
     * ```
     */
  constructor(dataName: string, client: CausaDB) {
    this.dataName = dataName
    this.client = client
  }

  /**
     * Remove the data from the CausaDB system.
     * @example
     * ```typescript
     * const data = client.getData('test-data');
     * await data.remove();
     * ```
     */
  async remove(): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      await axios.delete(`${causadbUrl}/data/${this.dataName}`, { headers })
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Add data from a CSV file.
     * @param filepath The path to the CSV file.
     * @returns Promise that resolves when the data has been added.
     * @throws {Error} If pushing data to the server fails.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const data = new Data('test-data', client);
     * await data.fromCSV('path/to/data.csv');
     * ```
     */
  async fromCSV(filepath: string): Promise<void> {
    const dataset: any = {}
    fs.createReadStream(filepath)
      .pipe(csv())
      .on('data', (row: any) => {
        Object.keys(row).forEach((key) => {
          if (!dataset[key]) {
            dataset[key] = []
          }
          dataset[key].push(row[key])
        })
      })
      .on('end', async () => {
        await this.push(dataset)
      })
  }

  /**
     * Add data from a JSON object.
     * @param data The JSON object representing the data.
     * @returns Promise that resolves when the data has been added.
     * @throws {Error} If pushing data to the server fails.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const data = new Data('test-data', client);
     * await data.fromJSON({
     *     "column1": [1, 2, 3],
     *     "column2": [4, 5, 6]
     * });
     * ```
     */
  async fromJSON(data: any): Promise<void> {
    await this.push(data)
  }

  /**
     * Pushes the data to the CausaDB server.
     * @param data The new data.
     * @returns Promise that resolves when the data has been added.
     * @throws {Error} If the server request fails.
     * @private
     */
  private async push(data: any): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.post(`${causadbUrl}/data/${this.dataName}`, data, { headers })
      if (response.data.status !== 'success') {
        throw new Error(`Failed to push data: ${response.data.message}`)
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB client failed to connect to server')
    }
  }
}
