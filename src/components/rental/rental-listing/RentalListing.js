import React from 'react';
import { RentalList } from './RentalList';
import { connect } from 'react-redux';

import * as actions from '../../../actions';

// HOCs
// function withAlert(WrappedComponent) {
//     return class extends React.Component {

//         alertUser() {
//             alert('WAKE UP DEAR....');
//         }

//         render() {
//             return <WrappedComponent {...this.props} alertUser={this.alertUser} />
//         }
//     }
// }


class RentalListing extends React.Component {

    // Initializing state
    componentWillMount() {
        this.props.dispatch(actions.fetchRentals())
    }

    render() {
        return (
            <section id="rentalListing">
                <h1 className="title mt-4">Your Home All Around the World</h1>
                <RentalList rentals={this.props.rentals} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals.data
    }
}

export default connect(mapStateToProps)(RentalListing)