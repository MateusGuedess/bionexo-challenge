import { combineReducers } from 'redux';
import { dashboard } from './Dashboard/reducer';


const main = (state, action) =>
{
    switch (action.type) {
        default:
            return {

            }
    }
}

export const reducers = combineReducers({
    main,
    dashboard
});