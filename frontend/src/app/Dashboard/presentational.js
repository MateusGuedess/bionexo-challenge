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

const BoardPanel = props =>
(
    <div className="dashboard-board-panel">
        <ul>
            {
                props.googlemaps.isFetching ?
                <li style={{ 'textAlign': 'center' }}>... Loading ...</li>
                    :
                    props.googlemaps.data.total > 0 ?
                        props.googlemaps.data.results.map((ubs, index) => 
                            <ListItem key={ `ubs-list-${index}` } { ...ubs } />)   
                        :
                        <li style={{ 'textAlign': 'center' }}>No results found</li>
            }
        </ul>
    </div>
);


const ListItem = ubs =>
(
    <li>
        <h5><small>{ ubs.id }</small> { ubs.name.length > 20 ? `${ubs.name.substr(0, 20)}...` : ubs.name }</h5>
        <p><b>Address</b> { ubs.address }. { ubs.city }</p>
        <p><b>Phone</b> { ubs.phone }</p>
    </li>
);


const GoogleMaps = props =>
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


const Marker = ({ text }) =>
(
    <div className="google-maps-marker">
        { text }
    </div>
);