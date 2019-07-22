import React from 'react'

export const BwmInput = ({
    input,
    label,
    type,
    className,
    meta: { touched, error }
  }) => (
      <div className="form-group">
        <label>{label}</label>
        <div>
          <input {...input} type={type} className={className} />
        </div>
        {touched &&
          ((error && <span className="alert-error">{error}</span>))}
  
      </div>
    )
  