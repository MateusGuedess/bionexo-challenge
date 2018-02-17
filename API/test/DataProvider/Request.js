import request from 'request';


export const get = (route, params = {}) =>
    resolveRequest(request({
        'method': 'GET',
        'url': parseUrl(route, params),
        'timeout': 5000
    }));


export const post = (route, params, body) =>
    resolveRequest(request({
        'method': 'POST',
        'url': parseUrl(route, params),
        'body': JSON.stringify(body),
        'headers': {
            'content-type': 'application/json; charset=utf-8'
        },
        'timeout': 5000
    }));


const parseUrl = (route, params) =>
{
    let parsedParams = "";
    if (params);
        parsedParams = Object.keys(params).map(param => {
            return `${param}=${params[params]}`
        }).join('&');

    return route + (parsedParams.length > 0 ? `?${parsedParams}` : '');
}


const resolveRequest = httpRequest =>
    new Promise((resolve, reject) => 
    {
        let httpResponse = new Response();
        httpRequest
            .on('error', err => reject(err))
            .on('response', response => httpResponse.buildHTTPResponse(response))
            .on('data', data => httpResponse.buildData(data))
            .on('end', () => resolve(httpResponse));
    });


class Response 
{

    constructor()
    {
        this.response;
        this.data;
    }

    getStatusCode()
    {
        return this.response.statusCode;
    }

    getHeaders()
    {
        return this.response.headers;
    }

    getContent()
    {
        let headers = this.getHeaders();
        if (headers['content-type'].indexOf('application/json') >= 0)
            return JSON.parse(this.data.toString());

        return this.data.toString();
    }

    buildHTTPResponse(response)
    {
        this.response = response;
    }

    buildData(data)
    {
        this.data = data;
    }

}