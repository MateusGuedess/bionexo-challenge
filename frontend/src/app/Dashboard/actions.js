import * as axios from 'axios';


const API = 'http://localhost:3000';

export const FETCH_UBSES = 'FETCH_UBSES';
export const fetchUBSes = (boundaries) =>
{
    return dispatch => 
    {
        dispatch(requestUBSes());
        axios.get(`${API}/v1/ubs`, {
            'params': {
                'filters': {
                    boundaries
                }
            }
        })
        .then(response => {
            dispatch(receiveUBSes(response.data.data));
        });
    }
}


export const REQUEST_UBSES = 'REQUEST_UBSES';
const requestUBSes = () =>
{
    return {
        'type': REQUEST_UBSES
    }
}


export const RECEIVE_UBSES = 'RECEIVE_UBSES';
const receiveUBSes = data =>
{
    return {
        'type': RECEIVE_UBSES,
        data
    }
}