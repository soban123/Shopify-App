import React , {useState , useEffect , useCallback} from 'react'
import {
    Button,
    ActionList,
   Popover,
   DropZone,
   Stack ,
   Thumbnail ,
   Banner ,
   List ,
   Caption,
   TextField ,
   Select,
   ColorPicker ,
   RangeSlider


    
} from "@shopify/polaris";
import Axios from 'axios';
export default function DropdownPopup(props) {
    const [selected, setSelected] = useState();

  
    const options = [
      {label: 'Image', value: 'image'},
      {label: 'Text', value: 'text'},
    

      
    ];

      const [files, setFiles] = useState([]);
      const [rejectedFiles, setRejectedFiles] = useState([]);
      const hasError = rejectedFiles.length > 0;


      const [color, setColor] = useState('#ffff');
    
      const handleChange = (e) =>{
        console.log(e.target.value)
        setColor(e.target.value);
        props.ColorHandler(e.target.value)
      };

      useEffect(() => {
       fetch('get_columns')
       .then( res => res.json()  )
       .then( data => console.log(data) )
      }, [])

     

      const [rangeValue, setRangeValue] = useState(32);

      const handleRangeSliderChange = (e)=>{
        setRangeValue(e);
        props.FontHandler(e)
      }

      
        const handleDrop =   (e)=>{
          console.log('hndledrop' , e[0])

           setFiles( e )
          
           
          
         
        }


        const handleImageUpload = (e)=>{
          e.preventDefault();
          let formData = new FormData();
          formData.append('name', files[0].name);
          formData.append('file', files[0]);

          
         Axios.post( '/upload-image' ,  formData )
          .then( data =>  props.handleUploadImage(data.data)  )

          
        }
       
    

        const fileUpload = !files.length && <DropZone.FileUpload />;
        const uploadedFiles = files.length > 0 && (
          <Stack vertical>
            
           
          

            {files.map((file, index) => (
              <Stack alignment="center" key={index}>
                <Thumbnail
                  size="small"
                  alt={file.name}
                  source={window.URL.createObjectURL(file)}
                />
                <div>
                  {file.name} <Caption>{file.size} bytes</Caption>
                </div>
              </Stack>
            ))}
          </Stack>
        );
        
      
        const errorMessage = hasError && (
          <Banner
            title="The following images couldn’t be uploaded:"
            status="critical"
          >
            <List type="bullet">
              {rejectedFiles.map((file, index) => (
                <List.Item key={index}>
                  {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
                </List.Item>
              ))}
            </List>
          </Banner>
        );


        const handleSelectChange2 = (e) => {
            setSelected(e);
           
           
            if(e == 'image'){
               
                document.getElementById('imageUploadButton').classList.remove('hide')
                document.getElementById('text-dropdown').classList.add('hide')
                
            }
            else if( e == 'text' ){

              document.getElementById('text-dropdown').classList.remove('hide')
                document.getElementById('imageUploadButton').classList.add('hide')
            
            }
          
        }

//End Image Upload Button      

//Text Field
const [value, setValue] = useState('example');
const [property, setProperty] = useState('example');

console.log('path' , props );

//End Text field
    return (
        <div style={{}} >
            <div style={{maxHeight: '180px' , marginBottom:'150px' }}>
     

      <Select
      label="Watermark Type"
      options={options}
      onChange={   handleSelectChange2      }
      value={selected}
    />
 
      <div className="ImageuploadButton-Text">
          <div id="imageUploadButton" style={{ marginBottom:'150px' }} >
      <Stack vertical>
      {errorMessage}
      <DropZone accept="image/*"  type="image" onDrop={handleDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
<button className="btn btn-primary" onClick={handleImageUpload}>  Upload Picture </button>

    </Stack>  
      

    </div>
    

    <div id="text-dropdown" className="hide"  >  
    <TextField label="Store name" value={value}  onChange={ (e)=>{ setValue(e) ;  props.Text(e)   ; }} /> 
    <br />
      <label for="color"> Choose Watermark Color </label>
      <input type="color" id='color' value={color} onChange={handleChange} />
      {/* <ColorPicker onChange={handleChange} color={color} allowAlpha={true} /> */}
  
      <br />
    <RangeSlider
        label="Fontsize"
        value={rangeValue}
        onChange={handleRangeSliderChange}
        output
      />
    </div>

    </div>
    </div>
    
                           
        </div>
    )
}

