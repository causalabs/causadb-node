# CausaDB Node Client

A TypeNode.jsScript client library for interacting with the CausaDB API. This library allows you to create, manage, and analyze causal models directly from your code.

## Installation

```bash
npm install causadb
```

## Getting Started

### Importing the Client

```typescript
import { CausaDB } from 'causadb';
```

### Setting Up the Client

1. **Initialize the Client:**

```typescript
const client = new CausaDB();
```

2. **Set the Token:**

Make sure to replace `'your-token-id'` and `'your-token-secret'` with your actual credentials.

```typescript
await client.setToken('your-token-id', 'your-token-secret');
```

### Working with Models

1. **Create a New Model:**

```typescript
const model = await Model.create('my-model', client);
```

2. **Set Nodes:**

Define the nodes (variables) for your model.

```typescript
await model.setNodes(['x', 'y', 'z']);
```

3. **Set Edges:**

Specify relationships between nodes.

```typescript
await model.setEdges([['x', 'y'], ['y', 'z']]);
```

4. **Set Node Types:**

Define the types of each node.

```typescript
await model.setNodeTypes({ 'x': 'continuous', 'y': 'categorical', 'z': 'continuous' });
```

5. **Attach Data:**

Associate data with the model for training and inference.

```typescript
await model.attach('my-data');
```

6. **Train the Model:**

Train the model based on the attached data.

```typescript
await model.train();
```

7. **Simulate Actions:**

Estimate the effects of specific actions on model outcomes.

```typescript
const outcome = await model.simulateActions({ 'x': [0, 1] });
console.log(outcome);
```

8. **Find Best Actions:**

Identify optimal actions to achieve target outcomes.

```typescript
const bestActions = await model.findBestActions(
    { 'y': 0.5 }, // Targets
    ['x'], // Actionable nodes
    { 'z': 0.5 }, // Fixed nodes
    { 'x': [0, 1] } // Constraints
);
console.log(bestActions);
```

9. **Get Causal Effects:**

Assess the causal impact of specified actions on model outcomes.

```typescript
const causalEffects = await model.causalEffects({ 'x': [0, 1] });
console.log(causalEffects);
```

10. **Get Causal Attributions:**

Determine the contribution of each node to an outcome.

```typescript
const attributions = await model.causalAttributions('x');
console.log(attributions);
```

### Working with Data

1. **Add Data from CSV:**

```typescript
const data = client.addData('my-data');
await data.fromCSV('path/to/data.csv');
```

2. **Add Data from JSON:**

```typescript
const data = client.addData('my-data');
await data.fromJSON({
    "column1": [1, 2, 3],
    "column2": [4, 5, 6]
});
```

3. **Remove Data:**

```typescript
await data.remove();
```

### Full Example

```typescript
import { CausaDB, Model, Data } from 'causadb-client';

(async () => {
    const client = new CausaDB();
    await client.setToken('your-token-id', 'your-token-secret');

    // Model Operations
    const model = await Model.create('my-model', client);
    await model.setNodes(['x', 'y', 'z']);
    await model.setEdges([['x', 'y'], ['y', 'z']]);
    await model.setNodeTypes({ 'x': 'continuous', 'y': 'categorical', 'z': 'continuous' });
    await model.attach('my-data');
    await model.train();

    const outcome = await model.simulateActions({ 'x': [0, 1] });
    console.log(outcome);

    const bestActions = await model.findBestActions(
        { 'y': 0.5 },
        ['x'],
        { 'z': 0.5 },
        { 'x': [0, 1] }
    );
    console.log(bestActions);

    const causalEffects = await model.causalEffects({ 'x': [0, 1] });
    console.log(causalEffects);

    const attributions = await model.causalAttributions('x');
    console.log(attributions);

    // Data Operations
    const data = client.addData('my-data');
    await data.fromCSV('path/to/data.csv');
    await data.remove();
})();
```

### Testing

Run the included unit tests:

```bash
npm test
```