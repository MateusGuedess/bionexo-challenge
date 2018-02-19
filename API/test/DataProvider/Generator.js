import * as ConverterService from './../../app/Services/ConverterService';


exports.ParsedCSVFile = () => 
    ConverterService.CSVToJson(process.cwd() + '/test/DataProvider/resources/ubs.csv')


exports.RandomUBSFromCSVFile = async (limit = 1) =>
{
    let parsedCSV = await exports.ParsedCSVFile();

    if (limit > 1) {
        let startAt = Math.floor(Math.random() * parsedCSV.length);
        return parsedCSV.slice(startAt, startAt + limit);
    }
    
    return parsedCSV[Math.floor(Math.random() * parsedCSV.length)];
}


exports.RandomCSVFile = async (amountOfRows = 2) =>
{
    let rows = await exports.RandomUBSFromCSVFile(amountOfRows);
    if (rows.length <= 0)
        return "";

    let dictionary = Object.keys(rows[0]).map(field => field).join(',');

    return dictionary + '\n' +
        rows.map(row => Object.keys(row).map(field => row[field]).join(',')).join('\n')
}