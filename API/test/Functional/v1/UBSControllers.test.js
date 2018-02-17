import { expect } from 'chai';
import * as Request from './../../DataProvider/Request';
import { app } from '../../../app/bootstrap';
import * as ConverterService from './../../../app/Services/ConverterService';


describe('Functional/v1/UBSControllersTest', function ()
{
    let _this = this, 
        PORT = 5000,
        UBS_ID;

    _this.timeout(5000);
    before(() => _this.server = app.listen(PORT));

    describe('Inserting UBSes', () => 
    {
        it('Should insert an UBS', done => 
        {
            let parser = value => {
                if (value.indexOf('muito acima da m') >= 0)
                    return 3;

                if (value.indexOf('nho acima da m') >= 0)
                    return 2;

                if (value.indexOf('mediano') >= 0)
                    return 1;

                return 0;
            }

            ConverterService.CSVToJson(process.cwd() + '/test/DataProvider/resources/ubs.csv', [
                'geocode_lat', 'geocode_lon', null, null, 'name', 'address', 'address', 'city', 'phone', 
                { 'name': 'score_size', parser }, { 'name': 'score_adaptation_for_seniors', parser }, 
                { 'name': 'score_medical_equipment', parser }, { 'name': 'score_medicine', parser }
            ])
                .then(parsedCSV => {
                    let ubs = parsedCSV[Math.floor(Math.random() * parsedCSV.length)];
                    
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