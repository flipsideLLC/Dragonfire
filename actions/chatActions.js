import {
	NAME_CHANGED,
	ROOM_CHANGED,
	PUSH_ROOM,
	REMOVE_ROOM,
	DARK_MODE_CHANGED,
	BUBBLES_CHANGED,
	CLEAR_STATE,
} from './types';

export const nameChanged = (text) => {
	return {
		type: NAME_CHANGED,
		payload: text
	};
};

export const roomChanged = (text) => {
	return {
		type: ROOM_CHANGED,
		payload: text
	};
};

export const pushRoom = (room) => {
	return {
		type: PUSH_ROOM,
		payload: room
	}
}

export const removeRoom = (room) => {
	return {
		type: REMOVE_ROOM,
		payload: room,
	}
}

export const darkModeChanged = () => {
	return {
		type: DARK_MODE_CHANGED,
	};
};

export const bubblesChanged = () => {
	return {
		type: BUBBLES_CHANGED,
	};
};

export const clearState = () => {
	return {
		type: CLEAR_STATE,
	};
};
