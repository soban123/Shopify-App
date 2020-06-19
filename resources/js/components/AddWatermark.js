import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import enTranslations from "@shopify/polaris/locales/en.json";
import {AppProvider, Stack,Caption,Thumbnail, Checkbox, Button, DisplayText,Select,DropZone} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

class AddWatermark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files:[],
            image:[],
            products: [],
            checkAll: false,
            fileName:'',
            watermarklocation:'',
            watermarkoptions:[
                {label:'Select an Option',value:''},
                {label:'Top Left',value:'top-left'},
                {label:'Bottom Left',value:'bottom-left'},
                {label:'Top Right',value:'top-right'},
                {label:'Bottom Right',value:'bottom-right'}]
        };
        this.updateValueInProducts=this.updateValueInProducts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.bulkUpdate = this.bulkUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('/get_columns')
            .then((res) => {
                this.setState({...res.data});
            })
            .catch((err) => {
                console.log(err)
            })
    }
    bulkUpdate() {
        let {products,files,watermarklocation,fileName} = this.state;
        if(watermarklocation.length==0)
        {
            alert('Please Select Watermark Position')
            return ;
        }
        if(files.length==0)
        {
            alert('Please Upload a watermark image')
            return ;
        }
        let productsToUpdate = products.map( (product) => {
            if (product.hasOwnProperty('check') && product.check)
                return product;
            }).filter(e => e != null);
        if (productsToUpdate.length > 0) {
            axios.post('/add_watermark', {watermarklocation,files,productsToUpdate,fileName})
                .then((res) => {
                    if(res.data.message)
                        alert('Successfully Updated')
                    else
                        alert('Could Not Update')
                })
                .catch((err) => {
                    alert('Could Not Update')
                    console.log(err)
                })
        } else {
            alert('No Product Selected')
        }
    }
    handleSubmit(item,id) {
        return function (event) {
            let {products} = this.state;
            products[id].check=true;
            this.setState({products});
            this.bulkUpdate();
        }.bind(this)
    }
    updateValueInProducts(value, key, id, booleantype = false) {
        let {products} = this.state;
        products[id][key] = booleantype ? !products[id][key] : value;
        this.setState({products});
    };
    render() {
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        return (
            <AppProvider>
                <Select
                        label="Watermark Location"
                        labelInline
                        options={this.state.watermarkoptions}
                        onChange={value=>{this.setState({watermarklocation:value})}}
                        value={this.state.watermarklocation}
                    />
                    <div style = {{width: 114, height: 175}}>
                        <DropZone
                            onDrop = {
                                async (_dropFiles, acceptedFiles, _rejectedFiles) =>{
                                    await this.setState({files:acceptedFiles,image:acceptedFiles})
                                    let files = await this.state.files
                                    let reader = await new FileReader();
                                    reader.onload = async (e) => {
                                        await this.setState({
                                            files: e.target.result
                                        })
                                    };
                                    let fileName=files[0].name
                                    await this.setState({fileName})
                                    await reader.readAsDataURL(files[0]);
                                }}>
                                <Stack vertical>
                                {this.state.image.map((file, index) => (
                                    <Stack alignment="center" key={index}>
                                        <Thumbnail
                                            id="file"
                                            size="small"
                                            alt={file.name}
                                            source={
                                            validImageTypes.indexOf(file.type) > 0
                                                ? window.URL.createObjectURL(file)
                                                : ''
                                            }
                                        />
                                        <div>
                                            {file.name}<Caption>{file.size} bytes</Caption>
                                        </div>
                                    </Stack>
                                ))}
                                </Stack>
                            <DropZone.FileUpload />
                        </DropZone>
                    </div>
                    <Button >Add Watermark</Button>
                    <table>
                        <thead>
                        <tr>
                            <th><Checkbox checked={this.state.checkAll} onChange={() => {
                                let {products, checkAll} = this.state;
                                checkAll = !checkAll;
                                products = products.map(v => {
                                    if (v.hasOwnProperty('check')) {
                                        v.check = checkAll
                                    }
                                    return v;
                                });
                                this.setState({checkAll, products})
                            }}/>
                            </th>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.products.map((item, id) => <tr key={id}>
                            <td><Checkbox checked={item.check} value={item.check}
                                          onChange={() => this.updateValueInProducts(null, 'check', id, true)}/></td>
                            <td>{id + 1}</td>
                            <td>
                                <DisplayText size="small" element="p">{item.product.title}</DisplayText>
                            </td>
                            <td><Button onClick={this.handleSubmit(item,id)}>Update</Button></td>
                        </tr>)}
                        </tbody>
                    </table>
                    <Button onClick={this.bulkUpdate}>Add watermark to all images</Button>
            </AppProvider>
        )
    }
}

export default AddWatermark;

if (document.getElementById('AddWatermark')) {
    ReactDOM.render(<AddWatermark/>, document.getElementById('AddWatermark'));
}
