import { expect } from 'chai';
import { CSVToJson } from "../../../app/Services/ConverterService";


describe('Unit/Services/ConverterServiceTest', () => 
{
    it('Should parse a CSV file', done => 
    {
        CSVToJson(process.cwd() + '/test/DataProvider/resources/ubs.csv', [
            'lat', 'lon', 'code_city', 'cnes', 'name', 'address', 'address', 'address', null
        ])
        .then(parsedCSV => expect(parsedCSV).to.be.an('Array'))
        .then(() => done());
    });

    it('Should return error if CSV file do not exists', done => 
    {
        CSVToJson(process.cwd() + '/non-existent/file.csv')
            .catch(err => expect(err).to.be.an('Error'))
            .then(() => done());
    });
});