import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { getOrder } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import './myProfile.css';
import { updateUser } from '../../redux/slices/userSlice';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            dispatch(updateUser({ ...userData }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
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
