import * as axios from 'axios';


const API = 'http://localhost:3000';

export const SYNC_UBSES = 'SYNC_UBSES';
export const syncUBSes = media =>
{
    return dispatch =>
    {
        dispatch(syncingUBSes());
        axios({
            'method': "POST",
            'url': `${API}/v1/ubs/sync`,
            'data': { media },
            'timetout': 1000 * 60 * 5,
            'onUploadProgress': progress => 
            {
                console.log(progress);
            }
        })
        .then(response => {
            dispatch(syncedUBSes());
        })
        .catch(err => {
            console.log(err);
        });
    }
}


export const SYNCING_UBSES = 'SYNCING_UBSES';
const syncingUBSes = () =>
{
    return { 'type': SYNCING_UBSES }
}


export const SYNCED_UBSES = 'SYNCED_UBSES';
const syncedUBSes = () =>
{
    return { 'type': SYNCED_UBSES }
}


export const SELECT_UBS_CSV_FILE = 'SELECT_UBS_CSV_FILE';
export const selectUBSCSVFile = content =>
{
    content = new Buffer(content).toString('base64');
    return {
        'type': SELECT_UBS_CSV_FILE,
        content
    }
}


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