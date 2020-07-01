import React from 'react'
import { useCallback, useState ,useEffect } from 'react';
import { ActionList, Popover } from '@shopify/polaris';
import {
    Page,
    
   
    Button,
    
    Modal,
    TextContainer,
    Autocomplete,
    Heading,
    Thumbnail,
    AppProvider,
    Card,
    DataTable,
    Icon,
    Layout,
    Badge,
    FormLayout,
  
} from '@shopify/polaris';


import {
    
    SearchMinor,

} from '@shopify/polaris-icons';
import ResizeImage from '../../ResizeImage';

export default function Table() {


    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);


    const rows = [ ];


    let  [row, setrow] = useState([])
  

    
    

    useEffect(() => {
        
        
  
      
        axios.get(window.location.origin + '/get_dashboard_statistics')
            .then((res) => {
          let customArray = res.data.products.map( item =>{

                    return(
                        [
                            <Thumbnail
                            source={item.src} 
                                size="medium"
                                alt="Black choker necklace"
                            />,
                           <p className="product-title"> {item.local_src.split('/').pop() }</p>,
                
                            <div className="di-flex"> <Badge > <div className="renamed-badge">  { item.used_by_user==0  ? 'Not Rename' : 'RENAMED' } </div> </Badge>  <span className="right-border"> </span> </div> ,
                            <div className="di-flex"> <Badge > <div className="renamed-badge">  { item.used_by_user==0  ? 'Not Rename' : 'RENAMED' } </div> </Badge>  <span className="right-border"> </span> </div> ,
                            <div className="di-flex"> <Badge status=""> <div className="renamed-badge"> { item.used_by_user==0 ? 'Not Crushed' : 'CRUSHED' } </div></Badge>  <span className="right-border"> </span> </div>,
                                                     <Badge status="success"> { Math.round(item.compressed_size /item.original_size * 100 ) }  SAVED</Badge>,
                
                
                            <div style={{ height: '' }}>
                                <Button onClick={handleChange}>
                                   
                                     Detail</Button>
                                <Modal
                                    open={active}
                                    onClose={handleChange}
                                    title="Reach more shoppers with Instagram product tags"
                                    primaryAction={{
                                        content: 'Close',
                                        onAction: handleChange,
                                    }}
                                    // secondaryActions={[
                                    //     {
                                    //         content: 'Learn more',
                                    //         onAction: handleChange,
                                    //     },
                                    // ]}
                                >
                
                                    <Modal.Section>
                
                                        <TextContainer>
                                            <div style={{ display: "flex", justifyContent: "space-around    " }}>
                                                <div>
                                                    <Badge>Before</Badge>
                                                    <Thumbnail
                                                        source={require("../images/cycle.png")} 
                                                        size="large"
                                                        alt="Black choker necklace"
                                                    />
                                                    <Heading>FILE NAME</Heading>
                                                    <Heading>Orignal file name</Heading>
                                                    <p>DCM-04546-52085-852</p>
                                                    <Heading>Optimized file name</Heading>
                                                    <p>DCM-04546-52085-852</p>
                                                    <Heading>Alt tags</Heading>
                                                    <p>DCM-04566-5620-50</p>
                                                </div>
                                                <div>
                                                    <Badge status="success">After</Badge>
                                                    <Thumbnail
                                                        source={require("../images/cycle.png")} 
                                                        size="large"
                                                        alt="Black choker necklace"
                                                    />
                                                    <Heading>FILE NAME</Heading>
                                                    <Heading>Orignal file name</Heading>
                                                    <p>DCM-04546-52085-852</p>
                                                    <Heading>Optimized file name</Heading>
                                                    <p>DCM-04546-52085-852</p>
                                                    <Heading>Alt tags</Heading>
                                                    <p>DCM-04566-5620-50</p>
                                                </div>
                                            </div>
                
                
                                        </TextContainer>
                                    </Modal.Section>
                                </Modal>
                            </div>
                
                        ]
                    )
                } )

                // console.log( 'cs' ,customArray);
                rows.push(customArray);
                setrow(customArray);
        console.log(res.data.products)

            })
            .catch((err) => {
                console.log(err)
            })


             axios.get(window.location.origin + '/get_dashboard_statistics')
            .then((res) => { let CompreCount = 0 ;
                let ResizeCount = 0 ;
                let WatermarkCount = 0 ;
           res.data.products.map( item => {

         
            item.compressed_size && CompreCount++ ;  

            item.resized_src && ResizeCount++ ;
            item.watermark_src && WatermarkCount++ ;
          
             

          } 
          
          )
          setRsc (  [  { sales: "Compress Image",  amount: CompreCount , url: "reports/orders"} , 
          { sales: "Watermark ",  amount: WatermarkCount , url: "reports/orders"} ,
          { sales: "Resize Image",  amount: ResizeCount , url: "reports/orders"}
        
        ] )
        //   setCompressImg(CompreValue)
        })

    }, [active])



    return (

        <AppProvider>
         
            <div>
            <Page title="All Images">
                <Layout>
                    <Layout.Section>
                        <Card className="costum-Card" title="" sectioned>
                            <FormLayout>
                                <FormLayout.Group>
                                    <Autocomplete.TextField
                                        prefix={<Icon color="indigoDarker" source={SearchMinor} color="inkLighter" />}
                                        placeholder="Search"
                                    />
                                </FormLayout.Group>
                            </FormLayout>

                            {/* images details */}
                            <FormLayout>
                                <Layout.Section>
                                    <DataTable
                                        columnContentTypes={[
                                            // 'text',
                                            // 'numeric',
                                            // 'numeric',
                                            // 'numeric',
                                            // 'numeric',
                                        ]}
                                        headings={[
                                            "File Name", "", "File Name", "Alt Tag", "Compression", "", "",
                                        ]}
                                        rows={row}
                                    />
                                </Layout.Section>
                            </FormLayout>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
        </AppProvider>
    )
}
