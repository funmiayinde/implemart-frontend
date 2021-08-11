import React, { useState } from 'react';
import '../../../../../app/auth/style.sass';
import AutoCompletePlace from '../../../../../_shared/component/AutoCompleteSearch';
import { Form, Input, Upload, message, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './styles.sass';
import { getBase64 } from '../../../../../_shared/util/processor';
import ImgCrop from 'antd-img-crop';
import { RootState } from '../../../../../redux/type';
import { connect, ConnectedProps } from 'react-redux';
import { createProduct } from '../../../../../redux/middlewares/modules/product/product';
import { addProduct } from '../../../../../redux/actions/modules/product';


const stateProps = (state: RootState) => ({
    addingProduct: state.ui.loading['createProduct'],
    error: state.ui.errors['creatProduct'],
});

const dispatchProps = {
    addProduct,
};

const connector = connect(stateProps, dispatchProps);

type PropsRedux = ConnectedProps<typeof connector>;

type AddProductItems = PropsRedux & {
    addingProduct: boolean,
}


const AddItem = (props: AddProductItems) => {

    const { addingProduct, addProduct } = props;

    const [location, setLocation] = useState(null);
    const [previewVisible, setPreviewVisibility] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [file, setFile] = useState({});

    const handleOnSelect = (place: any) => {
        console.log('selected-location:', place);
        setLocation(place);
    };

    const onPreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        onSetPreviewImage(file.url || file.preview);
        onSetPreviewVisibility(true);
    };

    const handleOnFinish = (values: any) => {
        console.log('values:', values);
        const { geometry: { coordinates }, context, place_name }: any = location || {};
        const payload = {
            ...values,
            price: parseInt(values.price),
            coordinates, city: context[0]['text'], street: place_name,
            file,
        };
        console.log('payload:', payload);
        addProduct(payload, { population: JSON.stringify(['media']) });
    };

    const onUpload = (info: any) => {
        console.log('info:', info);
        setFileList(info.fileList);
        setFile(info.file.originFileObj);
        const status = info.file.status;
        if (status === 'uploading') {
            message.loading({
                content: 'Uploading product image...',
                key: '@PRODUCT_IMAGE_UPLOAD',
            });
        }
        if (status === 'done') {
            message.success({
                content: 'Product image uploaded successfully.',
                key: '@PRODUCT_IMAGE_UPLOAD',
                duration: 2,
            });
        }
    };

    const onSetPreviewVisibility = (visibility: boolean) => {
        setPreviewVisibility(visibility);
    };
    const onSetPreviewImage = (file: any) => {
        setPreviewImage(file);
    };

    const onBeforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{ marginTop: 8, width: 100 }}>Upload</div>
        </div>
    );

    return (
        <>
            <div className="modal">
                <div className="heading">
                    <h3>Add Item</h3>
                </div>
                <Form
                    labelCol={{ span: 4 }}
                    name="addProduct"
                    className="loginWrapper"
                    layout={'vertical'}
                    onFinish={handleOnFinish}
                >
                    <div className="itemWrapper">
                        <div className="itemInfoWrapper">
                            <div className="inputWrapper">
                                <label htmlFor="itemName">Name:</label>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input
                                        id="itemName"
                                        name="name"
                                        type="text"
                                        className="itemName"
                                        placeholder="Enter Name"/>
                                </Form.Item>
                            </div>
                            <div className="priceWrapper">
                                <div className="inputWrapper">
                                    <label htmlFor="itemPrice">Description:</label>
                                    <Form.Item
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your description!',
                                            },
                                        ]}
                                    >
                                        <input
                                            id="itemPrice"
                                            name="description"
                                            type="text"
                                            className="itemName"
                                            placeholder="Enter description"/>
                                    </Form.Item>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="itemCurrency">Price:</label>
                                    <Form.Item
                                        name="price"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your price!',
                                            },
                                        ]}
                                    >
                                        <input
                                            min="0"
                                            id="itemPrice"
                                            type="number"
                                            className="itemName"
                                            placeholder="Enter Price"/>
                                    </Form.Item>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="itemCurrency">Location:</label>
                                    <AutoCompletePlace
                                        onSelect={handleOnSelect}
                                        className="localAddress"
                                        placeHolder="Your Location"/>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="itemCurrency">Upload Image:</label>
                                    <ImgCrop rotate zoom grid fillColor={'var(--background-secondary)'}>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={onPreview}
                                            onChange={onUpload}
                                            beforeUpload={onBeforeUpload}
                                            multiple={false}
                                        >
                                            {fileList.length ? null : uploadButton}
                                        </Upload>
                                    </ImgCrop>
                                    <Modal
                                        visible={previewVisible}
                                        title={'Product Image'}
                                        footer={null}
                                        onCancel={() => onSetPreviewVisibility(false)}
                                    >
                                        <img alt="example" style={{ width: '100%' }} src={previewImage}/>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnWrapper">
                        <Form.Item>
                            <button className="loginBtn authBtn">
                                {addingProduct ? 'Processing...' : 'Save'}
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default connector(AddItem);
