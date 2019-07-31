import axios from 'axios';
import authService from '../services/auth-service';
import AxiosService from '../services/axios-service';

import { FETCH_RENTAL_BY_ID_SUCCESS, 
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE, LOGOUT} from './types';

// RENTAL ACTIONS ===============================

const axiosInstance = AxiosService.getInstance();

const fetchRentalByIdInit = () => {
    
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}

const fetchrentalsuccess = rentals => {
    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals: rentals
    }
}

export const fetchRentals = () => {
    return dispatch => {
        axiosInstance.get('/rentals')
            .then(res => res.data).then(rentals => {
                dispatch(fetchrentalsuccess(rentals))
            });
    }
}

export const fetchRentalById = (rentalId) => {

    return function (dispatch) {
        dispatch(fetchRentalByIdInit())
        // Simulate server call

        axios.get(`/api/v1/rentals/${rentalId}`)
            .then(res => res.data)
            .then(rental => dispatch(fetchRentalByIdSuccess(rental))
            );
    }

}

// AUTH ACTIONS ===============================

const loginSuccess = () => {
    
    return {
        type: LOGIN_SUCCESS
    }
}

const loginFailure = errors => {

    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const register = userData => {

    return axios.post('/api/v1/users/register', userData)
        .then((res) => {
            return res.data;
        },
        (err) => { 
            return Promise.reject(err.response.data.errors)
        });
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

export const login = userData => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({response}) => {
                dispatch(loginFailure(response.data.errors));
            })
    }
}

export const logout = () => {

    authService.invalidUser();
    return {
        type: LOGOUT
    }
}

// BOOKED RENTAL ================================
export const createBooking = booking => {
    return axiosInstance.post('/bookings', {...booking})
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
}