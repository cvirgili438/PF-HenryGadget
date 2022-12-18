import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from './Checkout.module.css'

const steps = [
  'Confirm the purchase',
  'Confirm the shipping',
  'Payment method',
];

export default function Steppers({active}) {
    
  return (
    <div className={`container ${styles.container}`}  >
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={active} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
  );
}