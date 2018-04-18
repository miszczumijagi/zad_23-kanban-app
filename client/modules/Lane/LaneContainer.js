import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);