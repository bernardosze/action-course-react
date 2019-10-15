import { GET_CLOCKS, CLOCK_SUCCESS, CLOCK_FAIL } from '../actions/types';

const initialState = {
	clock: null,
	clocks: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_CLOCKS:
			return {
				...state,
				clocks: payload,
				loading: false
			};
		case CLOCK_SUCCESS:
			return {
				...state,
				clock: payload,
				loading: false
			};
		case CLOCK_FAIL:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
}
