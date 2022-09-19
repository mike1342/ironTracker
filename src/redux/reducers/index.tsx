import { combineReducers } from '@reduxjs/toolkit';

import { saveFoodsReducer, saveFoodState } from './saveFoodsReducer';
import { updateDailyIronReducer, dailyIronState } from './updateDailyIronReducer';

export const rootReducer = combineReducers({
    saveFood: saveFoodsReducer,
    dailyIron: updateDailyIronReducer
});

export interface RootState {
    root: {
        saveFood: saveFoodState,
        dailyIron: dailyIronState
    }
}