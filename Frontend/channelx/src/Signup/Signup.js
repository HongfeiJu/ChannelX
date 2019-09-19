import React from 'react';

const signup = () => {
    return (
        <div className="FormCenter">
            <div className="FormTitle">
                <p>sign up</p>
            </div>
            <form className="FormFields">          
                <form className="FormField">
                <input 
                    type="email" 
                    id="email" 
                    className="FormField__input" 
                    placeholder="email" 
                    name="email"></input>
            </form>
            <form className="FormField">
                <input 
                    type="phone" 
                    id="phone" 
                    className="FormField__input" 
                    placeholder="phone" 
                    name="phone"></input>
            </form>
            <form className="FormField">
                <input 
                    type="text" 
                    id="username" 
                    className="FormField__input" 
                    placeholder="username" 
                    name="username"></input>
                </form>
            <form className="FormField">
                <input 
                    type="password" 
                    id="password" 
                    className="FormField__input" 
                    placeholder="password" 
                    name="password"></input>
            </form>
            <form className="FormField">
                <input 
                    type="password" 
                    id="passwordConfirm" 
                    className="FormField__input" 
                    placeholder="input password again" 
                    name="passwordConfirm"></input>
            </form>
            <form className="FormField">
                <button 
                    className="FormField__Button mr-20" 
                >Sign up</button>
            </form>
        </form>
      </div>
    );
};

export default signup;