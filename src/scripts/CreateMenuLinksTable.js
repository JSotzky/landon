var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

let dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "MenuLinks",
  KeySchema: [
    //partition key
    { AttributeName: "href", KeyType: "HASH" },
    //Sort Keys
    { AttributeName: "text", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "class", AttributeType: "S" },
    { AttributeName: "href", AttributeType: "S" },
    { AttributeName: "text", AttributeType: "S" },
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "href", KeyType: "HASH" },
        { AttributeName: "class", KeyType: "RANGE" },
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY",
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2));
  else
    console.log(
      "created table with description: ",
      JSON.stringify(data, null, 2)
    );
});
