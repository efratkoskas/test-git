// import React from 'react';
// import './FavoriteItems.css';
// import SingleProduct from '../../components/singleProduct/SingleProduct';
// import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';

// const FavoriteItems = () => {
//     const { favItems, removeFromFav, increaseQuantity, decreaseQuantity } = useFav();

//     return (
//         <div>
//             <h1>FavoriteItems</h1>
//             {favItems.length > 0 ? (
//                 favItems.map(favItem => (
//                     <div key={favItem._id} className="fav-item">
//                         <SingleProduct product={favItem} showButtons={false} />
//                         <div className="quantity-controls">
//                             <button onClick={() => decreaseQuantity(favItem._id)}>-</button>
//                             <span>{favItem.quantity}</span>
//                             <button onClick={() => increaseQuantity(favItem._id)}>+</button>
//                         </div>
//                         <button onClick={() => removeFromFav(favItem._id)}>Remove from fav</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No items.</p>
//             )}
//         </div>
//     );
// };

// export default FavoriteItems;






























import React from 'react';
import './FavoriteItems.css';
import SingleProduct from '../../components/singleProduct/SingleProduct';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';
import { FaTrash } from 'react-icons/fa';

const FavoriteItems = () => {
    const { favItems, removeFromFav, increaseQuantity, decreaseQuantity } = useFav();

    return (
        <div className='the-favorite'>
            <h1>FavoriteItems</h1>
            <div className='fav-item'>
                {favItems.length > 0 ? (
                    favItems.map(favItem => (
                        <div key={favItem._id} className="favorite-item">
                            <SingleProduct product={favItem} showButtons={false} />
                            <div className="quantity-controls">
                                <button onClick={() => decreaseQuantity(favItem._id)}>-</button>
                                <span>{favItem.quantity}</span>
                                <button onClick={() => increaseQuantity(favItem._id)}>+</button>
                            </div>
                            <button className='favorite-trash' onClick={() => removeFromFav(favItem._id)}><FaTrash size={20} color='green' /></button>
                        </div>
                    ))
                ) : (
                    <p>No items.</p>
                )}
            </div>
        </div>
    );
};

export default FavoriteItems;
