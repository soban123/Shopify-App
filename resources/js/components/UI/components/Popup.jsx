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
    ButtonGroup
} from "@shopify/polaris";

export default function Popup(props) {
    const [rangeValue, setRangeValue] = useState(32);

    const handleRangeSliderChange = useCallback(
        value => setRangeValue(value),
        []
    );
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);
console.log(props)
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
                        <div style={{ height: "500", width: "60%" }}>

                            <div style={{ background: "yellow" }} />
                            <img  src ={require("../images/bag.png")} style={{ width:"92%", height:"73%"}} />
                            {/* <Thumbnail
                               source={require("../images/bag.png")} 
                                size="large"
                                alt="Black choker necklace"
                            /> */}
                        </div>
                        <div style={{ height: "500px" }}>
                            <Form>
                                <h1>Image water Mark</h1>
                                <FormLayout>
                                    <TextField label="Watermark Type" type="url" />
                                    <TextField label="Template" type="url" />

                                    <ButtonGroup>
                                        <h1>@WATERMARK</h1>
                                        <Button >Save</Button>
                                    </ButtonGroup>

                                    <RangeSlider
                                        label="Opacity percentage"
                                        value={rangeValue}
                                        onChange={handleRangeSliderChange}
                                        output
                                    />
                                    <TextField label="Watermark Type" type="url" />
                                    <TextField label="Template" type="url" />
                                </FormLayout>
                            </Form>
                        </div>
                    </div>
                </Modal.Section>
            </Modal>
        </div>
    );
}
