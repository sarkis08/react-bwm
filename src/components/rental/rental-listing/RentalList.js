import React from 'react';
import { RentalCard } from './RentalCard';

export class RentalList extends React.Component {

    renderRentals() {
        const rentals = this.props.rentals;
        return rentals.map(function(rental) {
            return (
                <RentalCard
                    key={rental._id}
                    rental={rental} />
            )
            });
    }

    render() {
        return (
            <div className="row">
                {this.renderRentals()}
            </div>
        )
    }
}
