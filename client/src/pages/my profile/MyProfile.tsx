// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/Store';
// import { getOrder } from '../../redux/slices/userSlice';
// import { Link } from 'react-router-dom';
// import './myProfile.css';

// const MyProfile = () => {
//     const user = useSelector((state: RootState) => state.user.user);

//     const dispatch: AppDispatch = useDispatch();

//     const [userData, setUserData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//     });

//     useEffect(() => {
//         setUserData({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', email: user?.email ?? '', });
//         dispatch(getOrder());
//     }, [user]);

//     const [isEditing, setIsEditing] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userId = localStorage.getItem('userId');
//                 const token = localStorage.getItem('authToken');

//                 if (!userId || !token) {
//                     throw new Error('User not authenticated');
//                 }

//                 const response = await axios.get(`/api/users/${userId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 // Check what's returned from the server
//                 console.log('Fetched user data:', response.data);

//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch user data:', error);
//                 if ((error as Error).message === 'User not authenticated') {
//                     alert('You must be logged in to access your profile');
//                     navigate('/login');  // Navigate to login page
//                 }
//             }
//         };

//         fetchUserData();
//     }, [navigate]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         try {
//             const userId = localStorage.getItem('userId');
//             const token = localStorage.getItem('authToken');

//             if (!userId || !token) {
//                 alert('User is not authenticated');
//                 return;
//             }

//             await axios.put(`/api/users/${userId}`, userData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setIsEditing(false);
//             alert('Profile updated successfully!');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             alert('Failed to update profile');
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h1>My Profile</h1>

//                 <div>
//                     <label>First Name: </label>
//                     {isEditing ? (
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={userData.firstName}
//                             onChange={handleChange}
//                         />
//                     ) : (
//                         <p>{userData.firstName}</p>
//                     )}
//                 </div>

//                 <div>
//                     <label>Last Name: </label>
//                     {isEditing ? (
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={userData.lastName}
//                             onChange={handleChange}
//                         />
//                     ) : (
//                         <p>{userData.lastName}</p>
//                     )}
//                 </div>

//                 <div>
//                     <label>Email: </label>
//                     {isEditing ? (
//                         <input
//                             type="email"
//                             name="email"
//                             value={userData.email}
//                             onChange={handleChange}
//                         />
//                     ) : (
//                         <p>{userData.email}</p>
//                     )}
//                 </div>

//                 {/* <div>
//                 <label>Password: </label>
//                 {isEditing ? (
//                     <input
//                         type="password"
//                         name="password"
//                         value={userData.password}
//                         onChange={handleChange}
//                     />
//                 ) : (
//                     <p>******</p>
//                 )}
//             </div> */}

//                 <button onClick={() => setIsEditing(!isEditing)}>
//                     {isEditing ? 'Cancel' : 'Edit'}
//                 </button>

//                 {isEditing && (
//                     <button onClick={handleSave}>
//                         Save Changes
//                     </button>
//                 )}
//             </div>
//             <div>
//                 <Link to="/orders">Orders History</Link>
//             </div>
//         </div>
//     );
// };

// export default MyProfile;

















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { getOrder } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import './myProfile.css';

const MyProfile = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch: AppDispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        setUserData({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', email: user?.email ?? '' });
        dispatch(getOrder());
    }, [user]);

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');

                if (!userId || !token) {
                    throw new Error('User not authenticated');
                }

                const response = await axios.get(`/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // console.log('Fetched user data:', response.data);

                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                if ((error as Error).message === 'User not authenticated') {
                    alert('You must be logged in to access your profile');
                    navigate('/login');  // Navigate to login page
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('authToken');

            if (!userId || !token) {
                alert('User is not authenticated');
                return;
            }

            await axios.put(`/api/users/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-details">
                <h1>My Profile</h1>

                <div className='profile-details-container'>
                    <div className="profile-row">
                        <label>First Name: </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        ) : (
                            <p className="profile-text">{userData.firstName}</p>
                        )}
                    </div>
                    <div className="profile-row">
                        <label>Last Name: </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        ) : (
                            <p className="profile-text">{userData.lastName}</p>
                        )}
                    </div>
                    <div className="profile-row">
                        <label>Email: </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        ) : (
                            <p className="profile-text">{userData.email}</p>
                        )}
                    </div>
                </div>

                <div className='profile-button-container'>
                    <button
                        className="profile-button"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                        <button
                            className="profile-button"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
            <div>
                <Link to="/orders" className="profile-link">Orders History</Link>
            </div>
        </div>
    );
};

export default MyProfile;
