import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import enTranslations from "@shopify/polaris/locales/en.json";
import {AppProvider, TextField,Checkbox, Button, DisplayText,Select,DropZone} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

class ImagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            checkAll: false,
            file_name_token: '{{shop_name}}-abc',
            alt_text_token: '{{shop_name}}-abc',
            compression_rate: 0,
            mappingKeys: {
                'product_title': 'product.title',
                'shop_name': 'product.vendor',
            },
            openBar: false,
            openBar2: false,
            openBarList: false,
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateValueInProducts = this.updateValueInProducts.bind(this);
        this.updateBulkSettings = this.updateBulkSettings.bind(this);
        this.bulkUpdate = this.bulkUpdate.bind(this)
    }

    bulkUpdate() {
        let {products,compression_rate} = this.state;
        console.log(compression_rate);
        let productsToUpdate = products.map((product) => {
            if (product.hasOwnProperty('check') && product.check)
                return product;
        }).filter(e => e != null);
        if (productsToUpdate.length > 0) {
            axios.post('/update_images', {productsToUpdate, compression_rate})
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

    handleChangeInput(e) {
        if (e.target.value.length > 0 && e.target.value.slice(-2) === "{{") {
            this.setState({listenabled: true});
        } else {
            this.setState({listenabled: false});
        }
    }

    componentDidMount() {
        axios.get('/get_columns')
            .then((res) => {
                this.setState({...res.data}, () => {
                    let {products} = this.state;
                    products.map((v) => {
                        let getKeys = this.state.file_name_token;
                        v.modified_filename = v.product.title;
                        v.modified_alt_text = v.alt;
                    });
                    this.setState({products})
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    updateValueInProducts(value, key, id, booleantype = false) {
        let {products} = this.state;
        products[id][key] = booleantype ? !products[id][key] : value;
        this.setState({products});
    };

    updateBulkSettings() {
        let filename = this.state.file_name_token;
        let alt = this.state.alt_text_token;
        let {products, mappingKeys} = this.state;
        let listsFilename = [...filename.matchAll(/\{\{(.*?)\}\}/g)].map(v => v[1]);
        let listsAlts = [...alt.matchAll(/\{\{(.*?)\}\}/g)].map(v => v[1]);
        products = products.map(v => {
            let fileName = this.state.file_name_token;
            let Alt = this.state.alt_text_token;
            v.modified_filename = '';
            v.modified_alt_text = '';
            if (v.hasOwnProperty('modified_filename')) {
                if (listsFilename.length > 0) {
                    listsFilename.map((item) => {
                        fileName = fileName.replace("{{" + item + "}}", _.get(v, mappingKeys[item]))
                    });
                }
                v.modified_filename = fileName.toLowerCase().replace(/\s+/g, '-');
            }
            if (v.hasOwnProperty('modified_alt_text')) {
                if (listsAlts.length > 0) {
                    listsAlts.map((item) => {
                        Alt = Alt.replace("{{" + item + "}}", _.get(v, mappingKeys[item]))
                    });
                }
                v.modified_alt_text = Alt.toLowerCase().replace(/\s+/g, '-');
            }
            return v;
        });
        this.setState({products})
    }

    render() {
        return (
            <AppProvider>
                <div>
                    <h1>Bulk Action Setting</h1>
                    Image:
                    {this.state.openBar && <div>
                        <ul>
                            {Object.keys(this.state.mappingKeys).map((v, k) => {
                                return <li key={k} onClick={() => {
                                    let {file_name_token} = this.state;
                                    file_name_token += v + "}}";
                                    this.setState({file_name_token, openBar: false})
                                }}>{v}</li>
                            })}
                        </ul>
                    </div>}
                    {this.state.openBar2 && <div>
                        <ul>
                            {Object.keys(this.state.mappingKeys).map((v, k) => {
                                return <li key={k} onClick={() => {
                                    let {alt_text_token} = this.state;
                                    alt_text_token += v + "}}";
                                    this.setState({alt_text_token, openBar2: false})
                                }}>{v}</li>
                            })}
                        </ul>
                    </div>}
                    <TextField placeholder="Image Name" value={this.state.file_name_token}
                               onChange={file_name_token => {
                                   let {openBar} = this.state;
                                   openBar = file_name_token.length > 0 && file_name_token.slice(-2) === "{{";
                                   this.setState({file_name_token, openBar})
                               }}/>
                    Image Alt Text:
                    <TextField placeholder="Image Alt Text" value={this.state.alt_text_token}
                               onChange={alt_text_token => {
                                   let {openBar2} = this.state;
                                   openBar2 = alt_text_token.length > 0 && alt_text_token.slice(-2) === "{{";
                                   this.setState({alt_text_token, openBar2})
                               }}/>
                    Image Compress:
                    <TextField type="number"
                        value={this.state.compression_rate}
                        onChange={async value=>{
                            await this.setState({compression_rate:value})
                        }}
                        placeholder="Compression Range"
                    />
                    <Button onClick={this.updateBulkSettings}>Save Bulk Settings</Button>
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
                            <th>Image Name</th>
                            <th>Alt Text</th>
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
                            <td>
                                <TextField value={item.modified_filename} placeholder="Title"
                                           onChange={val => this.updateValueInProducts(val, 'modified_filename', id)}
                                />
                            </td>
                            <td>
                                <TextField value={item.modified_alt_text} placeholder="Alt Text"
                                           onChange={val => this.updateValueInProducts(val, 'modified_alt_text', id)}
                                />
                            </td>
                            <td><Button onClick={this.handleSubmit(item,id)}>Update</Button></td>
                        </tr>)}
                        </tbody>
                    </table>
                    <Button onClick={this.bulkUpdate}>Bulk Update</Button>
                </div>
            </AppProvider>
        )
    }
}

export default ImagesList;

if (document.getElementById('ProductsList')) {
    ReactDOM.render(<ImagesList/>, document.getElementById('ProductsList'));
}
