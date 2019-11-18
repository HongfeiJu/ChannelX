import React from 'react';
import './AboutUs.css';



class AboutUs extends React.Component {



    render(){
        return (
            <div className="aboutus">
            <div className="ct-pageWrapper" id="ct-js-wrapper">
            <section className="company-heading intro-type company-sections" id="parallax-one">
                <div className="container text-center">
                    <h2>About Us</h2>
                    <div className="red-border"></div>
                    
                    <p className="ct-u-size22 ct-u-fontWeight300 marginTop40">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed libero vel ex maximus vulputate nec eu ligula. Vestibulum elementum nisi ut fermentum lobortis. Sed quis iaculis felis.</p>
                    
                </div>
            </section>
           
            <section className="culture-section company-sections ct-u-paddingBoth100 paddingBothHalf noTopMobilePadding">
                <div className="container text-center">
                    <div className="row">
                    
                    </div>
                    <h2>Technical Team</h2>
                    <p className="ct-u-size22 ct-u-fontWeight300 ct-u-marginBottom60">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                    Praesent sed libero vel ex maximus vulputate nec eu ligula. Vestibulum elementum nisi ut fermentum lobortis.
                    </p>
                <div className="row ct-u-paddingBoth20">
                    <div className="col-xs-6 col-md-4">
                    <div className="company-icons-white">
                        <i className="fa fa-medkit" aria-hidden="true"></i>
                        <p>Darshan Prakash</p>
                        <p className="company-icons-subtext hidden-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    </div>
                    <div className="col-xs-6 col-md-4">
                    <div className="company-icons-white">
                        <i className="fa fa-money" aria-hidden="true"></i>
                        <p>Hongfei Ju</p>
                        <p className="company-icons-subtext hidden-xs">Praesent sed libero vel ex maximus vulputate nec eu ligula.</p>
                    </div>
                    </div>
                    <div className="col-xs-6 col-md-4">
                    <div className="company-icons-white">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        <p>Manisha</p>
                        <p className="company-icons-subtext hidden-xs">Vestibulum elementum nisi ut fermentum lobortis.</p>
                    </div>
                    </div>
                </div>
                <div className="row ct-u-paddingBoth20 text-center">
                <div className="col-xs-6 col-md-4">
                    <div className="company-icons-white">
                        <i className="fa fa-medkit" aria-hidden="true"></i>
                        <p>Muhammad Sami</p>
                        <p className="company-icons-subtext hidden-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    </div>
                    <div className="col-xs-6 col-md-4">
                    <div className="company-icons-white">
                        <i className="fa fa-money" aria-hidden="true"></i>
                        <p></p>
                        <p className="company-icons-subtext hidden-xs"></p>
                    </div>
                    </div>
                    <div className="col-xs-6 col-md-4">
                    <div className="company-icons-white">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        <p>Subhradeep Biswas</p>
                        <p className="company-icons-subtext hidden-xs">Vestibulum elementum nisi ut fermentum lobortis.</p>
                    </div>
                    </div>
                    
                </div>
                
                </div>
            </section>
            
            </div>
            
            </div>
        );
    }

}


export default AboutUs;

