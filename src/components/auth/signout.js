import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component{

  componentWillMount(){
    this.props.signoutUser();
  };

  render(){
    var sectionStyle = {
      height: '100%',
      position: 'absolute',
      width: '100%',
      backgroundImage: "url('./images/cover2.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: '60% 60%',
      backgroundRepeat: 'no-repeat',
    };

    return (
       <div className="site-wrapper responsive-image" style={sectionStyle}>
         <div className="site-wrapper-inner">
           <div className="cover-container" >
             <div className="inner cover">
               <h1 className="cover-heading container slogan">Come back soon!</h1>
               <p className="lead "></p>
             </div>
           </div>
         </div>
       </div>
    );
  };
};

export default connect(null, actions)(Signout);
