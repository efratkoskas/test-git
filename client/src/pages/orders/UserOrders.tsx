import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/Store';
import { getOrder } from '../../redux/slices/userSlice';

export default function UserOrders() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
    }, []);

    return (
        <div>UserOrders</div>
    )
}
