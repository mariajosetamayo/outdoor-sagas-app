import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

  activateDemoButton (){
    const demoUser = {
      email: 'demo@demo',
      password: 'demo'
    }
      this.props.signinUser(demoUser);
  }

  handleFormSubmit({ email, password }){
    this.props.signinUser({ email, password});
  };

  renderAlert (){
    if(this.props.errorMessage){
      return(
        <div className = "alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  };

  render(){
    const { handleSubmit, fields} = this.props;
    return (
      <div className = "container signInForm">
      <div className="row">
       <div className="formDiv">
          <form className=" signForms vertical-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group topInput">
                <label>Email:</label>
                <input {...fields.email} type="text" className="form-control" />
              </fieldset>
              <fieldset className="form-group">
                <label>Password:</label>
                <input {...fields.password} type="password" className="form-control" />
              </fieldset>
              {this.renderAlert()}
              <div>
                <button action="submit" className=" btn btn-lg btn-warning signupBtn">Sign in</button>
              </div>
              <div className="demoBtn2">
                <button className=" btn btn-lg btn-warning " onClick= {this.activateDemoButton.bind(this)}>Demo Account</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  };
};

function mapStateToProps(state){
  return { errorMessage: state.auth.error};
};

// Redux form helper: lets us have access to props such as fields(email, Password). It works like the connect helper.
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
