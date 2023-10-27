import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GoogleMapReact from 'google-map-react';
import { Button, Card, Input, Tooltip, Typography } from '@material-tailwind/react';
import {
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import NavLink from '@/Components/NavLink';
import { split } from 'postcss/lib/list';
import { host } from '@/utils/UrlApi';

function Products({ auth }) {



    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPrevew] = useState([]);
    const [codeProduct, setCodeProduct] = useState('');
    const [formData, setFormData] = useState({
        name_product: '',
        price_product: '',
        code_product: '',
        sale_price_product: '',
        provider_product: '',
        phone_product: '',
        image_product: '',
    });
    // get info if had id_products
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
  
    const getID = async () => {
        try {
            const response = await fetch(host + 'api/web/product/getone?id=' + id);
            if (response.status === 200) {
                const jsonData = await response.json();
                setFormData(jsonData);

            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (id != null || id) {
            getID();
        }
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData1 = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData1.append("image_product[]", selectedFiles[i]);
        }
        formData1.append("name_product", formData.name_product);
        formData1.append("code_product", codeProduct);
        formData1.append("provider_product", formData.provider_product);
        formData1.append("phone_product", formData.phone_product);
        formData1.append("price_product", formData.price_product);
        formData1.append("sale_price_product", formData.sale_price_product);


        console.log(formData1);
        // Gửi Dữ Liệu
        try {
            const response = await fetch(host + 'api/web/product', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: formData1,
            });
            if (response.status === 200) {

                console.log("ddddd");

            }
        } catch (error) {
            console.log(error);
        }
    };
    const getCode = (code) => {

        var code_product = split(code, ' ');
        var set_code = '';
        console.log(code_product.length);
        if (code_product.length && code_product.length >= 2) {
            var set1a = code_product[0].charAt();
            var set1b = code_product[1].charAt();
            set_code = set1a + set1b;
            console.log(set_code);

        }
        return set_code;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name == 'name_product') {
            setCodeProduct(getCode(value));
        }

    };
    const handleFileChange = (e, setImagePreview) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );
        setPrevew(previews);
    };
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Trang thông tin sản phẩm" />
            <div className='w-[90%] m-auto'>
                <Card className="my-2">
                    <div className="grid m-2 pr-7 grid-cols-3">
                        <div className="justify-self-start">
                            <Tooltip content="Trở lại">
                                <NavLink href={route('products')} className="font-normal">
                                    <ArrowLeftCircleIcon
                                        className="w-10 h-10 pointer-events-auto"
                                        color="#0056ffeb"
                                    />
                                </NavLink>

                            </Tooltip>

                        </div>
                        <div className='text-center mt-3'>
                            <Typography variant='h4'>Thêm Thông Tin Chi Tiết Sản Phẩm</Typography>

                        </div>
                    </div>
                </Card>
                <form encType='multiple'>
                    <Card className='grid grid-cols-2 gap-4 p-2'>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Input
                                    name='name_product'
                                    className='shadow-none '
                                    label='Tên sảm phẩm: VD( Máy Lạnh SamSung Inverter....) '
                                    defaultValue={formData[0]?.name_product}
                                    id="name_product"
                                    onChange={handleChange} />
                            </div>
                            <Input
                                name='price_product'
                                className='shadow-none '
                                label='Giá Mua'
                                value={formData[0]?.price_product}
                                id="price_product"
                                onChange={handleChange} />
                            <Input
                                name='sale_price_product'
                                className='shadow-none '
                                label='Giá Bán Đề Xuất'
                                value={formData[0]?.sale_price_product}
                                id="sale_price_product"
                                onChange={handleChange} />
                            <Input
                                name='provider_product'
                                className='shadow-none '
                                label='Thông Tin Đại Lý'
                                value={formData[0]?.provider_product}
                                id="provider_product"
                                onChange={handleChange} />
                            <Input
                                name='phone_product'
                                className='shadow-none '
                                label='Số liên hệ đại lý:'
                                defaultValue={formData[0]?.phone_product}
                                id="phone_product"
                                onChange={handleChange} />
                            <input
                                type="file"
                                name='image_product'
                                multiple
                                onChange={handleFileChange}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                            />
                        </div>
                        <div className="grid border border-orange-400 rounded-xl p-3">
                            <div className='grid grid-cols-2'> <Typography>
                                Tên sản phẩm: <b>{formData[0] ? formData[0].name_product : formData.name_product}</b>
                            </Typography>
                                <Typography>
                                    Mã Sản Phẩm: <b>{codeProduct}</b>
                                </Typography>
                                <Typography>
                                    Giá Mua: <b>{formData[0] ? formData[0].price_product : formData.price_product}</b>
                                </Typography>
                                <Typography>
                                    Giá Bán: <b> {formData[0] ? formData[0].sale_price_product : formData.sale_price_product}</b>
                                </Typography>
                                <Typography>
                                    Thông tin đại lý: <b> {formData[0] ? formData[0].sale_price_product : formData.provider_product}</b>
                                </Typography>
                                <Typography>
                                    Số Liên Hệ: <b> {formData[0] ? formData[0].sale_price_product : formData.phone_product}</b>
                                </Typography>
                                <Typography>
                                    Hình sản phẩm:
                                </Typography></div>
                            <div className="grid grid-cols-3 gap-4">
                                {(previewImages !== 'undefined' || previewImages) ? (previewImages.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        style={{ width: "100%", height: "auto", margin: "5px" }}

                                    />
                                ))) : ''}
                                
                            </div>
                        </div>

                    </Card>
                    <Card className='flex flex-row-reverse p-3 mt-3 '>
                        <Button
                            variant='outlined'
                            color='green'
                            onClick={handleAddProduct}
                        >Lưu Thông Tin</Button>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

export default Products