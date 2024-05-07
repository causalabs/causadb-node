import axios from 'axios';
import { CausaDB } from './causadb';
import { getCausadbUrl } from './utils';

const causadbUrl = getCausadbUrl();

export class Model {
    public client: CausaDB;
    public modelName: string;
    public config: any;

    /**
     * Initializes the Model class.
     * @param modelName The name of the model.
     * @param client A CausaDB client.
     */
    private constructor(modelName: string, client: CausaDB) {
        this.client = client;
        this.modelName = modelName;
        this.config = {};
    }

    /**
     * Creates a new model and adds it to the CausaDB system.
     * @returns The current state of the model.
     * @throws Error if the request fails.
     * @throws Error if the model does not exist.
    */
    static async create(modelName: string, client: CausaDB) {
        let model = new Model(modelName, client);

        await model.pull();

        await model.push();
        return model;
    }

    /**
     * Remove the model from the CausaDB system.
     */
    async remove(): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await axios.delete(`${causadbUrl}/models/${this.modelName}`, { headers });
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Set the nodes of the model.
     * @param nodes A list of node names.
     */
    async setNodes(nodes: string[]): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await this.pull();
            this.config.nodes = nodes;
            await this.push();
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Get the nodes of the model.
     * @returns A list of node names.
     */
    async getNodes(): Promise<string[]> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers });
            return response.data.details.config.nodes;
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Set the edges of the model.
     * @param edges A list of tuples representing edges.
     */
    async setEdges(edges: [string, string][]): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await this.pull();
            this.config.edges = edges;
            await this.push();
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Get the edges of the model.
     * @returns A list of tuples representing edges.
     */
    async getEdges(): Promise<[string, string][]> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers });
            const edges = response.data.details.config.edges;
            return edges.map((edge: any) => [edge[0], edge[1]]);
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Set the node types of the model.
     * @param nodeTypes A dictionary of node types.
     */
    async setNodeTypes(nodeTypes: any): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await this.pull();
            this.config.nodeTypes = nodeTypes;
            await this.push();
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Get the node types of the model.
     * @returns A dictionary of node types.
     */
    async getNodeTypes(): Promise<any> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers });
            return response.data.details.config.nodeTypes;
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Attach data to the model.
     * @param dataName The name of the data to attach.
     */
    async attach(dataName: string): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await axios.post(`${causadbUrl}/models/${this.modelName}/attach/${dataName}`, {}, { headers });
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Detach data from the model.
     * @param dataName The name of the data to detach.
     */
    async detach(dataName: string): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await axios.delete(`${causadbUrl}/models/${this.modelName}/detach`, { headers });
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Train the model.
     * @param wait Whether to wait for the model to finish training.
     * @param pollInterval The interval at which to poll the server for the model status.
     */
    async train(wait = true, pollInterval = 0.2): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.post(`${causadbUrl}/models/${this.modelName}/train`, {}, { headers });
            if (response.status === 400) {
                throw new Error(response.data.detail);
            }
            if (wait) {
                while (await this.status() !== 'trained') {
                    // Try again in 200ms
                    await new Promise(resolve => setTimeout(resolve, pollInterval * 1000));
                }
            }
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Get the status of the model.
     * @returns The status of the model.
     */
    async status(): Promise<string> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers });
            return response.data.details.status;
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Simulate actions on the model.
     * @param {Object} actions A dictionary representing the actions to simulate.
     * @param {Object} [fixed={}] A dictionary representing the fixed nodes.
     * @param {number} [interval=0.9] The interval at which to simulate the actions.
     * @param {boolean} [observationNoise=false] Whether to include observation noise.
     * @returns {Promise<Object>} A dictionary representing the result of the actions, including median, lower, and upper outcome estimates.
     */
    async simulateActions(actions: any, fixed = {}, interval = 0.9, observationNoise = false): Promise<any> {
        const headers = { 'token': this.client.tokenSecret };

        const query = {
            actions,
            fixed,
            interval,
            observation_noise: observationNoise
        };

        try {
            const response = await axios.post(`${causadbUrl}/models/${this.modelName}/simulate-actions`, query, { headers });
            if (response.status !== 200) {
                throw new Error(response.data.detail || 'CausaDB server request failed - unexpected status code.');
            }

            const responseData = response.data;
            if ('outcome' in responseData) {
                return {
                    median: responseData.outcome.median,
                    lower: responseData.outcome.lower,
                    upper: responseData.outcome.upper
                };
            }

            throw new Error('CausaDB server request failed - unexpected response structure.');
        } catch (error: any) {
            throw new Error(`CausaDB server request failed: ${error.message}`);
        }
    }


    /**
     * Pushes the current configuration of the model to the CausaDB server.
     */
    private async push(): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await axios.post(`${causadbUrl}/models/${this.modelName}`, this.config, { headers });
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Pulls configuration from the CausaDB server. Do nothing if the model does not exist.
     */
    private async pull(): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers });
            this.config = response.data.details.config;
        } catch (error: any) {
            if (error.response.status === 404) {
                return;
            }
            throw new Error('CausaDB server request failed');
        }
    }
}