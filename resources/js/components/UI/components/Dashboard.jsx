import React from 'react'
import { useCallback, useState ,useEffect } from 'react';
import { ActionList, Popover } from '@shopify/polaris';
// import Table from './Table1';
import Home from  './Home'
import {
    Page,
    
    ProgressBar,
    
    Stack,
    Button,
    
    Modal,
    TextContainer,
    Autocomplete,
    Heading,
    UpdateText,
    Thumbnail,
    rows,
    SkeletonThumbnail,
    AppProvider,
    Card,
    DataTable,
    ResourceList,
    Icon,
    TextStyle,
    Layout,
    Badge,
    Form,
    FormLayout,
    TextField,
    url,
    handleUrlChange
} from '@shopify/polaris';

import { TickMinor, SettingsMajorMonotone } from "@shopify/polaris-icons";

import {
    NoteMinor,
    SearchMinor,
    ChevronDownMinor,
    popoverActive,
    NoteMajorMonotone,
    EmailMajorMonotone,
    PhoneMajorMonotone,
    ChatMajorMonotone,
    PlayMajorMonotone,
    PriceLookupMinor
} from '@shopify/polaris-icons';
import ResizeImage from '../../ResizeImage';

export default function Dashboard() {


    const [active, setActive] = useState(false);



    const rows = [ ];


    let [rscarr , setRsc] =useState([])
    let  [row, setrow] = useState([])
    const [WatermarkImg, setWatermarkImg] = useState(0);
    const [CompressImg, setCompressImg] = useState(0);
    const [ResizedImg, setResizedImg] = useState(0);

    
    
    
    
    

    useEffect(() => {
        

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
      
        })

    }, [active])



    return (

        <AppProvider>
                <Home />

            <Page title="DashBoard">
                <Layout >
                    <Layout.Section >
                        <Card sectioned>
                            <Card.Section Sectioned title="Static & Information">
                                <ProgressBar progress={75} />

                                <Stack >
                                <Stack.Item fill>
    
                                </Stack.Item>
                                    
                                    <Stack.Item >
                                        Monthly limit for use 300/1000
                                    </Stack.Item>
                                </Stack>
                                    
                                <ResourceList
                                    resourceName={{ singular: "sale", plural: "sales" }}
                                    items={ rscarr}
                                    renderItem={item => {
                                        const { sales, amount, url } = item;
                                        return (
                                            <ResourceList.Item
                                                url={url}
                                                accessibilityLabel={`View Sales for ${sales}`}
                                            >
                                                <Stack>
                                                    <Stack.Item fill>{sales}</Stack.Item>
                                                    <Stack.Item>{amount} / 300 </Stack.Item>
                                                </Stack>
                                            </ResourceList.Item>
                                        );
                                    }}
                                />

                                <Stack>
                                    <Stack.Item fill>
                                        <Heading>  <b>Current Plane:</b> Standerd </Heading>
                                    </Stack.Item>
                                    <Stack.Item>

                                    </Stack.Item>
                                    <Stack.Item>
                                        <Button primary>Edit Optimize File</Button>
                                    </Stack.Item>
                                </Stack>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>


                        <Card title="Documentation" sectioned>
                            <div className="icon" style={{ display: "flex" }}>
                                <div className="IconPara">
                                    <p className="IconColor">
                                        <Icon color="indigoDarker" source={NoteMajorMonotone}  />
                                    </p>
                                </div>
                                <div className="IconPara">
                                    <p>Documentation</p>
                                </div>
                            </div>
                            <div className="icon" style={{ display: "flex" }}>
                                <div className="IconPara">
                                    <p>
                                        <Icon color="indigoDarker" source={ChatMajorMonotone} />
                                    </p>
                                </div>
                                <div className="IconPara">
                                    <p>FAQS</p>
                                </div>
                            </div>
                            <div className="icon" style={{ display: "flex" }}>
                                <div className="IconPara">
                                    <p>
                                        <Icon color="indigoDarker" source={PlayMajorMonotone} />
                                    </p>
                                </div>
                                <div className="IconPara">
                                    <p>Tutorial</p>
                                </div>

                            </div>
                            <div className="icon" style={{ display: "flex" }}>
                                <div className="IconPara">
                                    <p>
                                        <Icon color="indigoDarker" source={PriceLookupMinor} />
                                    </p>
                                </div>
                                <div className="IconPara">
                                    <p>Pricing</p>
                                </div>
                            </div>
                        </Card>

                        <Card title="contact & help" sectioned>
                            <div className="icon" style={{ display: "flex" }}>
                                <div className="IconPara">
                                    <p>
                                        <Icon color="indigoDarker" source={EmailMajorMonotone} />
                                    </p>
                                </div>
                                <div className="IconPara">
                                    <p>Email:test123@gmail.com</p>
                                </div>
                            </div>
                            <div className="icon" style={{ display: "flex" }}>
                                <div className="IconPara">
                                    <p>
                                        <Icon color="indigoDarker" source={PhoneMajorMonotone} />
                                    </p>
                                </div>
                                <div className="IconPara">
                                    <p>032184745</p>
                                </div>
                            </div>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
            <div>

                {/* <Table /> */}
            
        </div>
        </AppProvider>
    )
}
