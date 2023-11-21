import { nanoid } from 'nanoid';
import notes from './notes.js';

const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note successfully added',
      data: {
        note_id: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Failed to add a note',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes
  }
});

const getNoteByIdHandler = (request, h) => {
  const {id} = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note
      }
    }
  }
  const response = h.response({
    status: "failed",
    data: "Data not found"
  });
  response.code(404);
  return response;
};

const updateByIdHandler = (request, h) =>{
  const {id} = request.params;

  const {title, body, tags} = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      body,
      tags,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Note has been updated.",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "failed",
    message: "Note id not found",
  });
  response.code(404);
  return response;
};

const deleteByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return {
      status: "success",
      message: "Note has been deleted"
    }
  }

  const response = h.response({
    status: "failed",
    message: "Note id not found"
  });
  response.code(404);
  return response;
};

export default {
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler, 
  updateByIdHandler,
  deleteByIdHandler,
};
