/* eslint-disable require-jsdoc */

class NotesHandler {
  constructor(service) {
    this._service = service;

    this.addNoteHandler = this.addNoteHandler.bind(this);
    this.getAllNotesHandler = this.getAllNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.updateNoteByIdHandler = this.updateNoteByIdHandler.bind(this);
    this.deleteByIdHandler = this.deleteByIdHandler.bind(this);
  }

  addNoteHandler(request, h) {
    try {
      const {title, body, tags} = request.payload;

      const noteId = this._service.addNote({title, body, tags});

      const response = h.response({
        status: 'success',
        message: 'Note successfully added',
        data: {
          note_id: noteId,
        },
      });
      response.code(201);

      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(400);
      return response;
    }
  }

  getAllNotesHandler() {
    const notes = this._service.getNotes();

    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    try {
      const {id} = request.params;
      const note = this._service.getNoteById(id);

      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }

  updateNoteByIdHandler(request, h) {
    try {
      const {id} = request.params;

      this._service.editNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'Note has been updated',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }

  deleteByIdHandler(request, h) {
    try {
      const {id} = request.params;

      this._service.deleteNoteById(id);

      return {
        status: 'success',
        message: 'Note has been deleted',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
