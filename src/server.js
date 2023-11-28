const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NoteService = require('./services/in_memory/NoteService.js');

const init = async () => {
  const noteService = new NoteService();

  const server = Hapi.server({
    port: process.env.NODE_ENV !== 'production'? 7000: 5000,
    host: process.env.NODE_ENV !== 'production'? 'localhost': '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: noteService,
    },
  });

  await server.start();
};

init();
