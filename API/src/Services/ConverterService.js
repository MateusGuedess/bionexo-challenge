import * as fs from 'fs';


exports.CSVToJson = (csvfile, customDictionary) =>
{
    if (/[a-zA-Z\s\/]+\.csv/.test(csvfile))
        return new Promise((resolve, reject) => {
            fs.readFile(
                csvfile, { 'encoding': 'utf8' }, 
                (err, data) => err ? reject(err) : resolve(data)
            );
        }).then(csvContent => exports.CSVToJson(csvContent, customDictionary));

    csvfile = csvfile.split('\n');
    let dictionary = customDictionary ? customDictionary : csvfile[0].split(',');

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