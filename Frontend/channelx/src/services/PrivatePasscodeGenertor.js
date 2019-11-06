/*
description: generate private passcode
author: Hongfei Ju
date: 11/04/2019
 */

import firebase from "firebase";

class PrivatePasscodeGenerator{

    generatePrivatePasscode(channelID){
        return firebase.database().ref('privatePasscodes/').once('value', (r)=>{
            console.log(r.val());
            const passcodes = Object.keys(r.val());
            const years = ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', ],
                colors = ['Red', 'Blue', 'Yellow', 'Orange', 'Green', 'Purple', 'Black', 'Gold', 'white', 'Silver'],
                brands = ['Honda', 'Toyota', 'Nissan', 'Chevrolet', 'Ford', 'Jeep', 'Audi', 'Benz', 'BMW', 'Fiat'],
                fuels = ['Gas', 'Electric', 'Hybrid'],
                types = ['Coupe', 'Hatchback', 'Minivan', 'Offroad', 'Pickup', 'Sedan', 'Truck', 'Suv','Wagon', 'Van'];
            let nextPasscode = years[Math.floor(Math.random()*colors.length)]
                +colors[Math.floor(Math.random()*colors.length)]
                +brands[Math.floor(Math.random()*brands.length)]
                +fuels[Math.floor(Math.random()*fuels.length)]
                +types[Math.floor(Math.random()*types.length)];
            while(passcodes.includes(nextPasscode)){
                nextPasscode = years[Math.floor(Math.random()*colors.length)]
                    +colors[Math.floor(Math.random()*colors.length)]
                    +brands[Math.floor(Math.random()*brands.length)]
                    +fuels[Math.floor(Math.random()*fuels.length)]
                    +types[Math.floor(Math.random()*types.length)];
            }
            alert('generate '+nextPasscode);
            firebase.database().ref('privatePasscodes/'+nextPasscode).set(channelID)
                .then(r=>{
                    alert(nextPasscode+" is added to "+channelID)
                });
            return nextPasscode;
        })
    }
}

export default PrivatePasscodeGenerator;
