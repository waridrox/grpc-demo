const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {}); //file name as first arg

const grpcObject = grpc.loadPackageDefinition(packageDef)

const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos,
});

server.start();

const todos = []

function createTodo(call, callback) {

    const todoItem = {
        "id": todos.length + 1,
        "text": call.request.text
    }
    todos.push(todoItem)
    callback(null, todoItem)
    // console.log(call);
}

function readTodos(call, callback) {
    // callback(null, todos) //we cannot send the whole array like this because it is expecting 
    // an item of TodoItems
    callback(null, { "items": todos})
}