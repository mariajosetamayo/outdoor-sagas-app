import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SagaList from '../components/saga-list';
import Scrollchor from 'react-scrollchor';

import Footer from '../components/footer';

 class Home extends Component{
   constructor(props){
     // console.log('these are the props in the map', props)
     super(props)
   }

   componentDidMount(){
     this.props.dispatch(
       actions.fetchAllSagas()
     )
    //  this.props.dispatch(
    //    actions.fetchUserId()
    //  )
   }

   render (){
    var sectionStyle = {
      height: '130%',
      position: 'absolute',
      width: '100%',
      backgroundImage: "url('./images/cover4.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: '60% 60%',
      backgroundRepeat: 'no-repeat',
    };

     return (
        <div className="site-wrapper responsive-image coverPhoto" style={sectionStyle}>
          <div className="site-wrapper-inner">
            <div className="cover-container" >
              <div className="inner cover">
                <h1 className="cover-heading container slogan">Live the adventure, save it, share it. </h1>
                <p className="lead "></p>
                <Scrollchor to="#mainSection" animate={{duration: 2000}}><div className="btn btn-lg btn-warning learnMoreButton ">Learn more</div></Scrollchor>
              </div>
            </div>
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
 }

 function mapStateToProps(state){
   return {
     sagas:state.app.allSagas,
    //  userId: state.app.userId
   };
 }

 export default connect (mapStateToProps)(Home);
