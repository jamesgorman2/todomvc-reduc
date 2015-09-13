import Hapi from 'hapi';
import Good from 'good';

const server = new Hapi.Server();

server.connection({
  port: 3000,
});
const todos = [];

function newTodo(id, title) {
  return {
    id: id,
    title: title,
    deleted: false,
  };
}

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply({todos: todos.filter((t) => !t.deleted)});
  },
});

server.route({
  method: 'PUT',
  path: '/',
  handler: (request, reply) => {
    const todo = newTodo(todos.length, request.payload.title);
    todos.push(todo);
    return reply({_self: '/' + todo.id}).code(201);
  },
});

server.route({
  method: 'GET',
  path: '/{id}',
  handler: (request, reply) => {
    const todo = todos[request.params.id];
    if (todo && !todo.deleted) {
      return reply(todo);
    }
    return reply('Not found.').code(404);
  },
});

server.route({
  method: 'POST',
  path: '/{id}',
  handler: (request, reply) => {
    const todo = todos[request.params.id];
    if (todo && !todo.deleted) {
      todo.title = request.payload.title;
      return reply(todo);
    }
    return reply('Not found.').code(404);
  },
});

server.route({
  method: 'DELETE',
  path: '/{id}',
  handler: (request, reply) => {
    const todo = todos[request.params.id];
    if (todo) {
      todo.deleted = true;
      return reply().code(204);
    }
    return reply('Not found.').code(404);
  },
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*',
      },
    }],
  },
}, (err) => {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(() => server.log('info', 'Server running at: ' + server.info.uri) );
});
