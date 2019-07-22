import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { BwmInput } from '../shared/form/BwmInput';
import { BwmResError } from '../shared/form/BwmResError';
import { minLength6, email, required } from '../shared/form/validators'

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, errors, valid } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <BwmResError errors={errors} />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
        validate={[required, minLength6]}
      />
      <button className="btn btn-bwm btn-block mt-3" type="submit" disabled={!valid || pristine || submitting}>
        Login
        </button>
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm'
})(LoginForm)