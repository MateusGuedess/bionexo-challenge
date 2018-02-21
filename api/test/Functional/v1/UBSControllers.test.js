import { expect } from 'chai';
import * as Request from './../../DataProvider/Request';
import { RandomUBSFromCSVFile, RandomCSVFile } from '../../DataProvider/Generator';
import { app } from '../../../app/bootstrap';
import * as ConverterService from './../../../app/Services/ConverterService';


describe('Functional/v1/UBSControllersTest', function ()
{
    let _this = this, 
        PORT = 5000,
        UBS_ID;

    _this.timeout(5000);
    before(() => _this.server = app.listen(PORT));

    describe('Syncing UBSes', () => 
    {
        it.only('Should upload a CSV file', done => 
        {
            RandomCSVFile(3)
                .then(ubses => {
                    return Request.post(`http://127.0.0.1:${PORT}/v1/ubs/sync`, {}, {
                        'media': new Buffer(ubses).toString('base64')
                    })
                    .then(httpResponse => {
                        let content = httpResponse.getContent();
                        expect(content.status).to.be.true;
                        expect(httpResponse.getStatusCode()).to.be.equal(200);
                    });
                })
                .then(() => done());
        });

        it.only('Should how much rest to end', done => 
        {
            Request.get(`http://127.0.0.1:${PORT}/v1/ubs/sync/process`)
                .then(httpResponse => {
                    let content = httpResponse.getContent();
                    expect(content.status).to.be.true;
                    expect(content.data).to.have.property('total')
                    expect(httpResponse.getStatusCode()).to.be.equal(200);
                })
                .then(() => done());
        });

        it.only('Should process pendent CSV files', done => 
        {
            Request.post(`http://127.0.0.1:${PORT}/v1/ubs/sync/process`, {}, {})
                .then(httpResponse => {
                    let content = httpResponse.getContent();
                    expect(content.status).to.be.true;
                    expect(httpResponse.getStatusCode()).to.be.equal(200);
                })
                .then(() => done());
        });

        it('Should present error if missing media field', done => 
        {
            RandomCSVFile(2)
                .then(ubses => {
                    return Request.post(`http://127.0.0.1:${PORT}/v1/ubs/sync`, {}, {})
                    .then(httpResponse => {
                        let content = httpResponse.getContent();
                        expect(content.status).to.be.false;
                        expect(httpResponse.getStatusCode()).to.be.equal(403);
                    });
                })
                .then(() => done());
        });
    });

    describe('Inserting UBSes', () => 
    {
        it('Should insert an UBS', done => 
        {
            RandomUBSFromCSVFile()
                .then(ubs => {                    
                    return Request.post(`http://127.0.0.1:${PORT}/v1/ubs`, {}, {
                        ubs
                    })
                    .then(httpResponse => {
                        let content = httpResponse.getContent();
                        expect(content.status).to.be.true;
                        expect(content.data).to.have.property('ubs');
                        UBS_ID = content.data.ubs.id;
                        expect(httpResponse.getStatusCode()).to.be.equal(201);
                    })
                })
                .then(() => done());
        });

        it('Should present error when ubs data is not filled the right way', done => 
        {
            Request.post(`http://127.0.0.1:${PORT}/v1/ubs`, {}, {
                'ubs': {
                    'name': 'Non existent'
                }
            })
            .then(httpResponse => {
                let content = httpResponse.getContent();
                expect(content.status).to.be.false;
                expect(httpResponse.getStatusCode()).to.be.equal(403);
            })
            .then(() => done());
        });
    });

    describe('Fetching UBSes', () => 
    {
        it('Should fetch a list of UBSes', done => 
        {
            Request.get(`http://127.0.0.1:${PORT}/v1/ubs`)
                .then(httpResponse => {
                    let content = httpResponse.getContent();
                    expect(content.status).to.be.true;
                    expect(content.data).to.have.property('total');
                    expect(content.data).to.have.property('results');
                    expect(content.data.total).to.be.a('number');
                    expect(content.data.results).to.be.an('Array');
                    expect(httpResponse.getStatusCode()).to.be.equal(200);
                })
                .then(() => done());
        });

        it('Should filter UBS that are inside a rectangle in map', done => 
        {
            // Boundaries for Rio de Janeiro city
            let boundaries = [                
                [-22.705486408902388,-43.1268006830436],
                [-23.124172766650062,-43.67199721624672]
            ]

            Request.get(`http://localhost:${PORT}/v1/ubs`, {
                'filters': JSON.stringify({ boundaries })
            })
            .then(httpResponse => {
                let content = httpResponse.getContent();
                console.log(content);
                expect(content.status).to.be.true;
                expect(content.data).to.have.property('results');
                expect(content.data).to.have.property('total');
                expect(httpResponse.getStatusCode()).to.be.equal(200);
            })
            .then(() => done());
        });
    });

    describe('Fetching UBS by ID', () => 
    {
        it('Should fetch an UBS by ID', done => 
        {
            Request.get(`http://127.0.0.1:${PORT}/v1/ubs/${UBS_ID}`)
                .then(httpResponse => {
                    let content = httpResponse.getContent();
                    expect(content.status).to.be.true;
                    expect(content.data).to.have.property('ubs');
                    expect(httpResponse.getStatusCode()).to.be.equal(200);
                })
                .then(() => done());
        });

        it('Should present error when not found', done => 
        {
            Request.get(`http://127.0.0.1:${PORT}/v1/ubs/-10`)
                .then(httpResponse => {
                    let content = httpResponse.getContent();
                    expect(content.status).to.be.false;
                    expect(httpResponse.getStatusCode()).to.be.equal(404);
                })
                .then(() => done());
        });
    });

    after(() => _this.server.close());

});