const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNoteHandler,

  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.updateNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteByIdHandler,
  }
];

module.exports = routes;
