import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SagaList from '../components/saga-list';
import Scrollchor from 'react-scrollchor';

import Footer from '../components/footer';

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
    var sectionStyle = {
      fontSize:'35px'
    };

     return (
        <div className="site-wrapper">

        <div className="gallery gallery-size =">
          <div className="gallery-image gallery-size">
            <img src="/images/cover4.jpg" className="gallery-size" />

              <div className="gallery-text">
                <h3 className="sloganText" style={sectionStyle}>Live the adventure, save it, share it.</h3>
                <Scrollchor to="#mainSection" animate={{duration: 2000}}><div className="btn btn-lg btn-warning learnMoreButton ">Learn more</div></Scrollchor>
              </div>
          </div>
        </div>

          <div className="site-wrapper-inner">

              <div className= "jumbotron vertical-center sagaSection" id="mainSection">
                <hr className="featurette-divider"  />
                <div className="row featurette">
                  <h1 className="title1Home featurette-heading text-center" > Join a global community of outdoor lovers who share their adventures every day</h1>
                  <div className="col-xs-12 col-md-12">
                    <br/>
                  <div><SagaList correctSagas={this.props.sagas}/></div>
                </div>
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
