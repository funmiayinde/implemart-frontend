import React, { useEffect } from 'react';
import './styles.sass';
import { NavLink } from 'reactstrap';
import { RootState } from '../../../../../redux/type';
import { connect, ConnectedProps } from 'react-redux';
import { addComment, getProduct } from '../../../../../redux/actions/modules/product';
import _ from 'lodash';
import { Loading } from '../../../../../app/App';
import { useParams } from 'react-router-dom';

const stateProps = (state: RootState) => ({
    loading: state.ui.loading['getProduct'],
    product: state.productPage.byPage,
});

const dispatchProps = {
    addComment,
    getProduct,
};

const connector = connect(stateProps, dispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ProductProps = PropsFromRedux & {
    loading: boolean;
    product: any;
};

const Product = (props: ProductProps) => {
    const { product, getProduct, loading } = props;
    const { id }: any = useParams();

    const getAProduct = (params: any = {}): void => {
        const defaultParams = {
            population: JSON.stringify(['images', 'user', 'comments']),
        };
        const generateParams = Object.assign({}, defaultParams, params);
        getProduct(id, generateParams);
    };
    useEffect(() => {
        document.body.scrollTop = 0;
        document.querySelector('.menu')?.classList.remove('open');
    }, [product]);

    useEffect(() => {
        getAProduct({});
    }, []);
    return (
        <>
            {loading
                ?
                <Loading/>
                :
                <div className="itemPageWrapper">
                    {(!_.isNull(product) && !_.isEmpty(product))
                        ?
                        <>
                            <div className="itemImgWrapper"/>
                            <div className="itemInfoWrapper">
                                <NavLink className="backLink" to="/"><span className="small">
                                </span>All Items
                                </NavLink>
                                <h3 className="itemName">{product.name}</h3>
                                <p className="itemCost frm">N{product.price}</p>
                                <p className="description">
                                    {product.description}
                                </p>
                                <p className="seller frm">By <span>{_.get(product, ['user', 'first_name'], '')}</span>
                                </p>
                            </div>
                        </>
                        :
                        <div>
                            Unable to fetch product details not the moment, please try again
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default connector(Product);
