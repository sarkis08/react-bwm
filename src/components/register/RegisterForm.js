import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { BwmInput } from '../shared/form/BwmInput';
import { BwmResError } from '../shared/form/BwmResError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      {/** Displaying errors */}
        <BwmResError errors={errors} />
      {/** End errors */}
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label="Confirm Password"
        className="form-control"
        component={BwmInput}
      />
      <button className="btn btn-bwm btn-block mt-3" type="submit" disabled={!valid || pristine || submitting}>
        Register
        </button>
    </form>
  )
}

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username required!'
  } else if (values.username && values.username.length < 4) {
    errors.username = 'Username min length is 4 character!'
  }

  if (!values.email) {
    errors.email = 'Email required!'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Password required!'
  } else if (values.password.length < 6) {
    errors.password = 'Provide atleast 6 characters!'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password Confirmation is required!'
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password did not match!'

  }


  return errors
}

export default reduxForm({
  form: 'registerForm', // a unique identifier for this form
  validate
})(RegisterForm)