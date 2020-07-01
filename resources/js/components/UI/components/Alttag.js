import React , { useState , useEffect, useCallback } from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import {
    ActionList,
    
    Badge,
    Button,
   
    ButtonGroup,
    Card,
  Select ,
    Icon,
    Page,
    Popover,
    
    Stack,
    FormLayout ,
    TextStyle,
    AppProvider,
    
} from '@shopify/polaris';

export default function Alttag() {

    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback((value) => setSelected(value), []);
  
    const options = [
      {label: 'Today', value: 'today'},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last 7 days', value: 'lastWeek'},
    ];


    return (
        <div>
            <Step1 step={'Step 1'} />
          
            <Step2 step={'Step 2'} />
            
            <Step3 step={'Step 3'} />
            
        </div>
    )
}
