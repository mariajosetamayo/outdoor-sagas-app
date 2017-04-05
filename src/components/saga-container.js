import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';
import SagaDetail from '../components/saga-detail'
import Row from 'react-bootstrap/lib/Row'
import Image from 'react-bootstrap/lib/Image'
import Col from 'react-bootstrap/lib/Col'

class SagaContainer extends Component{

  constructor (props){
    super(props)
    this.handleClickForDelete = this.handleClickForDelete.bind(this);
  };

  handleClickForDelete(){
    this.props.dispatch(
      actions.deleteSaga(this.props.params.id)
    )
  };

  componentWillMount(){
    this.props.dispatch(
      actions.fetchSelectedSaga(this.props.params.id)
    )
  };

  renderButtons(){
    if(this.props.authenticated && this.props.userId === this.props.userSagaId){
      return (
          <Col className="buttonSection">
          <Link to='/user-home'>
            <button className=" btn btn-warning  btn-lg deleteBtn" onClick={this.handleClickForDelete}>Delete</button>
          </Link>
          <Link to={'/add-saga/' + this.props.params.id}>
            <button className=" btn btn-warning btn-lg editBtn">Edit</button>
          </Link>
        </Col>
      )
    }
  };

  render(){
    var mainDivStyles={
      position: 'absolute',
      top: '40%',
      marginTop: '-200px',
      left: '0',
      width: '100%'
    }
    return(
      <div style={mainDivStyles}>
        <div><SagaDetail type="sagaDetail" id= {this.props.params.id} selectedSaga= {this.props.saga} authenticated= {this.props.authenticated} story={this.props.story}/></div>
        <div>
          {this.renderButtons()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  saga: state.app.selectedSaga,
  userSagaId: state.app.selectedSaga.userId,
  story: state.app.selectedSaga.story,
  location: state.app.selectedSaga.location,
  authenticated: state.auth.authenticated,
  userId: state.app.userId
});

export default connect (mapStateToProps)(SagaContainer);
