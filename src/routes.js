import noteHandler from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: noteHandler.addNoteHandler,

  },
  {
    method: 'GET',
    path: '/notes',
    handler: noteHandler.getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: noteHandler.getNoteByIdHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: noteHandler.updateByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: noteHandler.deleteByIdHandler,
  }
];

export default routes;
