import { AnyAction } from "@reduxjs/toolkit";
import { UPDATEDAILYIRON } from ".";

export const updateDailyIronAction = (data: object): AnyAction => {
    return {
        type: UPDATEDAILYIRON,
        payload: data
    };
};