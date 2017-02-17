import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import moment from 'moment';
// import {Form, ValidatedInput} from 'react-bootstrap-validation';



import * as actions from '../actions/index';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Image from 'react-bootstrap/lib/Image'
import PhotoUpload from '../components/photo-uploads';
import Footer from '../components/footer';


class NewSagaForm extends Component {
  constructor (props){
    console.log('this are the props on the form', props)
    // console.log(this.props.saga.app.gotData)
    super (props);
    this.handleClick = this.handleClick.bind(this);
  }

  // componentWillMount(){
  //   this.props.dispatch(
  //     actions.fetchUserId()
  //   )
  // }

  componentWillUnmount() {
    this.props.dispatch(
      actions.cleanSagaError()
    )
  }
  handleClick (){
    const saga = {
      sagaId: this.props.params.id,
      title: ReactDOM.findDOMNode(this.title).value,
      people: ReactDOM.findDOMNode(this.people).value,
      date: ReactDOM.findDOMNode(this.date).value,
      landmark: ReactDOM.findDOMNode(this.landmark).value,
      state: ReactDOM.findDOMNode(this.state).value,
      country: ReactDOM.findDOMNode(this.country).value,
      story: ReactDOM.findDOMNode(this.story).value,
      imageName: this.props.imageName
    }
    if(this.props.params.id){
      this.props.dispatch(
        actions.editSaga(this.props.params.id, saga)
      )
    }else{
      this.props.dispatch(
        actions.saveNewSaga(saga)
      )
    }

  }

  renderAlert (){
    if(this.props.errorMessage){
      console.log('this is the error message', this.props.errorMessage)
      return(
        <div className = "alert alert-danger alertAddForm">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render (){
    var blankSaga = {
      sagaId: '',
      title: '',
      people: '',
      date: '',
      landmark: '',
      state: '',
      country: '',
      story: ''
    }

    var saga = this.props.params.id ? this.props.saga : blankSaga;
    console.log('this is the saga variable', saga)
    let formatedDate = this.props.params.id ? moment.parseZone(saga.date).format('YYYY-MM-DD') : '';
    console.log('this is the date', formatedDate)

    return (
      <div className="jumbotron addSagaSection">
        <Row>
          <Col xs={6} md={8} className="col-md-offset-3 col-lg-offset-3">
            <h1 className="headingSagaTellingSpace text-center">Saga telling space</h1>
            <br/>
            <br/>
          </Col>
        </Row>
          <Row>
            <Col xs={6} md={4} className="col-md-offset-3 col-lg-offset-3">
              <div>
                <PhotoUpload defaultValue={this.id}/>
              </div>
            </Col>
          </Row>
          <br/>
          <Form horizontal className="addSagaForm">
            <FormGroup  controlId="formHorizontalText">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                  <label>What name/title would best describe your saga?</label>
                  <FormControl ref = {ref => this.title = ref} type="text" placeholder="Ex. The Remotest" defaultValue={saga.title} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                  <label>Who were you with?</label>
                  <FormControl ref = {ref => this.people = ref} type="text" placeholder="Ex. Gabriel and Igor" defaultValue={saga.people}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                  <label>When?</label>
                  <FormControl ref = {ref => this.date = ref} type="date" placeholder="Ex. 11/24/2016" defaultValue={formatedDate}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                <label>In what National Park or landmark?</label>
                  <FormControl ref = {ref => this.landmark = ref} type="text" placeholder="Ex. Getu" defaultValue={saga.landmark}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                  <label>In what State/Province?</label>
                  <FormControl ref = {ref => this.state = ref} type="text" placeholder="Ex. Getu" defaultValue={saga.state}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                  <label>In what country?</label>
                  <FormControl ref = {ref => this.country = ref} type="text" placeholder="Ex. China" defaultValue={saga.country}/>
                </Col>
              </Row>
            </FormGroup>

             <FormGroup controlId="formControlsTextarea">
              <Row>
                <Col sm={12} md={12} className="col-md-offset-7 col-lg-offset-7">
                  <label>What happened?</label>
                  <FormControl ref = {ref => this.story = ref} componentClass="textarea" placeholder="Here is where you give a summary of your adventure of the whole story. It can be as short or long as you want!" defaultValue={ saga.story}/>
                </Col>
              </Row>
          </FormGroup>
          <FormGroup>
          <Row>
            <Col smOffset={8} sm={4} md={10} className="col-md-offset-10 col-lg-offset-10">
              {this.renderAlert()}
              <Button className="btn-warning btn-lg" onClick = {this.handleClick}>
                Add my saga
              </Button>
            </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  saga: state.app.selectedSaga,
  errorMessage: state.app.error,
  imageName: state.app.imageName
});

export default connect (mapStateToProps)(NewSagaForm);
