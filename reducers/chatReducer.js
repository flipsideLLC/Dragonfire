import _ from 'lodash';

import {
	NAME_CHANGED,
	ROOM_CHANGED,
	PUSH_ROOM,
	REMOVE_ROOM,
	DARK_MODE_CHANGED,
	BUBBLES_CHANGED,
	CLEAR_STATE,
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	roomCode: '',
	roomArray: ['general'],
	darkMode: false,
	bubbles: true,
};

export default (state = INITIAL_STATE, action) => {
	console.log(state);
	console.log(action);

	switch (action.type) {
		case NAME_CHANGED:
			return { ...state, name: action.payload };
		case ROOM_CHANGED:
			return { ...state, roomCode: action.payload };
		case PUSH_ROOM:
			return { ...state, roomArray: _.concat(state.roomArray, action.payload) };
		case REMOVE_ROOM:
			return { ...state, roomArray: _.pull(state.roomArray, action.payload) };
		case DARK_MODE_CHANGED:
			return { ...state, darkMode: !state.darkMode };
		case BUBBLES_CHANGED:
			return { ...state, bubbles: !state.bubbles };
		case CLEAR_STATE:
			return INITIAL_STATE;
		default:
			return state;
	}
};
