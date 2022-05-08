var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

let dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "GalleryImgs",
  KeySchema: [
    //partition key
    { AttributeName: "src", KeyType: "HASH" },
    //Sort Keys
    { AttributeName: "alt", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "src", AttributeType: "S" },
    { AttributeName: "alt", AttributeType: "S" },
    { AttributeName: "className", AttributeType: "S" },
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "src", KeyType: "HASH" },
        { AttributeName: "className", KeyType: "RANGE" },
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
