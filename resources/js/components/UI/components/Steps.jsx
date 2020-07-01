import React from "react";
import {
    ActionList,
    AppProvider,
    Badge,
    Button,
    ButtonGroup,
    Card,
    Checkbox,
    Heading,
    Icon,
    Page,
    Popover,
    RadioButton,
    Stack,
    TextField,
    TextStyle,
    Thumbnail
} from '@shopify/polaris';
import Popup from './Popup';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

import {MobileAcceptMajorMonotone, MobilePlusMajorMonotone} from "@shopify/polaris-icons";
import axios from "axios";

export default class NewSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            active: false,
            productTypeD: false,
            productType: 'Collection',
            productTypeOptions: ['Collection', 'Product', 'Blog'],
            fileNameOptions: [
                '[product_title]',
                '[product_title] [product_type]',
                '[product_title] [product_vendor]',
                '[product_title] [product_type] [product_vendor] [option1] [option2] [option3]'
            ],
            fileName: '',
            fileNameBefore: '',
            fileNameButton1D: false,
            tagNameOptions: [
                '[product_title]',
                '[product_title] [product_type]',
                '[product_title] [product_vendor]',
                '[product_title] [product_type] [product_vendor] [option1] [option2] [option3]'
            ],
            tagName: '',
            tagNameButtonD: false,
            iswatermark: false,
            iswatermarkActive: false,
            edit_previous: false,
            compression_type: 'lossy',
            to_jpg: false,

            imageBefore:  <Thumbnail
            source={'http://127.0.0.1:8000/reduce?url=https://template.canva.com/EAD7WY_6Ncs/1/0/283w-0JRD9DXZ1gY.jpg'} 
            size="large"
            alt="Black choker necklace"
            /> ,
            imageAfter: <Thumbnail
            source={'http://127.0.0.1:8000/reduce?url=https://template.canva.com/EAD7WY_6Ncs/1/0/283w-0JRD9DXZ1gY.jpg&reduce=70'} 
            size="large"
            alt="Black choker necklace"
            /> ,
            chips: [] , 
            // chipsArray:[]
        }
        this.toggleActive = this.toggleActive.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWatermark = this.handleWatermark.bind(this);
     
    }

    handleSubmit() {
        let {productType, fileName, tagName, compression_type, edit_previous, iswatermark, to_jpg} = this.state
        axios.post(window.location.origin + '/save_user_settings', {
            productType,
            fileName,
            tagName,
            compression_type,
            edit_previous,
            iswatermark,
            to_jpg
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    toggleActive() {
        let {active} = this.state
        this.setState({active: !active})
    }

    handleChange() {
        let {checked} = this.state
        this.setState({checked: !checked})
    }

    handleWatermark(){
        
        let {iswatermark } = this.state ;
            this.setState({ iswatermark: !iswatermark })
        
    }

    
      
      
      

    render() {
    
     

     

   
       

        return (
                
            <AppProvider id="Body">
 {  this.state.iswatermark ? <Popup handleWatermark={this.handleWatermark} handleChange={this.handleChange} /> : ''} 
            
            <Step1  step={'Step 1'} />
            <Step2 step={'Step 2'} />
            <Step3 step={'Step 3'} />
            <Step4 step={'Step 4'} />
            <Step5 step={'Step 5'} />
            <Step6 step={'Step 6'} />
                


            </AppProvider>
        )
    }
}
