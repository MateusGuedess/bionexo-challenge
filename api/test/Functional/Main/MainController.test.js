import { expect } from 'chai';
import * as Request from './../../DataProvider/Request';
import { app } from './../../../app/bootstrap';


describe('Functional/Main/MainControllerTest', function ()
{

    const _this = this;
    before(() => _this.server = app.listen(5000));

    it('Should load first page', done => 
    {
        Request.get(`http://127.0.0.1:5000`)
            .then(httpResponse => {
                let content = httpResponse.getContent();
                console.log(content);
                expect(httpResponse.getStatusCode()).to.be.equal(200);
            })
            .then(() => done());
    });

    after(() => _this.server.close());

});