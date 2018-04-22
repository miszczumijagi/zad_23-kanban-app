import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import { createNoteRequest, updateNoteRequest, deleteNoteRequest, editNote, moveWithinLane} from '../Note/NoteActions';
const mapDispatchToProps = {
  ...noteActions,
  editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  createNote: createNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);