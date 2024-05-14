import { CausaDB } from '../src/causadb';

import dotenv from 'dotenv';

dotenv.config();

const causadbToken: string = process.env.CAUSADB_TOKEN || "";

let client: CausaDB;

describe('CausaDB', () => {
  
  describe('unhappy path', () => {
    test('bad token', async () => {
      // bad tokens
      client = new CausaDB('bad-token-secret');
      await expect(client.verifyAccount()).rejects.toThrow(Error);
    })
  })

  describe('happy path', () => {
    beforeEach(async () => {
      client = new CausaDB(causadbToken);
      await client.verifyAccount();
    });
  
    test('end-to-end workflow', async () => {
      // client initialization
      expect(client).not.toBeNull();
      expect(client.tokenSecret).toBe(causadbToken);

      // data add
      await client.addData("test-data-2").fromCSV("e2e/test-data.csv");

      // data list
      const data_list = await client.listData();
      expect(data_list).not.toBeNull();
      expect(data_list.length).toBeGreaterThan(0);

      // model create
      const model = await client.createModel("test-model-12345");
      expect(model).not.toBeNull();
      expect(model.modelName).toBe("test-model-12345");
      expect(model.client).toBe(client);

      // model attach
      const modelAttach = await client.getModel("test-model-12345");
      await modelAttach.attach("test-data-2");

      // model list
      const model_list = await client.listModels();
      expect(model_list).not.toBeNull();
      expect(model_list.length).toBeGreaterThan(0);
      expect(model_list.map(model => model.modelName)).toContain("test-model-12345");

      // model get
      const modelGet = await client.getModel("test-model-12345");
      expect(modelGet).not.toBeNull();
      expect(modelGet.modelName).toBe("test-model-12345");
      expect(modelGet.client).toBe(client);

      // set nodes
      const modelNodes = await client.getModel("test-model-12345");
      await modelNodes.setNodes(["x", "y", "z"]);
      const nodes = await modelNodes.getNodes();
      expect(nodes).toContain("x");
      expect(nodes.length).toBe(3);

      // set edges
      const modelEdges = await client.getModel("test-model-12345");
      await modelEdges.setEdges([
          ["x", "y"],
          ["y", "z"],
      ]);
      const edges = await modelEdges.getEdges();
      expect(edges).toContainEqual(["x", "y"]);
      expect(edges.length).toBe(2);

      // set node types
      const modelNodeTypes = await client.getModel("test-model-12345");
      await modelNodeTypes.setNodeTypes({
          "x": "continuous",
          "y": "continuous",
          "z": "continuous",
      });
      const node_types = await modelNodeTypes.getNodeTypes();
      expect(node_types["x"]).toBe("continuous");
      expect(Object.keys(node_types).length).toBe(3);

      // model train
      const modelTrain = await client.getModel("test-model-12345");
      await modelTrain.train();
      expect(await modelTrain.status()).toBe("trained");

      // model simulate action
      const modelSimulate = await client.getModel("test-model-12345");
      const outcome = await modelSimulate.simulateActions({"x": [0, 1]});
      expect(typeof outcome).toBe('object');
      expect(outcome).toHaveProperty("median");

      // model findBestActions
      const bestActions = await model.findBestActions(
          {"y": 0.5}, // Targets
          ["x"], // Actionable nodes
          {"z": 0.5}, // Fixed nodes
          {"x": [0, 1]} // Constraints
      );
      expect(bestActions).toHaveProperty("x");

      // Test for model causalEffects
      const causalEffects = await model.causalEffects({"x": [0, 1]});
      expect(causalEffects).toHaveProperty("median");
      expect(causalEffects).toHaveProperty("lower");
      expect(causalEffects).toHaveProperty("upper");
      // Check that the indexes ('y' and 'z') and the types of columns ('median', 'lower', 'upper') exist
      expect(Object.keys(causalEffects.median)).toEqual(expect.arrayContaining(["y", "z"]));

      // Test for model causalAttributions
      const causalAttributions = await model.causalAttributions("x");
      expect(causalAttributions).toHaveProperty("x");
      // Ensure that the returned columns include 'x'
      expect(Object.keys(causalAttributions.x)).toEqual(expect.arrayContaining(["y", "z"]));


      // model detach
      const modelDetach = await client.getModel("test-model-12345");
      await modelDetach.detach();
      await expect(modelDetach.train()).rejects.toThrow();

      // data remove
      const data = await client.getData("test-data-2");
      await data.remove();
      const data_list_remove = await client.listData();
      expect(data_list_remove.map(data => data.dataName)).not.toContain("test-data-2");

      // model remove
      const modelRemove = await client.getModel("test-model-12345");
      await modelRemove.remove();
      const model_list_remove = await client.listModels();
      expect(model_list_remove.map(model => model.modelName)).not.toContain("test-model-12345");
    }, 30000)
  })
})
