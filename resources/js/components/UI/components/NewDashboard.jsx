import React, {Component, useState, activator, Popover, useCallback, rangeValue, ExceptionList} from 'react';
import {
    Page,
    Frame,
    ProgressBar,
    Loading,
    Stack,
    Button,
    Thumbnail,
    ResourceList,
    Icon,
    RangeSlider,
    rows,
    ActionList,
    RangeValue,
    icon,
    AppProvider,
    Card,
    DataTable,
    TextStyle,
    Layout,
    Badge,
    Form,
    FormLayout,
    TextField,
    url,
    handleUrlChange
} from '@shopify/polaris';
import {
    NoteMinor,
    popoverActive,
    NoteMajorMonotone,
    EmailMajorMonotone,
    PhoneMajorMonotone,
    ChatMajorMonotone,
    PlayMajorMonotone,
    PriceLookupMinor
} from '@shopify/polaris-icons';


export default function NewDashboard() {


    const [popoverActive, setPopoverActive] = useState(true);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            Detail
        </Button>
    );

    const rows = [
        [
            <Thumbnail
                source="https://image.shutterstock.com/image-photo/butterfly-grass-on-meadow-night-260nw-1111729556.jpg"
                alt="Black choker necklace"
            />,

            'my-product-image-file-name',

            <Badge status="success">RENAMED</Badge>,
            <Badge status="success">RENAMED</Badge>,
            <Badge status="success">CRUSHED</Badge>,
            <Badge status="success">48% SAVED</Badge>,
            <div style={{height: ''}}>
                <Popover
                    active={popoverActive}
                    activator={activator}
                    onClose={togglePopoverActive}
                >
                    <ActionList items={[{content: 'Import'}, {content: 'Export'}]}/>
                </Popover>
            </div>
        ],
    ]
    return ( <div className="NewDashboard">
            <AppProvider>
                <Page title="DashBoard">
                    <Layout style={{margin: "70px"}}>
                        <Layout.Section style={{margin: "60px"}}>
                            <Card sectioned>
                                <Card.Section Sectioned title="static & informative">
                                    <ProgressBar progress={75}/>
                                    <ResourceList
                                        resourceName={{singular: "sale", plural: "sales"}}
                                        items={[
                                            {
                                                sales: "Compress Image",
                                                amount: "322.4mb",
                                                url: "reports/orders"
                                            },
                                            {
                                                sales: "Compress Image",
                                                amount: "322.4mb",
                                                url: "reports/orders"
                                            },
                                            {
                                                sales: "Compress Image",
                                                amount: "322.4mb",
                                                url: "reports/orders"
                                            },
                                            {
                                                sales: "Compress Image",
                                                amount: "322.4mb",
                                                url: "reports/orders"
                                            },
                                            {
                                                sales: "Compress Image",
                                                amount: "322.4mb",
                                                url: "reports/orders"
                                            },
                                        ]}
                                        renderItem={item => {
                                            const {sales, amount, url} = item;
                                            return (
                                                <ResourceList.Item
                                                    url={url}
                                                    accessibilityLabel={`View Sales for ${sales}`}
                                                >
                                                    <Stack>
                                                        <Stack.Item fill>{sales}</Stack.Item>
                                                        <Stack.Item>{amount}</Stack.Item>
                                                    </Stack>
                                                </ResourceList.Item>
                                            );
                                        }}
                                    />
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>

                            <Card title="contact & help" sectioned>
                                <div className="icon" style={{display: "flex"}}>
                                    <div className="IconPara">
                                        <p>
                                            <Icon source={EmailMajorMonotone}/>
                                        </p>
                                    </div>
                                    <div className="IconPara">
                                        <p>Email:test123@gmail.com</p>
                                    </div>
                                </div>
                                <div className="icon" style={{display: "flex"}}>
                                    <div className="IconPara">
                                        <p>
                                            <Icon source={PhoneMajorMonotone}/>
                                        </p>
                                    </div>
                                    <div className="IconPara">
                                        <p>032184745</p>
                                    </div>
                                </div>
                            </Card>
                            <Card title="Documentation" sectioned>
                                <div className="icon" style={{display: "flex"}}>
                                    <div className="IconPara">
                                        <p className="IconColor">
                                            <Icon source={NoteMajorMonotone}/>
                                        </p>
                                    </div>
                                    <div className="IconPara">
                                        <p>Documentation</p>
                                    </div>
                                </div>
                                <div className="icon" style={{display: "flex"}}>
                                    <div className="IconPara">
                                        <p>
                                            <Icon source={ChatMajorMonotone}/>
                                        </p>
                                    </div>
                                    <div className="IconPara">
                                        <p>FAQS</p>
                                    </div>
                                </div>
                                <div className="icon" style={{display: "flex"}}>
                                    <div className="IconPara">
                                        <p>
                                            <Icon source={PlayMajorMonotone}/>
                                        </p>
                                    </div>
                                    <div className="IconPara">
                                        <p>Tutorial</p>
                                    </div>
                                </div>
                                <div className="icon" style={{display: "flex"}}>
                                    <div className="IconPara">
                                        <p>
                                            <Icon source={PriceLookupMinor}/>
                                        </p>
                                    </div>
                                    <div className="IconPara">
                                        <p>Pricing</p>
                                    </div>
                                </div>
                            </Card>
                        </Layout.Section>
                    </Layout>
                </Page>
                {/* images section */}
                <Page title="All images">
                    <Form>
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
                                        "FileName", "", "FkileName", "Alt Tag", "Compression", "", "",
                                    ]}
                                    rows={rows}

                                />
                            </Layout.Section>
                        </FormLayout>
                    </Form>
                </Page>
            </AppProvider>
        </div>
    )
}
