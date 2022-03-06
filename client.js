const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {}); //file name as first arg

const grpcObject = grpc.loadPackageDefinition(packageDef)

const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({
    "id": -1, 
    "text": text
}, (err, response) => {
    console.log("Received from server: " + JSON.stringify(response)) 
})

client.readTodos({}, (err, response) => {
    console.log("Read the todos from server: " + JSON.stringify(response))

    response.items.forEach(element => console.log(element.text));
})