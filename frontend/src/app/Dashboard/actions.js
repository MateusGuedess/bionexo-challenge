

export const FETCH_UBSES = 'FETCH_UBSES';
const fetchUBSes = () =>
{
    return dispatch => 
    {
        request(requestUBSes());
    }
}


export const REQUEST_UBSES = 'REQUEST_UBSES';
const requestUBSes = () =>
{
    return {
        'type': REQUEST_UBSES
    }
}