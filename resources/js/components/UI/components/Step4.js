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
import Chips, { Chip } from 'react-chips';
import Popup from './Popup';
import Step1 from './Step1';
import Step2 from './Step3';

import {MobileAcceptMajorMonotone, MobilePlusMajorMonotone} from "@shopify/polaris-icons";
import axios from "axios";

export default class Step3 extends React.Component {
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
        this.myFunction = this.myFunction.bind(this);
        this.handleLossy = this.handleLossy.bind(this);
        this.handleLossless = this.handleLossless.bind(this);
        this.onChipsChange = this.onChipsChange.bind(this);
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


      handleLossy  () {
          
          this.setState({
              imageAfter:   <Thumbnail
              source={'http://127.0.0.1:8000/reduce?url=https://www.actitime.com/wp-content/uploads/2018/07/1-2.png&reduce=70'} 
              size="large"
              alt="Black choker necklace"
              /> ,

              imageBefore:   <Thumbnail
              source={'http://127.0.0.1:8000/reduce?url=https://www.actitime.com/wp-content/uploads/2018/07/1-2.png&reduce=0'} 
              size="large"
              alt="Black choker necklace"
              /> 
          })
      }

      
      handleLossless  () {
        this.setState({
            imageAfter:   <Thumbnail
            source={'http://127.0.0.1:8000/reduce?url=https://www.success.com/wp-content/uploads/legacy/sites/default/files/1_16.jpg&reduce=70'} 
            size="large"
            alt="Black choker necklace"
            /> ,

            imageBefore:   <Thumbnail
            source={'http://127.0.0.1:8000/reduce?url=https://www.success.com/wp-content/uploads/legacy/sites/default/files/1_16.jpg&reduce=0'} 
            size="large"
            alt="Black choker necklace"
            /> 
        })
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

        // const searchList = [ <li><a href="#">Adele</a></li> ];
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
        let tagNameBefore = tagName;
        let tagNameAfter = tagName.replace(/ /g, "-")

        return (
                
            <AppProvider id="Body">
 {  this.state.iswatermark ? <Popup handleWatermark={this.handleWatermark} handleChange={this.handleChange} /> : ''} 
            
           
                


                {/* 3rd start */}

                <Page title={this.props.step} subtitle="Define File name">

                    <Card id="hand-Made" sectioned title="Added Tags">
                        <p > Choose one the default options or customize your own template (the part before file
                            extension eg, jpg, png </p>
                        <br />
                        <ButtonGroup fullWidth={true}>
                            <Popover active={this.state.tagNameButtonD} activator={tagNameButton}
                                onClose={this.toggleActive}>
                                <ActionList
                                    items={
                                        this.state.tagNameOptions.map((item) => {
                                            return {
                                                content: item,
                                                onAction: async () => {
                                                    await this.setState({ tagName: item, tagNameButtonD: false })
                                                }
                                            }
                                        })
                                    }
                                />
                            </Popover>
                            <div>
                                <div style={{ marginLeft: "115px" }}>
                                    <div className="block"></div>
                                    <Badge status="info">After</Badge>
                                    <Stack>
                                        <TextStyle>{this.state.tagName != '' ? tagNameAfter : 'Tag Name'}</TextStyle>
                                    </Stack>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="block2"></div>
                                    <Badge className="sucss" status="success">Before</Badge>

                                    <Stack>
                                        <TextStyle>{this.state.tagName != '' ? tagNameBefore : 'Tag Name'}</TextStyle>
                                    </Stack>
                                </div>
                            </div>
                        </ButtonGroup>
                        <br/>
                    

            <Chips
            value={this.state.chips}
            onChange={this.onChipsChange}
            suggestions={this.state.tagNameOptions}
 
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
