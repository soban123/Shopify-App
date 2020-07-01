import React, { Component } from 'react'
import Step1 from './Step1'

import {
    ActionList,
    
    Badge,
    Button,
   
    ButtonGroup,
    Card,
  
    Icon,
    Page,
    Popover,
    
    Stack,
  
    TextStyle,
    AppProvider,
    
} from '@shopify/polaris';
import Chips, { Chip } from 'react-chips'
import Popup from './Popup';
import {MobileAcceptMajorMonotone, MobilePlusMajorMonotone} from "@shopify/polaris-icons";


export default class Step1andStep2 extends Component {

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
            chips: [] , 


        }
        this.toggleActive = this.toggleActive.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleWatermark = this.handleWatermark.bind(this);
        this.myFunction = this.myFunction.bind(this);
      
        this.onChipsChange = this.onChipsChange.bind(this);
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

    myFunction  () {
            
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName('li');
      
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          txtValue = a.textContent || a.innerText;
          

          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
        

      }

      onChipsChange  (chips) {
        this.setState({ chips });
      }



    render() {

        const activator = (
            <Button onClick={this.toggleActive} disclosure>
                Product
            </Button>
        );
        const productTypeButton = (
            <Button onClick={() => {
                this.setState({ productTypeD: !this.state.productTypeD })
            }} disclosure>
                {this.state.productType}
            </Button>
        );
        const fileNameButton1 = (
            <Button onClick={() => {
                this.setState({ fileNameButton1D: !this.state.fileNameButton1D })
            }} disclosure>
                Choose File Name
            </Button>
        );

        let search =           this.state.fileNameOptions.map((item) => {
            return (
              
                <li  onClick={ async () => {
                    await this.setState({fileName: item,fileNameButton1D:false})
                } } ><a > {item}</a> </li>
               
         )
        })

           
        const tagNameButton = (
            <Button onClick={() => {
                this.setState({tagNameButtonD: !this.state.tagNameButtonD})
            }} disclosure>
                Choose Tag Name
            </Button>
        );
        let {fileName, tagName} = this.state;
        let fileNameBefore = fileName;
        let fileNameAfter = fileName.replace(/ /g, "-")
        // let tagNameBefore = tagName;
        // let tagNameAfter = tagName.replace(/ /g, "-")

        return (
            <AppProvider>
              

<Page title={this.props.step} id="step2-page" subtitle="Define File name">

<Card id="hand-Made" sectioned title="Define File Name">
    <p > What product shall we include in your image <b> file image ? </b></p>
    <br />
    <ButtonGroup fullWidth={true}>
        <Popover active={this.state.fileNameButton1D} activator={fileNameButton1} onClose={() => {
            this.setState({ fileNameButton1D: false })
        }}>
            <ActionList
                items={
                    this.state.fileNameOptions.map((item) => {
                        return {
                            content: item,
                            onAction: async () => {
                                await this.setState({fileName: item,fileNameButton1D:false})
                            }
                        }
                    })
                }
            />
        </Popover>
        <div>
            <div style={{ marginLeft: "115px" , maxWidth:'300px' }}>
                <div className="block"></div>
                <Badge status="info">Before</Badge>
                <Stack>
                    <TextStyle
                        style={{fontSize: "12px"}}>{this.state.fileName != '' ? fileNameAfter : 'File-Name'}.jpg</TextStyle>
                </Stack>
            </div>
        </div>
        <div>
            <div style={{ maxWidth:'300px' }}>
                <div className="block"></div>
                <Badge status="success"> After</Badge>

                <Stack>
                    <TextStyle
                        style={{fontSize: "12px"}}>
                        {this.state.fileName != '' ? fileNameBefore : 'File Name'}.jpg
                    </TextStyle>
                </Stack>
            </div>
        </div>
    </ButtonGroup>
    <br/>
   
    <Chips
    value={this.state.chips}
    onChange={this.onChipsChange}
    suggestions={this.state.fileNameOptions}

    />

   
    <div style={{display: "flex"}}>
        <span> <Icon
            source={MobilePlusMajorMonotone}/> </span>
        <span>Add Custom Text</span>
    </div>
</Card>
</Page>
                
                
            </AppProvider>
        )
    }
}
