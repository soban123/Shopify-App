import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import enTranslations from "@shopify/polaris/locales/en.json";
import {AppProvider, TextField, Checkbox, Button, DisplayText} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

class BrokenLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        axios.get('/get_broken_images')
            .then((res) => {
                this.setState({...res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <AppProvider>
                <table>
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Vendor</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.products.map((item, id) => <tr key={id}>
                        <td>
                                <DisplayText size="small" element="p">{id+1}</DisplayText>
                            </td>
                            <td>
                                <DisplayText size="small" element="p">{item.title}</DisplayText>
                            </td>
                            <td>
                                <DisplayText size="small" element="p">{item.vendor}</DisplayText>
                            </td>
                            <td><Button >Upload Image</Button></td>
                        </tr>)}
                        </tbody>
                    </table>
            </AppProvider>
        )
    }
}

export default BrokenLinks;

if (document.getElementById('BrokenLinks')) {
    ReactDOM.render(<BrokenLinks/>, document.getElementById('BrokenLinks'));
}
