import React , { useState , useEffect, useCallback } from 'react'


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

export default function Step2(props) {

    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback((value) => setSelected(value), []);
  
    const options = [
      {label: 'Today', value: 'today'},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last 7 days', value: 'lastWeek'},
    ];


    return (
      
            
            <AppProvider>
              

<Page title={props.step} id="step2-page" subtitle="Set conditions to find images for editing">

<Card id="hand-Made" sectioned title="Images must match all following conditions to be edited">
    {/* <p > What product shall we include in your image <b> file image ? </b></p> */}
    <br />
  
    <Stack vertical spacing="extraTight">
      <FormLayout>
        <FormLayout.Group condensed>

    <Select
      
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
     <Select
      
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
    </FormLayout.Group>
      </FormLayout>
    </Stack>


   <br />
   <ButtonGroup>
  <Button primary>Preview Matched Products</Button>
  <Button >Add Product Filter Condition</Button>
</ButtonGroup>
   
    
</Card>
</Page>
                
                
            </AppProvider>
            
          
            
    )
}
