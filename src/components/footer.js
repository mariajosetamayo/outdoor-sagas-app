import React, {Component} from 'react';

export default class Footer extends Component {
  render (){
    var sectionStyle={
      paddingTop: '13%',
      backgroundColor: '#292929'
    }
    return(
      <div className="mastfoot" style={sectionStyle} >
        <div className="inner text-center">
          <p className="footer">All rights reserved. Outdoor-Sagas by  <a href="https://github.com/mariajosetamayo">Maria Jose Tamayo</a>.</p>
        </div>
      </div>
    )
  };
};
