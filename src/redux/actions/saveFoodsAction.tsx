import { SAVEFOODS } from ".";
import { AnyAction } from 'redux';
 
export const saveFoodsAction = (data: object): AnyAction => {
    return {
        type: SAVEFOODS,
        payload: data
    };
};