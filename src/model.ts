import axios from 'axios'
import { CausaDB } from './causadb'
import { getCausadbUrl } from './utils'

const causadbUrl = getCausadbUrl()

export class Model {
  public client: CausaDB
  public modelName: string
  public config: any

  /**
     * Initializes the Model class.
     * Represents a model within the CausaDB system.
     * @param modelName The name of the model.
     * @param client A CausaDB client.
     * @private
     */
  private constructor(modelName: string, client: CausaDB) {
    this.client = client
    this.modelName = modelName
    this.config = {}
  }

  /**
     * Creates a new model and adds it to the CausaDB system.
     * Retrieves any existing configuration from the server and then updates the server with any new configurations.
     * @param modelName The name of the model to create.
     * @param client A CausaDB client.
     * @returns The current state of the model.
     * @throws {Error} If the request fails or the model does not exist.
     * @example
     * ```typescript
     * const client = new CausaDB();
     * await client.setToken('test-token-secret');
     * const model = await Model.create('test-model', client);
     * ```
     */
  static async create(modelName: string, client: CausaDB): Promise<Model> {
    const model = new Model(modelName, client)

    await model.pull()
    await model.push()
    return model
  }

  /**
     * Remove the model from the CausaDB system.
     * Deletes the model's configuration and data from the server.
     * @returns Promise that resolves when the model has been removed.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.remove();
     * ```
     */
  async remove(): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      await axios.delete(`${causadbUrl}/models/${this.modelName}`, { headers })
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Set the nodes of the model.
     * Nodes represent individual variables or features in the model.
     * @param nodes A list of node names.
     * @returns Promise that resolves when the nodes have been set.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.setNodes(['x', 'y', 'z']);
     * ```
     */
  async setNodes(nodes: string[]): Promise<void> {
    try {
      await this.pull()
      this.config.nodes = nodes
      await this.push()
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Get the nodes of the model.
     * Nodes represent individual variables or features in the model.
     * @returns A list of node names.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const nodes = await model.getNodes();
     * ```
     */
  async getNodes(): Promise<string[]> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers })
      return response.data.details.config.nodes
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Set the edges of the model.
     * Edges represent relationships between nodes.
     * @param edges A list of tuples representing edges between nodes.
     * @returns Promise that resolves when the edges have been set.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.setEdges([['x', 'y'], ['y', 'z']]);
     * ```
     */
  async setEdges(edges: [string, string][]): Promise<void> {
    try {
      await this.pull()
      this.config.edges = edges
      await this.push()
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Get the edges of the model.
     * Edges represent relationships between nodes.
     * @returns A list of tuples representing edges between nodes.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const edges = await model.getEdges();
     * ```
     */
  async getEdges(): Promise<[string, string][]> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers })
      const edges = response.data.details.config.edges
      return edges.map((edge: any) => [edge[0], edge[1]])
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Set the node types of the model.
     * Node types define the type of data each node represents.
     * @param nodeTypes A dictionary of node types.
     * @returns Promise that resolves when the node types have been set.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.setNodeTypes({ 'x': 'continuous', 'y': 'categorical' });
     * ```
     */
  async setNodeTypes(nodeTypes: any): Promise<void> {
    try {
      await this.pull()
      this.config.nodeTypes = nodeTypes
      await this.push()
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Get the node types of the model.
     * Node types define the type of data each node represents.
     * @returns A dictionary of node types.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const nodeTypes = await model.getNodeTypes();
     * ```
     */
  async getNodeTypes(): Promise<any> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers })
      return response.data.details.config.nodeTypes
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Attach data to the model.
     * The data will be used during model training and inference.
     * @param dataName The name of the data to attach.
     * @returns Promise that resolves when the data has been attached.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.attach('test-data');
     * ```
     */
  async attach(dataName: string): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      await axios.post(`${causadbUrl}/models/${this.modelName}/attach/${dataName}`, {}, { headers })
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Detach data from the model.
     * Detaching removes the association of the data with the model.
     * @returns Promise that resolves when the data has been detached.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.detach();
     * ```
     */
  async detach(): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      await axios.delete(`${causadbUrl}/models/${this.modelName}/detach`, { headers })
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Train the model.
     * Training updates the model parameters based on the attached data.
     * @param wait Whether to wait for the model to finish training.
     * @param pollInterval The interval at which to poll the server for the model status.
     * @returns Promise that resolves when the model has been trained.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * await model.train();
     * ```
     */
  async train(wait = true, pollInterval = 0.2): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.post(`${causadbUrl}/models/${this.modelName}/train`, {}, { headers })
      if (response.status === 400) {
        throw new Error(response.data.detail)
      }
      if (wait) {
        while (await this.status() !== 'trained') {
          await new Promise(resolve => setTimeout(resolve, pollInterval * 1000))
        }
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Get the status of the model.
     * The status indicates the current state of the model (e.g., 'trained', 'untrained').
     * @returns The status of the model.
     * @throws {Error} If the server request fails.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const status = await model.status();
     * ```
     */
  async status(): Promise<string> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers })
      return response.data.details.status
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Simulate actions on the model.
     * Simulates the effects of specified actions on model outcomes, providing an estimation of the resulting changes.
     * @param {Object} actions A dictionary representing the actions to simulate.
     * @param {Object} [fixed={}] A dictionary representing the fixed nodes.
     * @param {number} [interval=0.9] The interval at which to simulate the actions.
     * @param {boolean} [observationNoise=false] Whether to include observation noise.
     * @returns Promise that resolves to the outcome of the simulated actions, including median, lower, and upper estimates.
     * @throws {Error} If the server request fails or returns an unexpected status code.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const outcome = await model.simulateActions({ 'x': [0, 1] });
     * console.log(outcome);
     * ```
     */
  async simulateActions(actions: any, fixed = {}, interval = 0.9, observationNoise = false): Promise<any> {
    const headers = { token: this.client.tokenSecret }

    const query = {
      actions,
      fixed,
      interval,
      observation_noise: observationNoise,
    }

    try {
      const response = await axios.post(`${causadbUrl}/models/${this.modelName}/simulate-actions`, query, { headers })
      if (response.status !== 200) {
        throw new Error(response.data.detail || 'CausaDB server request failed - unexpected status code.')
      }

      const responseData = response.data
      if ('outcome' in responseData) {
        return {
          median: responseData.outcome.median,
          lower: responseData.outcome.lower,
          upper: responseData.upper,
        }
      }

      throw new Error('CausaDB server request failed - unexpected response structure.')
    }
    catch (error: any) {
      throw new Error(`CausaDB server request failed: ${error.message}`)
    }
  }

  /**
     * Pushes the current configuration of the model to the CausaDB server.
     * This function ensures that any local changes to the model's configuration are reflected on the server.
     * @returns Promise that resolves when the configuration has been pushed.
     * @throws {Error} If the server request fails.
     * @private
     */
  private async push(): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      await axios.post(`${causadbUrl}/models/${this.modelName}`, this.config, { headers })
    }
    catch (error) {
      console.error(error)
      throw new Error('CausaDB server request failed')
    }
  }

  /**
     * Get the causal effects of actions on the model.
     * This function estimates the causal impact of specified actions on the model outcomes.
     * @param actions A dictionary representing the actions to simulate.
     * @param fixed A dictionary representing fixed nodes, if any.
     * @param interval The interval at which to simulate the action.
     * @param observationNoise Whether to include observation noise.
     * @returns A Promise resolving to the causal effects of the actions, including median, lower, and upper outcome estimates.
     * @throws {Error} If the server request fails or returns an unexpected status code.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const causalEffects = await model.causalEffects({ 'x': [0, 1] });
     * console.log(causalEffects);
     * ```
     */
  async causalEffects(actions: any, fixed = {}, interval = 0.9, observationNoise = false): Promise<any> {
    const headers = { token: this.client.tokenSecret }
    const query = {
      actions,
      fixed,
      interval,
      observation_noise: observationNoise,
    }

    try {
      const response = await axios.post(`${causadbUrl}/models/${this.modelName}/causal-effects`, query, { headers })
      if (response.status !== 200) {
        throw new Error(response.data.detail || 'CausaDB server request failed - unexpected status code.')
      }
      return response.data.outcome
    }
    catch (error: any) {
      throw new Error(`CausaDB server request failed: ${error.message}`)
    }
  }

  /**
     * Find the optimal actions for specified targets within the model.
     * This function identifies the actions that are most likely to achieve desired targets.
     * @param targets A dictionary of target outcomes to achieve.
     * @param actionable A list of actionable node names.
     * @param fixed A dictionary of fixed nodes, if any.
     * @param constraints Constraints on the actions, if any.
     * @param data The data to use for the simulation, if any.
     * @param targetImportance Importance weights for the targets.
     * @returns A Promise resolving to the optimal actions.
     * @throws {Error} If the server request fails or returns an unexpected status code.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const bestActions = await model.findBestActions(
     *     { 'y': 0.5 }, // Targets
     *     ['x'], // Actionable nodes
     *     { 'z': 0.5 }, // Fixed nodes
     *     { 'x': [0, 1] } // Constraints
     * );
     * console.log(bestActions);
     * ```
     */
  async findBestActions(targets: any, actionable: string[], fixed = {}, constraints = {}, data?: any, targetImportance = {}): Promise<any> {
    const headers = { token: this.client.tokenSecret }
    const query = {
      targets,
      actionable,
      fixed,
      constraints,
      data,
      target_importance: targetImportance,
    }

    try {
      const response = await axios.post(`${causadbUrl}/models/${this.modelName}/find-best-actions`, query, { headers })
      if (response.status !== 200) {
        throw new Error(response.data.detail || 'CausaDB server request failed - unexpected status code.')
      }
      return response.data.best_actions
    }
    catch (error: any) {
      throw new Error(`CausaDB server request failed: ${error.message}`)
    }
  }

  /**
     * Get the causal attributions for an outcome within the model.
     * Causal attributions represent the contribution of each node to an outcome.
     * @param outcome The name of the outcome node.
     * @param normalise Whether to normalize the causal attributions.
     * @returns A Promise resolving to the causal attributions for the specified outcome.
     * @throws {Error} If the server request fails or returns an unexpected status code.
     * @example
     * ```typescript
     * const model = await client.getModel('test-model');
     * const attributions = await model.causalAttributions('x');
     * console.log(attributions);
     * ```
     */
  async causalAttributions(outcome: string, normalise = false): Promise<any> {
    const headers = { token: this.client.tokenSecret }
    const query = {
      outcome,
      normalise,
    }

    try {
      const response = await axios.post(`${causadbUrl}/models/${this.modelName}/causal-attributions`, query, { headers })
      if (response.status !== 200) {
        throw new Error(response.data.detail || 'CausaDB server request failed - unexpected status code.')
      }
      return response.data.outcome
    }
    catch (error: any) {
      throw new Error(`CausaDB server request failed: ${error.message}`)
    }
  }

  /**
     * Pulls configuration from the CausaDB server. Do nothing if the model does not exist.
     */
  private async pull(): Promise<void> {
    const headers = { token: this.client.tokenSecret }
    try {
      const response = await axios.get(`${causadbUrl}/models/${this.modelName}`, { headers })
      this.config = response.data.details.config
    }
    catch (error: any) {
      if (error.response.status === 404) {
        return
      }
      throw new Error('CausaDB server request failed')
    }
  }
}
