import axios from 'axios';
import { Data } from './data';
import { Model } from './model';
import { getCausadbUrl } from './utils';

const causadbUrl = getCausadbUrl();

export class CausaDB {
    public tokenId: string | null;
    public tokenSecret: string | null;

    /**
     * Initializes the CausaDB client.
     */
    constructor() {
        this.tokenId = null;
        this.tokenSecret = null;
    }

    /**
     * Set the token for the CausaDB client.
     * @param tokenId Token ID provided by CausaDB.
     * @param tokenSecret Token secret provided by CausaDB.
     * @returns True if the token is valid, False otherwise.
     */
    async setToken(tokenId: string, tokenSecret: string): Promise<boolean> {
        const headers = { 'token': tokenSecret };
        const response = await axios.get(`${causadbUrl}/account`, { headers });
        if (response.status === 200) {
            this.tokenId = tokenId;
            this.tokenSecret = tokenSecret;
            return true;
        } else {
            throw new Error('Invalid token');
        }
    }

    /**
     * Create a model and add it to the CausaDB system.
     * @param modelName The name of the model.
     * @returns The model object.
     */
    async createModel(modelName: string): Promise<Model> {
        return await Model.create(modelName, this);
    }

    /**
     * Add data to the CausaDB system.
     * @param dataName The name of the data.
     * @returns The data object.
     */
    addData(dataName: string): Data {
        return new Data(dataName, this);
    }

    /**
     * Get a model by name.
     * @param modelName The name of the model.
     * @returns The model object.
     */
    async getModel(modelName: string): Promise<Model> {
        const headers = { 'token': this.tokenSecret };
        try {
            await axios.get(`${causadbUrl}/models/${modelName}`, { headers });
            return Model.create(modelName, this);
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * List all models.
     * @returns A list of model objects.
     */
    async listModels(): Promise<Model[]> {
        const headers = { 'token': this.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/models`, { headers });
            // Print out model names
            return await Promise.all(response.data.models.map((modelSpec: any) => Model.create(modelSpec.name, this)));
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Get a data by name.
     * @param dataName The name of the data.
     * @returns The data object.
     */
    async getData(dataName: string): Promise<Data> {
        // Check that dataName is in the list of data (GET data route) and return a Data object
        const headers = { 'token': this.tokenSecret };
        try {
            const data_list: any = await axios.get(`${causadbUrl}/data`, { headers });
            const data_names = data_list.data.data.map((dataSpec: any) => dataSpec.name);
            if (data_names.includes(dataName)) {
                return new Data(dataName, this);
            } else {
                throw new Error('Data' + dataName + 'not found');
            }
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * List all data.
     * @returns A list of data objects.
     */
    async listData(): Promise<Data[]> {
        const headers = { 'token': this.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/data`, { headers });
            return response.data.data.map((dataSpec: any) => new Data(dataSpec.name, this));
        } catch (error) {
            throw new Error('CausaDB client failed to connect to server');
        }
    }
}