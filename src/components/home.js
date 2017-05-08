import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SagaList from '../components/saga-list';
import Scrollchor from 'react-scrollchor';

import Footer from '../components/footer';
// import AboutOutdoorSagas from '../components/about';

 class Home extends Component{
   constructor(props){
     super(props)
   }

   componentDidMount(){
     this.props.dispatch(
       actions.fetchAllSagas()
     )
   };

   render (){
    const sectionStyle = {
      fontSize:'35px'
    };

    const instructionsDivStyle = {
      margin: '0 auto',
      textAlign: 'left',
      width: '50%',
      paddingTop: '2%'
    }

    const instructionsText = {
      paddingLeft: '2%'
    }

    const paddingForText = {
      paddingTop: '2%'
    }

    const homeTextSize = {
      fontSize: '45px'
    }

    const learnMoreButtonStyle = {
      boxShadow: '#282828 1.5px 1.5px 1.5px'
    }

     return (
        <div className="site-wrapper">

        <div className="gallery gallery-size =">
          <div className="gallery-image gallery-size">
            <img src="/images/cover4.jpg" className="gallery-size" />

              <div className="gallery-text">
                <h3 className="sloganText" style={sectionStyle}>Live the adventure, save it, share it.</h3>
                <Scrollchor to="#mainSection" animate={{duration: 2000}}><div className="btn btn-lg btn-warning learnMoreButton " style={learnMoreButtonStyle}>Learn more</div></Scrollchor>
              </div>
          </div>
        </div>

          <div className="site-wrapper-inner">
              <div className= "jumbotron vertical-center sagaSection" id="mainSection">
                <h1 style={homeTextSize} id="howTitle">How does it work?</h1>
                <p style={paddingForText}>Outdoor Sagas helps you to never forget key details of your adventures in the great outdoors and to get inspired for your next adventure.</p>
                <div style={instructionsDivStyle} className="instructionsDiv">
                  <p><span className = "fa-stack"><i className="fa fa-circle-o fa-stack-2x"></i><strong className = "fa-stack-1x">1</strong></span><span style={instructionsText}>Join Outdoor Sagas.</span></p>
                  <p><span className = "fa-stack"><i className="fa fa-circle-o fa-stack-2x"></i><strong className = "fa-stack-1x">2</strong></span><span style={instructionsText}>Create a new saga and save it.</span></p>
                  <p><span className = "fa-stack"><i className="fa fa-circle-o fa-stack-2x"></i><strong className = "fa-stack-1x">3</strong></span><span style={instructionsText}>Consult sagas of other adventurers<Scrollchor to="#userSagas" animate={{duration: 900}}>    here</Scrollchor></span></p>
                </div>
              </div>
              <div  className= "jumbotron vertical-center sagaSection">
                <hr className="featurette-divider"  />
                <div className="row featurette">
                  <h1 className="title1Home featurette-heading text-center" id="title1Home" style={homeTextSize} > Adventures around the world</h1>
                <div><SagaList correctSagas={this.props.sagas}/></div>
              </div>
            </div>
            <Footer className="footer"/>
          </div>
        </div>
     );
   }
 };

 function mapStateToProps(state){
   return {
     sagas:state.app.allSagas,
   };
 };

 export default connect (mapStateToProps)(Home);
