import { FETCH_RENTALS, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT } from './types';

const rentals = [
    {
        id: "1",
        title: "Center Apartment",
        city: "Freetown",
        street: "Times Square",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        quests: 12,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: true,
        createdAt: "24/12/2019"
    },
    {
        id: "2",
        title: "Center Apartment 2",
        city: "Freetown",
        street: "Times Square",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        quests: 12,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: "25/12/2019"
    },
    {
        id: "3",
        title: "Center Apartment 3",
        city: "Freetown",
        street: "Times Square",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        quests: 12,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: true,
        createdAt: "26/12/2019"
    },
    {
        id: "4",
        title: "Center Apartment 4",
        city: "Freetown",
        street: "Times Square",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 4,
        quests: 12,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: "27/12/2019"
    },
    {
        id: "5",
        title: "Center Apartment 5",
        city: "Freetown",
        street: "Times Square",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 5,
        quests: 12,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: true,
        createdAt: "27/12/2019"
    }
]

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

export const fetchRentals = () => {

    return {
        type: FETCH_RENTALS,
        rentals: rentals
    }
}

export const fetchRentalById = (rentalId) => {

    return function (dispatch) {
        dispatch(fetchRentalByIdInit())
        // Simulate server call
        setTimeout(() => {
            const rental = rentals.find((rental) => rental.id === rentalId);
            dispatch(fetchRentalByIdSuccess(rental))
        }, 1000)
    }

}
