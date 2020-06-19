import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {AppProvider, Modal, Button, DisplayText} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

class ResizeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            image: [],
            active: false,
            activeProduct: {},
            products: [],
            newFile: null,
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 1,
            },
            openPreview: false
        };

        this.handleUpdateImage = this.handleUpdateImage.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.makeClientCrop = this.makeClientCrop.bind(this);
        this.getCroppedImg = this.getCroppedImg.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openPreview = this.openPreview.bind(this);
    }

    componentDidMount() {
        axios.get('/get_columns')
            .then((res) => {
                console.log(res.data)
                this.setState({...res.data});
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleUpdateImage(e) {
        let {croppedImageUrl, activeProduct} = this.state;
        let url=activeProduct.local_src;
        var index = url.lastIndexOf("/") + 1;
        var filename = url.substr(index);
        fetch(croppedImageUrl).then(res => res.blob()).then(blob => {
            const file = new File([blob], filename, blob)
            let reader = new FileReader();
            reader.onload = async (e) => {
                await this.setState({
                    newFile: e.target.result
                },()=>{
                    let {newFile} = this.state
                    axios.post('/resize_image', {newFile,activeProduct,filename})
                        .then((res) => {
                            console.log(res)
                        }).catch((err) => {
                        console.log(err)
                    })
                })
            };
            reader.readAsDataURL(file);
        })
    }

    toggleActive() {
        let {active} = this.state;
        this.setState({active: !active});
    }

    async openModal(item, e) {
        let {active} = await this.state;
        await this.setState({active: !active});
        let files = await item.local_src;
        await this.setState({
            src: files,
            activeProduct:item
        })
    }

    openPreview(e) {
        let {openPreview} = this.state;
        this.setState({openPreview: !openPreview});
    }

    onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({src: reader.result})
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded(image) {
        this.imageRef = image;
    };

    onCropComplete(crop) {
        this.makeClientCrop(crop);
    };

    onCropChange(crop, percentCrop) {
        this.setState({crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({croppedImageUrl});
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    render() {
        const {crop, croppedImageUrl, src} = this.state;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        return <AppProvider>
            <table>
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.products.map((item, id) => <tr key={id}>
                    <td>{id + 1}</td>
                    <td>
                        <DisplayText size="small" element="p">{item.product.title}</DisplayText>
                    </td>
                    <td>{item.equal_sized ? 'Fixed' : 'Not Resized'}</td>
                    <td><Button onClick={() => {
                        this.openModal(item)
                    }}>Resize</Button></td>
                </tr>)}
                </tbody>
            </table>
            <div style={{height: '500px'}}>
                <Modal
                    large
                    open={this.state.active}
                    onClose={this.toggleActive}
                    title="Upload an Image"
                    primaryAction={{
                        content: 'Preiew Image',
                        onAction: this.openPreview,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: this.toggleActive,
                        },
                    ]}
                >
                    <Modal.Section>
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        )}
                    </Modal.Section>
                </Modal>
            </div>
            <div style={{height: '500px'}}>
                <Modal
                    large
                    open={this.state.openPreview}
                    onClose={this.openPreview}
                    title="Preview Cropped Image"
                    primaryAction={{
                        content: 'Confirm Changes',
                        onAction: this.handleUpdateImage,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: this.openPreview,
                        },
                    ]}
                >
                    <Modal.Section>
                        {this.state.openPreview && croppedImageUrl && (
                            <img alt="Crop" style={{maxWidth: '100%'}} src={croppedImageUrl}/>
                        )}
                    </Modal.Section>
                </Modal>
            </div>
        </AppProvider>;
    }
}

export default ResizeImage;

if (document.getElementById('ResizeImage')) {
    ReactDOM.render(<ResizeImage/>, document.getElementById('ResizeImage'));
}
