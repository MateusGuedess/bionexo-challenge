import React from 'react';
import GoogleMapReact from 'google-map-react';

  
export const GoogleMaps = () => (    
    <div style={{ width: '100%', height: '100vh' }}>
        <GoogleMapReact
            defaultCenter={{ 
                'lat': -23.600, 
                'lng': -46.600 
            }}
            defaultZoom={ 12 }
            onBoundsChange={(center, zoom, bounds) => {
                console.log(center, zoom, bounds);
            }}>
            <Marker text={ '1' } 
                lat={ -23.5834444 }
                lng={ -46.6739122 }/>
        </GoogleMapReact>
    </div>
);


const Marker = ({ text }) =>
(
    <div className="google-maps-marker">
        { text }
    </div>
);