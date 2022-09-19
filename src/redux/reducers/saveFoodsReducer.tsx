import { foodEntry, SAVEFOODS } from "../actions";
import { AnyAction } from 'redux';

type savedList = foodEntry[];
export interface saveFoodState {
    savedList: savedList
};

const initState: saveFoodState = {
    savedList: []
};

export const saveFoodsReducer = (state: saveFoodState = initState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case SAVEFOODS: {
            return {savedList: [...state.savedList, payload]};
        }
        default: {
            return state;
        }
    }
};