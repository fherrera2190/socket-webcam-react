import { ADD_PEER, REMOVE_PEER } from "../constants";
import { PeerState } from "../interfaces";
import { PeerAction } from "../interfaces/peer-actions.type";

export const peerReducer = (state: PeerState, action: PeerAction) => {
  console.log(action.payload)
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: { stream: action.payload.stream },
      };

    case REMOVE_PEER:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const { [action.payload.peerId]: _, ...rest } = state;
      return rest;

    default:
      return { ...state };
  }
};
