import { AnyAction } from 'redux';

type ActionType = string;

export type foodEntry = {
    ironVal: string,
    name: string
};

//ACTION TYPES

export const SAVEFOODS: ActionType = 'SAVE_FOODS';

export const UPDATEDAILYIRON: ActionType = 'UPDATE_DAILY_IRON';