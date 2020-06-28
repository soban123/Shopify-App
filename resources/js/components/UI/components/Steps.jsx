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
        }
        this.toggleActive = this.toggleActive.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWatermark = this.handleWatermark.bind(this);
        this.myFunction = this.myFunction.bind(this);
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

        window.addEventListener('click', function(e){   
            if(e.target.id !== 'myInput' ) {
                if(document.getElementById('myUL')  )
                document.getElementById('myUL').classList.add('hide'); 

            }
          });
    
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
 {  !this.state.iswatermark ? <Popup handleWatermark={this.handleWatermark} handleChange={this.handleChange} /> : ''} 
                <Page title="Step 1" subtitle="Select which type of image to edit">

                    {/* step 1 start */}
                    <Card id="hand-Made" sectioned title="">
                        {/* new */}
                        <Popover active={this.state.productTypeD} activator={productTypeButton} onClose={() => {
                            this.setState({productTypeD: false})
                        }}>
                            <ActionList
                                items={
                                    this.state.productTypeOptions.map((item) => {
                                        return {
                                            content: item,
                                            onAction: async () => {
                                                await this.setState({ productType: item, productTypeD: false })
                                            }
                                        }
                                    })
                                }
                            />
                        </Popover>
                    </Card>
                </Page>
                {/* step 2 start */}
                <Page title="Step 2" id="step2-page" subtitle="Define File name">

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
                        <TextField
                        onFocus={ ()=>{ document.getElementById('myUL').classList.remove('hide');   } }
                        id="myInput" 
                            placeholder="+ Add Custom Text"
                            value={this.state.fileName}
                            onChange={(value) => {
                                this.setState({
                                    fileName: value,
                                })
                                this.myFunction();
                            }
                            }
                        

                        />
                        <ul id="myUL" className="hide" >

                        {search}
                           
                        </ul>
                        <div style={{display: "flex"}}>
                            <span> <Icon
                                source={MobilePlusMajorMonotone}/> </span>
                            <span>Add Custom Text</span>
                        </div>
                    </Card>
                </Page>


                {/* 3rd start */}

                <Page title="Step 3" subtitle="Define File name">

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
                        <TextField
                            placeholder="+ Add Custom Text"
                            value={this.state.tagName}
                            onChange={(value) => {
                                this.setState({
                                    tagName: value,
                                })
                            }
                            }
                        />
                        <div style={{display: "flex"}}>
                            <span> <Icon
                                source={MobilePlusMajorMonotone}/> </span>
                            <span>Add Custom Text</span>
                        </div>
                    </Card>
                </Page>

                {/* 4th step */}
                <Page title="Step 4" subtitle="Define Compression Type">
                    <Card id="hand-Made" sectioned title="">
                        <div className="middle_card">
                            <div style={{width: "40%"}}>
                                {/*<Stack vertical>*/}
                                <RadioButton
                                    label="Lossy Compression"
                                    helpText="Decrease image size with some quality loss . Typical Compression 5 - 70 %"
                                    checked={this.state.compression_type == 'lossy'}
                                    name="accounts"
                                    onChange={(value) => {
                                        this.setState({compression_type: 'lossy'})
                                    }}
                                />
                                <RadioButton
                                    label="Lossless Compression"
                                    helpText="Decrease image size with some quality loss . Typical Compression 5-30 %"
                                    name="accounts"
                                    checked={this.state.compression_type == 'lossless'}
                                    onChange={(value) => {
                                        this.setState({compression_type: 'lossless'})
                                    }}
                                />
                                {/*</Stack>*/}
                                {/* <div className="fl">
                                    <div><Checkbox checked={this.state.checked} onChange={this.handleChange}
                                                   disabled={false}/></div>
                                    <div className="inside_card">

                                        <div><Heading> <b> Lossy </b> Compression </Heading></div>

                                        <div className="parg"> Decrease image size with some quality loss . Typical
                                            Compression 5 - 70 %
                                        </div>
                                    </div>

                                </div> */}
                                <br />
                                <br />
                                {/* <div className="fl">
                                    <div><Checkbox checked={this.state.checked} onChange={this.handleChange}
                                        disabled={false} /></div>
                                    <div className="inside_card">
                                        <div><Heading> <b> Lossless </b> Compression </Heading></div>
                                        <div className="parg"> Decrease image size with some quality loss . Typical Compression 5-30 %
                                        </div>
                                    </div>
                                </div> */}
                                <br />
{/* 
                                <div className="fl">
                                    <div><Checkbox checked={this.state.to_jpg}
                                                   onChange={()=>{
                                                       this.setState({to_jpg: !this.state.to_jpg})
                                                   }}
                                                   disabled={false}/></div>
                                    <div className="inside_card">
                                        <div><Heading> <b> Convert </b> Png to Jpeg</Heading></div>
                                        <div className="parg">JPEG image are ideal for shopify stores because they
                                            provide the best quality with the smallest file size. The PNG format is only
                                            for advisable for
                                            images with a transparent background. The images Optimizer app can convert
                                            mages from PNG to JPG and dramatically reduce the file size up
                                            to 80% of the orignal size. Transparent PNGs will have a white a background.
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="Child2">
                                <div>
                                    <div className="block"> After</div>
                                    <Thumbnail
  source={require("../images/cycle.png")} 
  size="large"
  alt="Black choker necklace"
/>
                                                              </div>
                                <div>
                                    <div className="block2"> Before</div>
                                    <Thumbnail
   source={require("../images/cycle.png")} 
  size="large"
  alt="Black choker necklace"
/>
                                
                                </div>
                            </div>
                        </div>
                    </Card>
                </Page>
                {/* step 5 */}
                <Page title="Step 5" subtitle="Add Water Mark">

                    <Card id="hand-Made" sectioned>
                        <div className="step5">
                            <div><Checkbox checked={this.state.iswatermark} onChange={ ()=>{   this.handleWatermark() } }  disabled={false} />
                            </div>
                            <div>
                                <div><Heading> <b> Add Water Mark </b> </Heading></div>

                                <div className="parg"> Jpeg images are Ideal for shopify stores because they provide the best quality
                                with smallest file size . The Png
                                format is only advisable for image with a transparent background . The images
                                optimizer app can convert images from PNG to JPEG and dramiticatly reduces file size
                                    up to
                                    80% of original size . Transparent PNGs will have a white background .
                                </div>
                            </div>
                        </div>
                    </Card>
                </Page>
                <Page>


                    <div className="test">
                        <Checkbox
                            label="Skip previous edit images"
                            checked={this.state.edit_previous}
                            onChange={() => {
                                this.setState({edit_previous: !this.state.edit_previous})
                            }}
                        />
                    </div>
                </Page>
                <Page>

                    <Button onClick={this.handleSubmit} className="bulk" style={{background: "#230051", border: "none"}}
                            size="large">
                        Start Bulk Editing 
                            
                    </Button>
                </Page>
            </AppProvider>
        )
    }
}
