var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

let dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Services",
  KeySchema: [
    //partition key
    { AttributeName: "service", KeyType: "HASH" },
  ],
  AttributeDefinitions: [{ AttributeName: "service", AttributeType: "S" }],
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
