import React, { useEffect } from 'react';
import '../styles.sass';
import { getProducts } from '../../../../redux/actions/modules/product';
import { RootState } from '../../../../redux/type';
import { byIdSelector } from '../../../../_shared/ui/redux';
import { connect, ConnectedProps } from 'react-redux';
import { Loading } from '../../../../app/App';
import { history } from '../../../../redux/store';
import _ from 'lodash';

const dispatchProps = {
    getProducts,
};

const stateProps = (state: RootState) => ({
    loading: state.ui.loading['getProducts'],
    products: byIdSelector(state.productPage?.byId),
    pagination: state.ui.pagination['getProducts'],
});

const connector = connect(stateProps, dispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MarketProps = PropsFromRedux & {
    loading: boolean;
};

const Market = (props: MarketProps) => {

    const { loading, getProducts, products } = props;

    const getAllProducts = (params: any = {}): void => {
        const defaultParams = {
            population: JSON.stringify(['images', 'user']),
        };

        const generateParams = Object.assign({}, defaultParams, params);
        getProducts(generateParams);
    };

    useEffect(() => {
        document.body.scrollTop = 0;
        document.querySelector('.menu')?.classList.remove('open');
        console.log('userProduct:', products);
    }, [products]);

    useEffect(() => {
        getAllProducts({});
    }, []);
    return (
        <div>
            {loading
                ?
                <div>
                    <Loading/>
                </div>
                : <main className="main">
                    {(products && products.length > 0)
                        ?
                        products.map((product: any, index) => {
                                console.log('all-product:', product);
                                return (
                                    <div key={index} className="item">
                                        <img
                                            key={index}
                                            src={_.get(product, ['images', 'file', 'url'], '')}
                                            alt={'Unable to load Image'}
                                            className="content"
                                            onClick={() => {
                                                history.push(`/app/products/details/${product._id}`);
                                            }}/>
                                    </div>
                                );

                            },
                        )
                        :
                        <div>
                            Can't find product within your location
                        </div>
                    }
                </main>
            }

        </div>
    );
};

export default connector(Market);
