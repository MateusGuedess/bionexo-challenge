import * as request from 'request';


export const get = (route, params = {}) =>
    resolveRequest(request.get(route));


export const post = (route, params, body) =>
    resolveRequest(request.post(route));


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