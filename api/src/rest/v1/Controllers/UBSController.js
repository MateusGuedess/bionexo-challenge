import fs from 'fs';
import Sequelize from 'sequelize';
import { UBS } from './../Models/UBS';
import { CSVToJson, JSONToCSV } from './../../../Services/ConverterService';


export const syncCSVAction = async (request, response, next) => 
{
    let { media } = request.body;
    if (!media)
        return response.status(403).json({
            'status': false,
            'errors': [ 'Necessary pass a media field with buffered CSV file' ]
        });
        
    let ubses = CSVToJson(new Buffer(media, 'base64').toString('utf8'));
    while(ubses.length > 0)
        fs.writeFileSync(
            `${process.cwd()}/storage/${ubses.length}-${new Date().getTime()}.csv`, 
            JSONToCSV(ubses.splice(0, 100))
        );
        
    response.status(200).json({
        'status': true
    });
}


export const processCSVs = async (request, response) =>
{
    let files = fs.readdirSync(process.cwd() + '/storage')
        .filter(file => file.substr('-4') === '.csv');

    let ubsFilesParsed = await Promise.all(files.map(file => CSVToJson(`${process.cwd()}/storage/${file}`)))
    let total = ubsFilesParsed.map(ubses => ubses.length);
    total = total.length > 0 ? total.reduce((prev, cur) => prev + cur) : 0;

    if (request.method.toUpperCase() === 'GET')
        return response.status(200).json({
            'status': true,
            'data': { total }
        });
    
    if (total > 0) {
        let slice = ubsFilesParsed[0];
        return Promise.all(slice.filter(u => u.name).map(ubs => UBS.findCreateFind({
            'where': {
                'name': ubs.name
            },
            'defaults': ubs
        })))
        .then(() => {
            fs.unlinkSync(`${process.cwd()}/storage/${files[0]}`);

            response.status(200).json({ 'status': true })
        });
    }

    response.status(200).json({ 'status': true });
}


export const insertUBSAction = (request, response) => 
{
    UBS.create(request.body.ubs)
    .then(ubs => {
        response.status(201).json({
            'status': true,
            'data': { ubs }
        });
    })
    .catch(err => {
        response.status(403).json({
            'status': false,
            'errors': [ err.message ]
        });
    });
};


export const listUBSesAction = (request, response) => 
{
    let { limit, offset, filters } = request.query,
        OP = Sequelize.Op;

    if (filters)
        filters = JSON.parse(filters);

    if (filters && filters.boundaries) {
        let [
            first,
            second
        ] = filters.boundaries;

        filters['geocode_lat'] = {
            [OP.gte] : second[0],
            [OP.lte] : first[0]
        }

        filters['geocode_lon'] = {
            [OP.gte]: second[1], 
            [OP.lte]: first[1]
        }

        filters.midpoint = [
            (first[0] + second[0]) / 2,
            (first[1] + second[1]) / 2
        ]

        delete filters.boundaries;
    }

    let attributes = ['id', 'name', 'address', 'city', 'geocode_lat', 'geocode_lon', 'phone'];
    let order = [ 'id' ];
    if (filters.midpoint) {
        attributes.push([
            `(3959 * ACOS(COS(RADIANS(${filters.midpoint[0]})) * COS(RADIANS(geocode_lat)) * 
            COS(RADIANS(geocode_lon) - RADIANS(${filters.midpoint[1]})) + 
            SIN(RADIANS(${filters.midpoint[0]})) * SIN(RADIANS(geocode_lat))))`,
            'distance'
        ]);
        order = [ Sequelize.literal('distance') ];

        delete filters.midpoint;
    }

    UBS.findAndCount({
        attributes,
        'limit': limit || 10, 
        'offset': offset || 0,
        'where': filters,
        order
    })
    .then(({ count, rows }) => {
        response.status(200).json({
            'status': true,
            'data': { 'total': count, 'results': rows }
        })
    });
}


export const getUBSByIdAction = async (request, response) => 
{
    let ubs = await UBS.findById(request.param('id'));
    if (!ubs)
        return response.status(404).json({
            'status': false,
            'errors': [ 'UBS not found' ]
        });

    return response.status(200).json({
        'status': true,
        'data': { ubs }
    });
}