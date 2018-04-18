import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import omit from 'lodash/omit';
import { createNotesRequest, createNotes, deleteNote } from "../Note/NoteActions";

// Export Constants

export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';


// Export Actions

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      
      notes: [],
      ...lane,
    }
  };
}

export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'put', {id: lane.id, name: lane.name}).then(laneResp => {
      dispatch(updateLane(lane));
    })
  }
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function deleteLaneRequest(lane) {
  return(dispatch) => {
    return  callApi(`lanes/${lane.id}`, 'delete')
      .then( () => {
        lane.notes.forEach( note => { 
          dispatch(deleteNote( note, lane.id))
        })
        dispatch(deleteLane(lane.id));
      })
  }
}

export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    id: laneId,
  }
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;

     dispatch(createLanes(normalizedLanes));
     dispatch(createNotes(notes));
    });
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

