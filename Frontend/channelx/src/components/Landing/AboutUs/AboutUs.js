import React from 'react';
import './AboutUs.css';

class AboutUs extends React.Component {
    render() {
        return (
            <div className="aboutus">
                <div className="ct-pageWrapper" id="ct-js-wrapper">
                    <section className="company-heading intro-type company-sections" id="parallax-one">
                        <div className="container text-center">
                            <h2>About Us</h2>
                            <div className="red-border"></div>
                            <p className="ct-u-size22 ct-u-fontWeight300 marginTop40">We are Software Engineering
                                graduate students at Arizona State University. We have developed the ChannelX application as
                                our final semester capstone project. </p>
                        </div>
                    </section>
                    <section
                        className="culture-section company-sections ct-u-paddingBoth100 paddingBothHalf noTopMobilePadding">
                        <div className="container text-center">
                            <div className="row">
                            </div>
                            <h2>Technical Team</h2>
                            <p className="ct-u-size22 ct-u-fontWeight300 ct-u-marginBottom60">
                            </p>
                            <div className="row ct-u-paddingBoth20">
                                <div className="col-xs-6 col-md-4">
                                    <div className="company-icons-white">
                                        <i className="fa fa-medkit" aria-hidden="true"></i>
                                        <p><b><u>Darshan Prakash</u></b></p>
                                        <p className="company-icons-subtext hidden-xs"><i>
                                            Software engineer interested in developing and engineering web applications.
                                        </i></p>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="company-icons-white">
                                        <i className="fa fa-money" aria-hidden="true"></i>
                                        <p><b><u>Hongfei Ju</u></b></p>
                                        <p className="company-icons-subtext hidden-xs"><i>The lead frontend developer of
                                            ChannelX team.</i></p>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="company-icons-white">
                                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                                        <p><b><u>Manisha</u></b></p>
                                        <p className="company-icons-subtext hidden-xs"><i>A dedicated developer in both
                                            frontend and backend of ChannelX web app.</i></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row ct-u-paddingBoth20 text-center">
                                <div className="col-xs-6 col-md-4">
                                    <div className="company-icons-white">
                                        <i className="fa fa-medkit" aria-hidden="true"></i>
                                        <p><b><u>Muhammad Sami</u></b></p>
                                        <p className="company-icons-subtext hidden-xs"><i>A dependable developer and
                                            Scrum Master of our team.</i></p>
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
                                        <p><b><u>Subhradeep Biswas</u></b></p>
                                        <p className="company-icons-subtext hidden-xs"><i>A developer and Scrum Master
                                            of ChannelX team.</i></p>
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
