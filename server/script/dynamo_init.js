const {makeTable} = require('../dynamo-api.js');

(async () => {
  await makeTable({
    TableName: 'AuthToken',
    AttributeDefinitions: [
      {
        AttributeName: 'token',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'token',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  });

  await makeTable({
    TableName: 'User',
    AttributeDefinitions: [
      {
        AttributeName: 'username',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'username',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  });
})();
