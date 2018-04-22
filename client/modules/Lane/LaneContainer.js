import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { deleteLaneRequest, updateLaneRequest, createLaneRequest, fetchLanes, moveBetweenLanes, removeFromLane, pushToLane, changeLanesRequest} from '../Lane/LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const noteTarget = {
 drop(targetProps, monitor) {
   const sourceProps = monitor.getItem();
   const { id: noteId, laneId: sourceLaneId } = sourceProps;

    if (targetProps.lane.id !== sourceLaneId) {
      

      targetProps.moveBetweenLanes(
      targetProps.lane.id,
      noteId,
      sourceLaneId,
      
    );
  } else {
      const notes = targetProps.laneNotes.map(note => note._id)

      callApi('lanes','put', {id: sourceLaneId, notes: notes})
    }
  },
};

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  moveBetweenLanes,
  removeFromLane,
  pushToLane,
  changeLanesRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);