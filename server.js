const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {}); //file name as first arg

const grpcObject = grpc.loadPackageDefinition(packageDef)

const todoPackage = grpc.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure())

