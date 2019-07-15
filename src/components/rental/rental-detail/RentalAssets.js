import React from 'react';

export function RentalAssets() {

    return (
        <div className='rental-assets'>
            <h3 className='title'>Assets</h3>
            <div className='row'>
                <div className='col-md-6'>
                    <span><i className='fa fa-asterisk'></i> Cooling</span>
                    <span><i className='fa fa-thermometer'></i> Heating</span>
                    <span><i className='fa fa-location-arrow'></i> Iron</span>
                </div>
                <div className='col-md-6'>
                    <span><i className='fa fa-desktop'></i> Working area</span>
                    <span><i className='fa fa-cube'></i> Washing machines</span>
                    <span><i className='fa fa-cube'></i> Dishmaster</span>
                </div>
            </div>
        </div>
    )
}