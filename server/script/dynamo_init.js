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
        AttributeName: 'id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'partner_id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'partner_id',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  });
})();
