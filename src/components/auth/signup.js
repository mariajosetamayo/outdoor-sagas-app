import React , {Component} from 'react';
import { reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleSubmit(formProps){
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render(){
    const { handleSubmit, fields: { email, password, passwordConfirm}} = this.props;
    return (
      <div className="container signUpForm">
      <div className="row">
       <div className="col-xs-10 col-xs-offset-2 col-md-8 col-md-offset-3">
          <form className="vertical-center signForms" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <fieldset className = "form-group topInput">
              <label> Email: </label>
              <input className="form-control" {...email} />
              {email.touched && email.error && <div className="error">{email.error}</div>}
            </fieldset>
            <fieldset className = "form-group">
              <label> Password: </label>
              <input className="form-control" {...password} type="password" />
                {password.touched && password.error && <div className="error">{password.error}</div>}
            </fieldset>
            <fieldset className = "form-group">
              <label> Confirm Password: </label>
              <input className="form-control" {...passwordConfirm} type="password" />
                {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
            </fieldset>
              {this.renderAlert()}
              <div className="col-xs-2 col-md-3 col-md-offset-1 text-center">
                <button action ="submit" className="btn btn-lg btn-warning">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps){
  const errors = {};

  if (!formProps.email){
    errors.email = 'Please enter an email';
  }

  if (!formProps.password){
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a matching password';
  }

  if (formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors; // always return errors by default, even if there is no error
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  form : 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);
