import React from 'react';
import { useCallback, useState } from 'react';
import { ActionList, Popover } from '@shopify/polaris';


import {
    Page,
    Frame,
    ProgressBar,
    Loading,
    Stack,
    Button,
    InputValue,
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
function Detail(props) {

    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const rows = [
        [
            <Thumbnail
            source={require("../images/land.jpg")} 
                size="medium"
                alt="Black choker necklace"
            />,
            'my-product-image-file-name',

            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename"  >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,

            <Badge status="success">48% SAVED</Badge>,


            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail</Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >

                    <Modal.Section>

                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],
        [
            <Thumbnail
            source={require("../images/camera.jpg")} 
                size="medium"
                alt="Black choker necklace"
            />,

            'my-product-image-file-name',

            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,


            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail</Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>

                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],
        [
            <Thumbnail
            source={require("../images/girl.jpg")} 
                size="medium"
                alt="Black choker necklace"
            />,

            'my-product-image-file-name',

            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,


            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail</Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>

                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],
        [
            <Thumbnail
            source={require("../images/flame.jpg")} 
                size="medium"
                alt="Black choker necklace"
            />,

            'my-product-image-file-name',

            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,


            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail</Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>

                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],
        [
            <Thumbnail
            source={require("../images/cycle.png")} 
                size="medium"
                alt="Black choker necklace"
            />,

            'my-product-image-file-name',

            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,


            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail</Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>

                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],
        [
            <Thumbnail
            source={require("../images/cycle1.png")} 
                size="medium"
                alt="Black choker necklace"
            />,

            'my-product-image-file-name',

            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,


            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail
                    </Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>

                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],
        [
            <Thumbnail
            source={require("../images/bag.png")} 
                size="medium"
                alt="Black choker necklace"
            />,
            'my-product-image-file-name',
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >RENAMED</Badge>,
            <Badge className="rename" >CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,
            <div style={{ height: '' }}>
                <Button onClick={handleChange}>
                    {/* <Icon
                    source={ChevronDownMinor} /> */}
                     Detail
                    </Button>
                <Modal
                    open={active}
                    onClose={handleChange}
                    title="Reach more shoppers with Instagram product tags"
                    primaryAction={{
                        content: 'Add Instagram',
                        onAction: handleChange,
                    }}
                    secondaryActions={[
                        {
                            content: 'Learn more',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>
                        <TextContainer>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
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

        ],




    ];

    return (
        <div>
            <Page title="Detail">
                <Layout>
                    <Layout.Section>
                        <Card className="costum-Card" title="" sectioned>
                            <FormLayout>
                                <FormLayout.Group>
                                    <Autocomplete.TextField
                                        prefix={<Icon source={SearchMinor} color="inkLighter" />}
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
                                        rows={rows}
                                    />
                                </Layout.Section>
                            </FormLayout>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
}

export default Detail;