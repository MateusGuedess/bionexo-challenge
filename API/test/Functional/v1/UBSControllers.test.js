import { expect } from 'chai';
import * as Request from './../../DataProvider/Request';
import { app } from '../../../app/bootstrap';


describe('Functional/v1/UBSControllersTest', function ()
{
    const _this = this;

    _this.timeout(5000);
    before(() => _this.server = app.listen(3000));

    describe('Syncing UBSes', () => 
    {
        it.skip('Should sync UBS from CSV', done => 
        {
            
        });
    });

    describe('Fetching UBSes', () => 
    {
        it('Should fetch a list of UBSes', done => 
        {
            Request.get('http://localhost:3000/v1/ubs')
                .then(httpResponse => {
                    let content = httpResponse.getContent();
                    console.log(content);
                    expect(httpResponse.getStatusCode()).to.be.equal(200);
                })
                .then(() => done());
        });
    });

    after(() => _this.server.close());

});