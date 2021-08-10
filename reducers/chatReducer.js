import { 
	NAME_CHANGED,
	ROOM_CHANGED,
	DARK_MODE_CHANGED,
	BUBBLES_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	roomCode: '',
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
			case DARK_MODE_CHANGED:
					return { ...state, darkMode: !state.darkMode };
			case BUBBLES_CHANGED:
					return { ...state, bubbles: !state.bubbles };
			default: 
					return state;
	}
};
