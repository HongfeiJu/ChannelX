import React from 'react';
Class LandingPage extends React.Component {

onClickMethod = () => {
console.log('Registration is clicked.');
}

const landing = () => {
    return (
        <div>
            Welcome to ChannelX
        </div>
        <a href="#" onClick={onClickMethod}>
      	Register
    	</a>
    );
};
}
export default landing;