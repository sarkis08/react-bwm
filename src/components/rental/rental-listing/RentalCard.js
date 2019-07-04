import React from 'react';
import { Link } from 'react-router-dom';

export function RentalCard(props) {
    const rental = props.rental;

    return (
        <div className="col-md-3 col-xs-6">
            <Link className='rental-detail-link' to={`/rental/${rental.id}`}>
                <div className='card bwm-card'>
                    <img className='card-img-top' src={rental.image} alt={rental.title} />
                    <div className='card-block'>
                        <h6 className={`card-subtitle ${rental.category}`}>{rental.shared ? 'shared' : 'whole'} {rental.category} &#183; {rental.city}</h6>
                        <h4 className='card-title'>{rental.title}</h4>
                        <p className='card-text'>SLL {rental.dailyRate} per Night &#183; Free Cancelation</p>
                        <Link to='#' className='card-link'>More Info</Link>
                        <Link to="#" className="card-link">More Info</Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}