import * as fs from 'fs';


exports.CSVToJson = (csvfile, customDictionary) =>
{
    if (/[0-9a-zA-Z\s\/\-\_]+\.csv/.test(csvfile))
        return new Promise((resolve, reject) => {
            fs.readFile(
                csvfile, { 'encoding': 'utf8' }, 
                (err, data) => err ? reject(err) : resolve(data)
            );
        }).then(csvContent => exports.CSVToJson(csvContent, customDictionary));

    csvfile = csvfile.split('\n');
    let dictionary = customDictionary;
    if (!dictionary) {
        let parser = value => {
            if (typeof value === 'number' || !isNaN(value)) {            
                if (value <= 3 || parseInt(value) <= 3)
                    return value;
            }

            if (value.indexOf('muito acima da m') >= 0)
                return 3;
    
            if (value.indexOf('nho acima da m') >= 0)
                return 2;
    
            return 1;
        }

        dictionary = [
            'geocode_lat', 'geocode_lon', 'code_city', 'code_cnes', 'name', 'address', 'district', 'city', 'phone', 
            { 'name': 'score_size', parser }, { 'name': 'score_adaptation_for_seniors', parser }, 
            { 'name': 'score_medical_equipment', parser }, { 'name': 'score_medicine', parser }
        ];
    }

    return csvfile.filter((row, index) => index > 0)
        .map(item => {
            item = item.split(',')

            let attributes = {};
            dictionary.forEach((field, index) => {
                if (!field)
                    return;

                let f = {
                    'name': field,
                    'parser': value => value.replace(/\n/g, ' ').replace(/\s\s/, ' ')
                }
                if (typeof field === 'object')
                    f = Object.assign(f, field);

                if (attributes[f.name])
                    return attributes[f.name] += ". " + (item[index] ? f.parser(item[index]) : null);

                attributes[f.name] = item[index] ? f.parser(item[index]) : null;
            });

            return attributes;
        });
}


exports.JSONToCSV = (list) =>
{
    if (list.length <= 0)
        return "";

    let dictionary = Object.keys(list[0]).join(',');
    let values = list.map(item => Object.keys(item).map(field => item[field]).join(',')).join('\n');

    return `${dictionary}\n${values}`;
}