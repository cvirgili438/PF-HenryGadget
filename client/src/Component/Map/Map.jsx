import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

import henryMarker from '../../Assets/mapicon.png'
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';

import Calendar from '../Calendar/Calendar';

import { getLocations } from './../../Redux/Actions/locations.js';

const Locations = () => {
  const [position, setPosition] = useState([-34.36, -58.26])
  const [selected, setSelected] = useState('');

  const locations = useSelector(state => state.locations);

  const dispatch = useDispatch();

  function GetIcon() {
    return new Icon({
      iconUrl: henryMarker,
      iconSize: [50, 50],
    });
  }

  const handleChangeSelected = (e) => {
    setSelected(e.target.value);
    setPosition([
      locations.find(p => p.id === e.target.value).lat, 
      locations.find(p => p.id === e.target.value).lon
    ])
  };

  const handleMarkerClick = (e) => {
    setSelected(e.target.options.value);
    setPosition([
      locations.find(p => p.id === e.target.options.value).lat, 
      locations.find(p => p.id === e.target.options.value).lon
    ])
  }

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch]);

  return (
    <div id='anchor-contact' className={ styles.container} >
      <div className={ styles.menu }>
        Locations and appointments, select from the list
        <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Locations</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ selected }
              label="Location"
              onChange={ handleChangeSelected }
            >
              {
                locations.length > 0 ?
                  locations
                  .map((p, i) => (
                                <MenuItem key={ p.id } value={ p.id }>{ p.name }</MenuItem>
                                ))
                                :
                                <MenuItem value="0">Connection error</MenuItem>
              }
            </Select>
          </FormControl>
        </Box>
        {
          locations.length > 0 && selected ?
            <Box sx={{ minWidth: 120, marginTop: 2 }}>
            <Typography
              fontSize={20}
              fontWeight={600}
              component="h3">{ locations.find(p => p.id === selected).address }
            </Typography>
            <Typography
              fontSize={20}
              fontWeight={600}
              component="h3">Contact: { locations.find(p => p.id === selected).contact }
            </Typography>
          </Box>
          :
          <></>
        }
        <Calendar uid={ selected } />
      </div>
      
      <div className={ styles.mapcomponent } >
        <div className={ styles.map }>
          <Map
            center={ position }
            zoom={ 6 }
            scrollWheelZoom={ true }
            style={{ height: "100%", width: "100%" }}
            useFlyTo={ true }
          >
            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
              // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
              // --- -------------------------------------------------------------------------------------- ---
            />
            {
              locations.length > 0 ? 
                locations
                .map((p, i) => (
                                <Marker
                                  value={ p.id }
                                  position={[ p.lat, p.lon ]}
                                  icon={ GetIcon() }
                                  onClick={ handleMarkerClick }
                                >
                                  {/* <Popup>
                                    { p.name }
                                  </Popup> */}
                                </Marker>
                ))
                :
                <></>
            }
          </Map>
        </div>
      </div>
    </div>
  );
}

export default Locations;