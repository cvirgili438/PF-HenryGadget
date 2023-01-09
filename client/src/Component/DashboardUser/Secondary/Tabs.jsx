import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Addresses from './Addresses';
import AddressForm from './addressForm/AddressForm';
import { Button,Container } from '@mui/material';
import * as style from './addressForm/style.js'
import Modal from '@mui/material/Modal';
import ProfileForm from './ProfileForm';
import Switch from '@mui/material/Switch';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addresses = props.addresses
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [edit,setEdit] = React.useState(false)
  const handleChangeEdit = (event) => {
    setEdit(event.target.checked);
  };
  React.useEffect(()=>{},[])
  
  return (
    <Box sx={{ width: '100%' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.style}>
          <Button variant='contained' 
          onClick={handleClose}
          sx={{
          backgroundColor: 'black',
          color:'white',          
      }}>X</Button>
        <AddressForm 
        open={open}
        setOpen={setOpen}
        create ={true}
        disabled={false}
        name ={''}
        id={''}
        street={''}
        city={''}
        region={''}
        postalCode={''}
        token={props.token}
/>
        </Box>
      </Modal>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Addresses" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} id='addresses'> 
      {addresses && addresses.length>= 0 && (
      <Button
        onClick={handleOpen}        
        variant="contained" 
        sx={{
        backgroundColor: 'black',
        color:'white'
    }}
      >Create new address</Button>) }       
        {addresses.length > 0 ? addresses.map((element,index)=>{
            return <Addresses
                            key={element.name + index}
                            name ={element.name}
                            id={element.id}
                            street={element.street}
                            city={element.city}
                            region={element.region}
                            postalCode={element.postalCode}
                            token={props.token}
                            />
        }): <></>}    
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Container sx={{
                    display:'flex',
                    direction:'row',
                    alignItems:'center',
                    justifyContent:'right'
                    
                }}>
                <Typography >Edit</Typography>
                <Switch
                     checked={edit}
                     onChange={handleChangeEdit}
                     inputProps={{ 'aria-label': 'controlled' }}
                />
                </Container>
                {edit === false ? (
                <Container fixed >
                  <ProfileForm user={props.user} disabled={!edit}/>
                </Container>):
                (
                  <Container fixed >
                    <ProfileForm user={props.user} disabled={!edit}/>
                  </Container>
                )
                }
        
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}