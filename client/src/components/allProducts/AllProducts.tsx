import React, { useEffect, useState } from 'react';
import './allProducts.css';
import SingleProduct, { Product } from '../singleProduct/SingleProduct';
import { useFav } from '../../pages/favoriteItemsContext/FavoriteItemsContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../../redux/Store';
import { fetchProducts } from '../../redux/slices/productSlice';

const AllProducts = () => {
    const dispatch: AppDispatch = useDispatch();
    const { products, pages, filteredProducts = [] } = useSelector((state: RootState) => state.product);
    const [page, setPage] = useState(1);
    const { addToFavorites } = useFav();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                await dispatch(fetchProducts({ page }));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProductList();
    }, [page]);

    const createPageArray = (num: number) => {
        return Array.from({ length: num }, (_, i) => i + 1);
    };

    return (
        <div className="all-products-container">
            <div className="all-products">
                {filteredProducts?.map(product => (
                    <SingleProduct
                        key={product._id}
                        product={product}
                        addToCart={(product: Product) => dispatch(addToCart(product))}
                        addToFavorites={addToFavorites}
                        showButtons={true}
                    />
                ))}
            </div>
            <div className="pagination">
                {createPageArray(pages).map((x) => (
                    <button
                        key={x}
                        className={x === page ? 'active' : ''}
                        onClick={() => setPage(x)}
                    >
                        {x}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
