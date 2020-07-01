import React, { useCallback, Textield, useState } from "react";
import {
    Button,
    Modal,
    Thumbnail,
    MediaCard,
    VideoThumbnail,
    TextContainer,
    Form,
    FormLayout,
    TextField,
    RangeSlider,
    ButtonGroup ,
    Select,
    Heading
} from "@shopify/polaris";
import DropdownPopup from './Dropdown-Popup'
export default function Popup(props) {
    const [rangeValue, setRangeValue] = useState(32);
    
    const [imagePath, setimagePath] = useState() ;

    const handleRangeSliderChange = useCallback(
        value => setRangeValue(value),
        []
    );
    const [active, setActive] = useState(true);
        const [text, settext] = useState('example')
        const [color, setColor] = useState('gray')
        const [font, setFont] = useState(30)
    const [selected, setSelected] = useState('top-left');
        const [imageArr, setimageArr] = useState( <img  src ={'https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg'} style={{ width:"92%", height:"430px" }} />) ;
  
    const options = [
      
      {label: 'top-left', value: 'top-left'},
      {label: 'Top-center', value: 'top-center'},
      {label: 'Top-right', value: 'top-right'},
      {label: 'Bottom-left', value: 'bottom-left'},
      {label: 'Bottom-center', value: 'bottom-center'},
      {label: 'Bottom-right', value: 'bottom-right'},
      {label: 'Center-left', value: 'center-left'},
      {label: 'Center-center', value: 'center-center'},
      {label: 'Center-right', value: 'center-right'},

      
    ];

    const TextHandler = (e)=>{
       
        settext(e);
        // console.log(e);

    }
    const FontHandler = (e)=>{
       
        setFont(`${e}px`);
        console.log('font',e);

    }
    const ColorHandler = (e)=>{
       
        setColor(e);
        console.log('color',e);

    }

    const handleSelectChange2 = (e) => {
        setSelected(e);
        

    }

    const handleUploadImage = (path) => { 

    console.log( 'popupImgePth' , path )
    let newPath =  path.replace("E:\\ShopifyApp-New-Git\\shopifyapp\\public\\", "http://127.0.0.1:8000/");
    setimagePath(newPath);
    console.log( 'newpath' , newPath)
    
    setimageArr( <img  src ={`${newPath}`} style={{ width:"92%", height:"430px"}} /> )

}
    const handleChange = useCallback(() => setActive(!active), [active]);

    return (
        <div style={{ height: "800%" }}>
            <Button onClick={handleChange}>Open</Button>
            <Modal
                large
                open={active}
                onClose={ ()=> {handleChange() ; props.handleWatermark() ; props.handleChange()   }}
                title="IMAGE NAME.JPEG "
                primaryAction={{
                    content: "Save",
                    onAction:props.handleWatermark
                }}
                secondaryActions={[
                   
                    {
                        content: "Cancel",
                        onAction: props.handleWatermark
                    }
                ]}
            >
                <Modal.Section>
                    <div style={{ display: "flex" }}>
                        <div style={{ Height: "430", width: "60%" }}>

                            <div style={{ position:'relative' }} >
                            { imageArr
                                  } 
                            <p id="watermarkText" style={{opacity:`${rangeValue/100}` , color:color , fontSize:font}} className={`${selected}`}>  {text}   </p>
                          </div>
                          </div>
                        

                        <div style={{ maxHeight: "500px" , width:'260px' }}>
                            <Form>
                                < div className="h1" >IMAGE WATERMARK</div >
                                <FormLayout>
                                    
                            <DropdownPopup  handleUploadImage={handleUploadImage} ColorHandler={ColorHandler} FontHandler={FontHandler}  Text={ TextHandler } />
                           
                            
                                    <RangeSlider
                                        label="Opacity percentage"
                                        value={rangeValue}
                                        onChange={handleRangeSliderChange}
                                        output
                                    />
                                   

                                    <Select
                                        label="Placement"
                                        options={options}
                                        onChange={   handleSelectChange2      }
                                        value={selected}
                                        />
                                </FormLayout>
                            </Form>
                        </div>
                    </div>
                </Modal.Section>
            </Modal>
        </div>
    );
}
