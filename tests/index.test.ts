import { CausaDB } from '../src/causadb';
import { Model } from '../src/model';
import { Data } from '../src/data';

let client: CausaDB;

beforeEach(async () => {
    client = new CausaDB();
    await client.setToken("test-token-id", "test-token-secret");
});

test('client initialization', () => {
    expect(client).not.toBeNull();
    expect(client.tokenId).toBe("test-token-id");
    expect(client.tokenSecret).toBe("test-token-secret");
});

test('bad tokens', async () => {
    await expect(client.setToken("bad-token-id", "bad-token-secret")).rejects.toThrow();
    expect(client.tokenId).toBe("test-token-id");
    expect(client.tokenSecret).toBe("test-token-secret");
});

test('data add', async () => {
    await client.addData("test-data-2").fromCSV("tests/test-data.csv");
});

test('data list', async () => {
    const data_list = await client.listData();
    expect(data_list).not.toBeNull();
    expect(data_list.length).toBeGreaterThan(0);
});

test('model create', async () => {
    const model = client.createModel("test-model-12345");
    expect(model).not.toBeNull();
    expect(model.modelName).toBe("test-model-12345");
    expect(model.client).toBe(client);
});

test('model attach', async () => {
    const model = await client.getModel("test-model-12345");
    await model.attach("test-data-2");
});

test('model list', async () => {
    const model_list = await client.listModels();
    expect(model_list).not.toBeNull();
    expect(model_list.length).toBeGreaterThan(0);
    expect(model_list.map(model => model.modelName)).toContain("test-model-12345");
});

test('model get', async () => {
    const model = await client.getModel("test-model-12345");
    expect(model).not.toBeNull();
    expect(model.modelName).toBe("test-model-12345");
    expect(model.client).toBe(client);
});

test('set nodes', async () => {
    const model = await client.getModel("test-model-12345");
    await model.setNodes(["x", "y", "z"]);
    const nodes = await model.getNodes();
    expect(nodes).toContain("x");
    expect(nodes.length).toBe(3);
});

test('set edges', async () => {
    const model = await client.getModel("test-model-12345");
    await model.setEdges([
        ["x", "y"],
        ["y", "z"],
    ]);
    const edges = await model.getEdges();
    expect(edges).toContainEqual(["x", "y"]);
    expect(edges.length).toBe(2);
});

test('set node types', async () => {
    const model = await client.getModel("test-model-12345");
    await model.setNodeTypes({
        "x": "continuous",
        "y": "continuous",
        "z": "continuous",
    });
    const node_types = await model.getNodeTypes();
    expect(node_types["x"]).toBe("continuous");
    expect(Object.keys(node_types).length).toBe(3);
});

test('model train', async () => {
    const model = await client.getModel("test-model-12345");
    await model.train();
    expect(await model.status()).toBe("trained");
});

test('model simulate action', async () => {
    const model = await client.getModel("test-model-12345");
    const outcome = await model.simulateAction({"x": [0, 1]});
    expect(typeof outcome).toBe('object');
    expect(outcome["ate"]["x"]).toBe(1.0);
    expect(outcome).toHaveProperty("ate_std");
});

test('model detach', async () => {
    const model = await client.getModel("test-model-12345");
    await model.detach("test-data-2");
    await expect(model.train()).rejects.toThrow();
});

test('data remove', async () => {
    const data = await client.getData("test-data-2");
    await data.remove();
    const data_list = await client.listData();
    expect(data_list.map(data => data.dataName)).not.toContain("test-data-2");
});

test('model remove', async () => {
    const model = await client.getModel("test-model-12345");
    await model.remove();
    const model_list = await client.listModels();
    expect(model_list.map(model => model.modelName)).not.toContain("test-model-12345");
});