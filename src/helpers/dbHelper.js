const AWS = require("aws-sdk");
const config = require("../../config/config");
const TABLE_NAME = config.aws_table_name;
// const TABLE_NAME = "polos-teste";

AWS.config.update({
  region: config.aws_remote_config.region
});

const client = new AWS.DynamoDB.DocumentClient();

module.exports = {
  scan: (params) => client.scan({TableName: TABLE_NAME, ...params}).promise(),
  get: (params) => client.get({TableName: TABLE_NAME, ...params}).promise(),
  query: (params) => client.query({TableName: TABLE_NAME, ...params}).promise(),
  put: (params) => client.put({TableName: TABLE_NAME, ...params}).promise(),
  update: (params) => client.update({TableName: TABLE_NAME, ...params}).promise(),
  //delete: (params) => client.delete({TableName: TABLE_NAME, ...params}).promise(),
};
