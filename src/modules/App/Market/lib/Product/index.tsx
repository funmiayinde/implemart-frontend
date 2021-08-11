import React, { useEffect, useState } from 'react';

import './styles.sass';
import { history } from '../../../../../redux/store';
import { getProduct, getProducts } from '../../../../../redux/actions/modules/product';
import { RootState } from '../../../../../redux/type';
import { byIdSelector } from '../../../../../_shared/ui/redux';




const Product = () => {

    useEffect(() => {
        document.body.scrollTop = 0;
        document.querySelector('.menu')?.classList.remove('open');
    }, []);

    return (
        <div className="item">
            <img src={"https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?format=jpg&quality=90&v=1614559651"} className="content" onClick={()=>{
                // history.push('/app/products/details/123');
                history.push('/app/products/add');
            }}  alt={"Unable to load Image"}/>
        </div>
    );
};

export default Product;
