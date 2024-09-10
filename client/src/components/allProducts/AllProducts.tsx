// import React, { useEffect, useState } from 'react';
// import './allProducts.css';
// import SingleProduct, { Product } from '../singleProduct/SingleProduct';
// import axios from 'axios';
// import { useCart } from '../../pages/cartContext/CartContext';
// import { useFav } from '../../pages/favoriteItemsContext/FavoriteItemsContext';


// const AllProducts = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [page, setPage] = useState(1);
//     const [pages, setPages] = useState(0);

//     const { addToCart } = useCart();
//     const { addToFavorites } = useFav();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const { data } = await axios.get('http://localhost:5000/api/products?pageNumber=${page}');
//             setProducts(data.products);
//             setPage(data.page);
//             setPages(data.pages);
//         };
//         fetchProducts();
//     }, [page]);

//     const createPageArray = (num: number) => {
//         return Array.from({ length: num }, (_, i) => i + 1);
//     };

//     return (
//         <div className="all-products-container">
//             <div className="all-products">
//                 {products.map(product => (
//                     <SingleProduct
//                         key={product._id}
//                         product={product}
//                         addToCart={addToCart}
//                         addToFavorites={addToFavorites}
//                         showButtons={true}
//                     />
//                 ))}
//             </div>
//             <div className="pagination">
//                 {createPageArray(pages).map((x) => (
//                     <button
//                         key={x}
//                         className={x === page ? 'active' : ''}
//                         onClick={() => setPage(x)}
//                     >
//                         {x}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllProducts;



















// import React, { useEffect, useState } from 'react';
// import './allProducts.css';
// import SingleProduct, { Product } from '../singleProduct/SingleProduct';
// import axios from 'axios';
// import { useCart } from '../../pages/cartContext/CartContext';
// import { useFav } from '../../pages/favoriteItemsContext/FavoriteItemsContext';

// const AllProducts = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [page, setPage] = useState(1);
//     const [pages, setPages] = useState(0);

//     const { addToCart } = useCart();
//     const { addToFavorites } = useFav();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 // Using template literals correctly
//                 const { data } = await axios.get(`http://localhost:5000/api/products?pageNumber=${page}`);
//                 setProducts(data.products);
//                 setPage(data.page);
//                 setPages(data.pages);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };
//         fetchProducts();
//     }, [page]); // Add page as a dependency so the effect runs when page changes

//     const createPageArray = (num: number) => {
//         return Array.from({ length: num }, (_, i) => i + 1);
//     };

//     return (
//         <div className="all-products-container">
//             <div className="all-products">
//                 {products.map(product => (
//                     <SingleProduct
//                         key={product._id}
//                         product={product}
//                         addToCart={addToCart}
//                         addToFavorites={addToFavorites}
//                         showButtons={true}
//                     />
//                 ))}
//             </div>
//             <div className="pagination">
//                 {createPageArray(pages).map((x) => (
//                     <button
//                         key={x}
//                         className={x === page ? 'active' : ''}
//                         onClick={() => setPage(x)} // This will update the page state
//                     >
//                         {x}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllProducts;


















import React, { useEffect, useState } from 'react';
import './allProducts.css';
import SingleProduct, { Product } from '../singleProduct/SingleProduct';
import axios from 'axios';
import { useCart } from '../../pages/cartContext/CartContext';
import { useFav } from '../../pages/favoriteItemsContext/FavoriteItemsContext';
import { useProduct } from '../../pages/productsContext/ProductsContext';


const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);

    const { addToCart} = useCart();
    const { fetchProducts } = useProduct();
    const { addToFavorites } = useFav();

    useEffect(() => {
        // move this to product context and call it from cart.tsx / app.tsx because its get refreshed and data lost
        const fetchProductList = async () => {
            try {
                // const { data } = await axios.get(`http://localhost:5000/api/products?pageNumber=${page}`);
                // setProductsList(data.products);
                const data = await fetchProducts(page);
                setProducts(data.products || []);
                setPage(data.page);
                setPages(data.pages);
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
                {products?.map(product => (
                    <SingleProduct
                        key={product._id}
                        product={product}
                        addToCart={addToCart}
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
