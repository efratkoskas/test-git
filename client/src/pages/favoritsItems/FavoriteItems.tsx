// import React from 'react';
// import SingleProduct from '../components/singleProduct/SingleProduct';
// import { useCart } from './CartContext';

// const FavoriteItems = () => {
//     const { favoriteItems, addToCart, removeFromFavorites } = useCart();

//     return (
//         <div>
//             <h1>Favorite Items</h1>
//             {favoriteItems.length > 0 ? (
//                 favoriteItems.map(product => (
//                     <div key={product._id}>
//                         <SingleProduct
//                             product={product}
//                             showButtons={true}
//                             addToCart={addToCart}
//                             addToFavorites={() => removeFromFavorites(product._id)}
//                             showFavoriteButton={false}
//                         />
//                         <button onClick={() => removeFromFavorites(product._id)}>Remove from Favorites</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No favorite items.</p>
//             )}
//         </div>
//     );
// };

// export default FavoriteItems;



// FavoriteItems.js
import React from 'react';
import './FavoriteItems.css';
import SingleProduct from '../../components/singleProduct/SingleProduct';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';

const FavoriteItems = () => {
    const { favItems, removeFromFav, increaseQuantity, decreaseQuantity } = useFav();

    return (
        <div>
            <h1>FavoriteItems</h1>
            {favItems.length > 0 ? (
                favItems.map(favItem => (
                    <div key={favItem._id} className="fav-item">
                        <SingleProduct product={favItem} showButtons={false} />
                        <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(favItem._id)}>-</button>
                            <span>{favItem.quantity}</span>
                            <button onClick={() => increaseQuantity(favItem._id)}>+</button>
                        </div>
                        <button onClick={() => removeFromFav(favItem._id)}>Remove from fav</button>
                    </div>
                ))
            ) : (
                <p>No items in the fav.</p>
            )}
        </div>
    );
};

export default FavoriteItems;