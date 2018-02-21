import { combineReducers } from 'redux';
import { REQUEST_UBSES, RECEIVE_UBSES, SELECT_UBS_CSV_FILE, SYNCING_UBSES, SYNCED_UBSES, RECEIVE_REMAINING_PROCESS } from './actions';


const googlemaps = (state = {}, action) =>
{
    switch(action.type) {
        case REQUEST_UBSES:
            return {
                'isFetching': true,
                ...state
            }
        case RECEIVE_UBSES:
            return {
                ...state,
                'isFetching': false,
                'data': action.data
            }
        case SELECT_UBS_CSV_FILE:
            return {
                ...state,
                'syncEnabled': true,
                'syncFile': action.content
            }
        case SYNCING_UBSES:
            return {
                ...state,
                'isSyncing': true
            }
        case SYNCED_UBSES:
            return {
                ...state,
                'isSyncing': false,
                'syncFile': null,
                'syncEnabled': false
            }
        case RECEIVE_REMAINING_PROCESS:
            return {
                ...state,
                'processRemaining': action.total
            }
        default: 
            return {
                ...state,
                'syncEnabled': false,
                'syncFile': null,
                'isSyncing': false,

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