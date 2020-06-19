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
    ButtonGroup,
    Heading
} from "@shopify/polaris";

export default function Popup() {
    const [rangeValue, setRangeValue] = useState(32);

    const handleRangeSliderChange = useCallback(
        value => setRangeValue(value),
        []
    );
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

    return (
        <div style={{ height: "800%" }}>
            <Button onClick={handleChange}>Open</Button>
            <Modal
                large
                open={active}
                onClose={handleChange}
                title="IMAGE NAME.JPEG "
              
                secondaryActions={[
                    {
                        content: "Save",
                        onAction: handleChange
                    },
                    {
                        content: "Cancle",
                        onAction: handleChange
                    }
                ]}
            >
                <Modal.Section>
                    <div style={{ display: "flex" }}>
                        <div style={{ height: "500", width: "60%" }}>

                            <div style={{ background: "yellow" }} />


                            <img src={require("../images/bag.png")} style={{ width: "92%", height: "73%" }} />
                            {/* <Thumbnail
                                    source={require("../images/bag.png")} 
                                size="large"
                                alt="Black choker necklace"
                            /> */}
                        </div>
                        <div style={{ height: "500px" }}>
                            <Form>
                                <Heading>IMAGE CROP & RESIZE</Heading>

                                <FormLayout>
                                    <Button size="large" style={{ background: "blue", width: "89%" }} >Crop Section
                                  <span style={{ marginLeft: "47px" }} > <img src={require("../images/arrow.png")} /></span
                                        ></Button>
                                    <Button size="large" style={{ background: "blue" }} >Deselect
                                  <span style={{ marginLeft: "77px" }} > <img src={require("../images/deselect.png")} /></span
                                        ></Button>
                                    <ButtonGroup>

                                        <Button style={{ background: "blue" }} >Rotate
                                  <span style={{ marginLeft: "1px" }} > <img src={require("../images/leftr.png")} /></span
                                            ></Button>
                                        <Button style={{ background: "blue" }} >Rotate
                                  <span style={{ marginLeft: "1px" }} > <img src={require("../images/rightr.png")} /></span
                                            ></Button>
                                    </ButtonGroup>
                                    <ButtonGroup>

                                        <Button style={{ background: "blue" }} >Flip
                                   <span style={{ marginLeft: "18px" }} > <img src={require("../images/flipl.png")} /></span
                                            ></Button>
                                        <Button style={{ background: "blue" }} >Flip
                                   <span style={{ marginLeft: "18px" }} > <img src={require("../images/flipr.png")} /></span
                                            ></Button>
                                    </ButtonGroup>


                                    <ButtonGroup>
                                    <Button size="large">Save</Button>
                                    <Button size="large">Cancle</Button>
                                    </ButtonGroup>


                                    <TextField label="File Type" type="url"   placeholder="230  x 786"/>
                                    
                                </FormLayout>
                            </Form>
                        </div>
                    </div>
                </Modal.Section>
            </Modal>
        </div>
    );
}
