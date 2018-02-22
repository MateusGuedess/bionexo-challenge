import React from 'react';
import GoogleMapReact from 'google-map-react';


export const Dashboard = props => (    
    <div>
        <BoardPanel { ...props } />
        <div style={{ width: '100%', height: '100vh' }}>
            <GoogleMaps { ...props } />
        </div>
    </div>
);

export const BoardPanel = props =>
(
    <div className="dashboard-board-panel container col-sm-4 col-md-3 col-lg-2">
        <div className="row">
            <div className="col-12">
                <BoardPanelUploader { ...props } />
            </div>
        </div><hr />
        <div className="row">
            <div className="col-12" style={{ 'overflowY': 'scroll', 'height': '450px' }}>
                <BoardPanelList { ...props } />
            </div>
        </div>
    </div>
);


export const BoardPanelUploader = props =>
(
    <div>
        <form onSubmit={e => { props.syncCSV(props.googlemaps.syncFile); e.preventDefault(); }}>
            <div className="col-12">
                <label>CSV:</label>
                <input type="file" className="form-control" onChange={props.selectCSVFile} />
            </div>
            <div className="col-12 text-right" style={{ 'marginTop': '10px' }} title="Upload">
                <button className="btn btn-primary" disabled={ props.googlemaps.syncEnabled ? false : true }>
                    {
                        props.googlemaps.isSyncing ?
                            <i className="fa fa-circle-o-notch fa-spin"></i>
                        :    
                            <i className="fa fa-cloud-upload"></i>
                    }
                </button>
            </div>
        </form>

        <div style={{ 'textAlign': 'center' }}>
            { 
                props.googlemaps.processRemaining > 0 ? 
                    <span>
                        <i className="fa fa-circle-o-notch fa-spin"></i> 
                        To be processed: { props.googlemaps.processRemaining }
                    </span>
                :
                    <span>Processed</span>
            }
        </div>
    </div>
);


export const BoardPanelList = props =>
(
    <ul>
        {
            props.googlemaps.isFetching ?
            <li style={{ 'textAlign': 'center' }}><i className="fa fa-spinner fa-spin"></i></li>
                :
                props.googlemaps.data.total > 0 ?
                    props.googlemaps.data.results.map((ubs, index) => 
                        <BoardPanelListItem key={ `ubs-list-${index}` } { ...ubs } />)   
                    :
                    <li style={{ 'textAlign': 'center' }}>No results found</li>
        }
    </ul>
);


export const BoardPanelListItem = ubs =>
(
    <li>
        <h5><small>{ ubs.id }</small> { ubs.name.length > 20 ? `${ubs.name.substr(0, 20)}...` : ubs.name }</h5>
        <p><b>Address</b> { ubs.address }. { ubs.city }</p>
        <p><b>Phone</b> { ubs.phone }</p>
    </li>
);


export const GoogleMaps = props =>
(
    <GoogleMapReact
        center={{ 
            'lat': -23.600, 
            'lng': -46.600 
        }}
        zoom={ 12 }
        onChange={({ center, zoom, bounds }) => {
            let boundaries = [
                [bounds.ne.lat, bounds.ne.lng],
                [bounds.sw.lat, bounds.sw.lng]
            ];

            props.fetchUBSByBoundaries(boundaries);
        }}>
        {
            props.googlemaps.data.results.map((ubs, index) => {
                return <Marker key={ `ubs-map-marker-${index}` } text={ ubs.id } 
                    lat={ ubs.geocode_lat }
                    lng={ ubs.geocode_lon }/>
            })
        }
    </GoogleMapReact>
);


export const Marker = ({ text }) =>
(
    <div className="google-maps-marker">
        { text }
    </div>
);