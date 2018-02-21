import { combineReducers } from 'redux';
import { REQUEST_UBSES, RECEIVE_UBSES } from './actions';


const googlemaps = (state, action) =>
{
    switch(action.type) {
        case REQUEST_UBSES:
            return {
                'isFetching': true,
                ...state
            }
        case RECEIVE_UBSES:
            return {
                'isFetching': false,
                'data': action.data
            }
        default: 
            return {
                'isFetching': false,
                'data': {
                    'results': [], 'total': 0
                }
            }
    }
}


export const dashboard = combineReducers({
    googlemaps
});