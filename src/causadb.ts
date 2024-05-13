import axios, { Axios } from 'axios';
import { Data } from './data';
import { Model } from './model';
import { getCausadbUrl } from './utils';
import { Account } from './account';

const causadbUrl = getCausadbUrl();

/**
 * CausaDB client for interacting with the CausaDB API.
 */
export class CausaDB {
    public tokenSecret?: string;
    private readonly axios: Axios

    /**
     * Initializes the CausaDB client. This creates a connection to the CausaDB API that allows you to interact with the cloud service, primarily CRUD operations on models and data.
     * @example
     * ```typescript
     * import { CausaDB } from './causadb';
     *
     * const client = new CausaDB();
     * 
     * // or with a token
     * 
     * const client = new CausaDB('test-token-secret');
     * ```
     */
    constructor(tokenSecret?: string) {
        this.tokenSecret = tokenSecret
        this.axios = axios.create()
        // common response handling
        this.axios.interceptors.response.use((response) => response, (error) => {
          if (error.response.status === 401) {
            throw new Error('Invalid token');
          }
          if (error.response.status === 403) {
            throw new Error('Invalid token');
          }
          throw new Error('CausaDB server request failed');
        })
    }

    /**
     * Set the token for the CausaDB client. This is required to authenticate with the CausaDB API.
     * @param tokenSecret Token secret provided by CausaDB.
     * @returns True if the token is valid, False otherwise.
     * @throws {Error} If the token is invalid.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * const valid = await client.setToken('test-token-secret');
     * ```
     * @deprecated preferable to set the token in the constructor and use the verifyAccount method to check access
     */
    async setToken(tokenSecret: string): Promise<boolean> {
        const headers = { 'token': tokenSecret };
        const response = await this.axios.get(`${causadbUrl}/account`, { headers });
        if (response.status === 200) {
            this.tokenSecret = tokenSecret;
            return true;
        } else {
            throw new Error('Invalid token');
        }
    }

    /**
     * Can be used to verify the account and check auth.
     * @param token Token secret provided by CausaDB.
     * @returns account details
     * @throws {Error} If the token is invalid.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * const account = await client.verifyAccount;
     * ```
     */
    async verifyAccount(): Promise<Account> {
        const headers = { 'token': this.tokenSecret };
        const response = await this.axios.get(`${causadbUrl}/account`, { headers });
        const account = {
          title: 'CausaDB Account' // TODO: This is a placeholder. The actual account object should be returned by the API.
        }
        return account;
    }

    /**
     * Create a model and add it to the CausaDB system. This will return a model object that can be used to interact with the model on the CausaDB cloud.
     * @param modelName The name of the model.
     * @returns The model object.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const model = await client.createModel('test-model');
     * ```
     */
    async createModel(modelName: string): Promise<Model> {
        return await Model.create(modelName, this);
    }

    /**
     * Add data to the CausaDB system. This can be either data stored directly on the CausaDB cloud or data stored externally and accessed via credentials.
     * @param dataName The name of the data.
     * @returns The data object.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const data = client.addData('test-data');
     * await data.fromCSV('path/to/data.csv');
     * ```
     */
    addData(dataName: string): Data {
        return new Data(dataName, this);
    }

    /**
     * Get a model by name. This will return a model object that can be used to interact with the model on the CausaDB cloud.
     * @param modelName The name of the model.
     * @returns The model object.
     * @throws {Error} If the model is not found.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const model = await client.getModel('test-model');
     * ```
     */
    async getModel(modelName: string): Promise<Model> {
        const headers = { 'token': this.tokenSecret };
        try {
            await this.axios.get(`${causadbUrl}/models/${modelName}`, { headers });
            return Model.create(modelName, this);
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * List all models. This will return a list of model objects that can be used to interact with the models on the CausaDB cloud.
     * @returns A list of model objects.
     * @throws {Error} If there is a server error.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const models = await client.listModels();
     * ```
     */
    async listModels(): Promise<Model[]> {
        const headers = { 'token': this.tokenSecret };
        try {
            const response = await this.axios.get(`${causadbUrl}/models`, { headers });
            return await Promise.all(response.data.models.map((modelSpec: any) => Model.create(modelSpec.name, this)));
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Get a data object by name. This will return a data object that can be used to interact with the data on the CausaDB cloud.
     * @param dataName The name of the data.
     * @returns The data object.
     * @throws {Error} If the data is not found.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const data = await client.getData('test-data');
     * ```
     */
    async getData(dataName: string): Promise<Data> {
        const headers = { 'token': this.tokenSecret };
        try {
            const data_list: any = await this.axios.get(`${causadbUrl}/data`, { headers });
            const data_names = data_list.data.data.map((dataSpec: any) => dataSpec.name);
            if (data_names.includes(dataName)) {
                return new Data(dataName, this);
            } else {
                throw new Error('Data ' + dataName + ' not found');
            }
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * List all data. This will return a list of data objects that can be used to interact with the data on the CausaDB cloud.
     * @returns A list of data objects.
     * @throws {Error} If there is a server error.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const dataList = await client.listData();
     * ```
     */
    async listData(): Promise<Data[]> {
        const headers = { 'token': this.tokenSecret };
        try {
            const response = await this.axios.get(`${causadbUrl}/data`, { headers });
            return response.data.data.map((dataSpec: any) => new Data(dataSpec.name, this));
        } catch (error) {
            throw new Error('CausaDB client failed to connect to server');
        }
    }
}
