import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';

class RentalDetail extends React.Component {


    componentWillMount() {
        // Displace action
        const rentalId = this.props.match.params.id;

        this.props.dispatch(actions.fetchRentalById(rentalId));
    }

    
    render() {

        //console.log(this.props.match.params.id);
        const rental = this.props.rental;
        if (rental.id) {
            return (
                <div>
                    <h1>{rental.title}</h1>
                    <h2>{rental.city}</h2>
                    <h3>{rental.dailyRate}</h3>
                </div>
            )
        } else {
            return (
                <h3>Loading ...</h3>
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail)