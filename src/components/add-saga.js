import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import moment from 'moment';
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
    super (props);
    this.handleClick = this.handleClick.bind(this);
  };

  componentWillUnmount() {
    this.props.dispatch(
      actions.cleanSagaError()
    )
  };

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
  };

  renderAlert (){
    if(this.props.errorMessage){
      return(
        <div className = "alert alert-danger alertAddForm">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  };

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

    var styleForButton = {
      paddingTop: '5%'
    }

    var styleForTitleAndImage = {
      textAlign: 'webkitCenter'
    }

    var saga = this.props.params.id ? this.props.saga : blankSaga;
    let formatedDate = this.props.params.id ? moment.parseZone(saga.date).format('YYYY-MM-DD') : '';

    return (
      <div className="jumbotron addSagaSection">
        <div className="styleForTitleAndImage">
          <Col>
            <h1 className=" text-center">Saga telling space</h1>
            <br/>
            <br/>
          </Col>
        </div>
          <div className="styleForTitleAndImage">
            <Col >
              <div>
                <PhotoUpload defaultValue={this.id}/>
              </div>
            </Col>
          </div>
          <br/>
          <Form horizontal className="addSagaForm">
            <FormGroup className="addSagaFormContainer"  controlId="formHorizontalText">
              <Row>
                <Col >
                  <label>What name/title would best describe your saga?</label>
                  <FormControl ref = {ref => this.title = ref} type="text" placeholder="Ex. The Remotest" defaultValue={saga.title} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="addSagaFormContainer"  controlId="formHorizontalText">
              <Row>
                <Col>
                  <label>Who were you with?</label>
                  <FormControl ref = {ref => this.people = ref} type="text" placeholder="Ex. Gabriel and Igor" defaultValue={saga.people}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="addSagaFormContainer"  controlId="formHorizontalText">
              <Row>
                <Col>
                  <label>When?</label>
                  <FormControl ref = {ref => this.date = ref} type="date" placeholder="Ex. 11/24/2016" defaultValue={formatedDate}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="addSagaFormContainer"  controlId="formHorizontalText">
              <Row>
                <Col>
                <label>In what National Park or landmark?</label>
                  <FormControl ref = {ref => this.landmark = ref} type="text" placeholder="Ex. Getu" defaultValue={saga.landmark}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="addSagaFormContainer"  controlId="formHorizontalText">
              <Row>
                <Col>
                  <label>In what State/Province?</label>
                  <FormControl ref = {ref => this.state = ref} type="text" placeholder="Ex. Getu" defaultValue={saga.state}/>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="addSagaFormContainer"  controlId="formHorizontalText">
              <Row>
                <Col>
                  <label>In what country?</label>
                  <FormControl ref = {ref => this.country = ref} type="text" placeholder="Ex. China" defaultValue={saga.country}/>
                </Col>
              </Row>
            </FormGroup>

             <FormGroup className="addSagaFormContainer"  controlId="formControlsTextarea">
              <Row>
                <Col>
                  <label>What happened?</label>
                  <FormControl ref = {ref => this.story = ref} componentClass="textarea" placeholder="Here is where you give a summary of your adventure of the whole story. It can be as short or long as you want!" defaultValue={ saga.story}/>
                </Col>
              </Row>
          </FormGroup>
          <div style={styleForButton}>
            <Col className="addSagaFormContainer">
              {this.renderAlert()}
              <Button className="btn-warning btn-lg center-block" onClick = {this.handleClick}>
                Add my saga
              </Button>
            </Col>
          </div>
        </Form>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  saga: state.app.selectedSaga,
  errorMessage: state.app.error,
  imageName: state.app.imageName
});

export default connect (mapStateToProps)(NewSagaForm);
