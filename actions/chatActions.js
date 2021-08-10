import { 
    NAME_CHANGED,
		ROOM_CHANGED,
		DARK_MODE_CHANGED,
		BUBBLES_CHANGED
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
