import { AnyAction } from "@reduxjs/toolkit";
import { UPDATEDAILYIRON } from "../actions";


export interface dailyIronState {
    val: number
};

const initState: dailyIronState = {
    val: 0
};

export const updateDailyIronReducer = (state: dailyIronState = initState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case UPDATEDAILYIRON: {
            return {val: state.val + payload.delta};
        }
        default: {
            return state;
        }
    }
};