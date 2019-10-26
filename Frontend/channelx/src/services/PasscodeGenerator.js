/*
description: generate passcode
author: Hongfei Ju
date: 10/14/2019
 */

class PasscodeGenerator{
    generateOnetimePasscode(){
        const colors = ['Red', 'Blue', 'Yellow', 'Orange', 'Green', 'Purple', 'Black', 'Gold', 'white', 'Silver'],
            animals = ['Pig', 'Snake', 'Shark', 'Bird', 'Bear', 'Fish', 'Chicken', 'Horse', 'Cat', 'Dog'];
        return colors[Math.floor(Math.random()*colors.length)]+animals[Math.floor(Math.random()*animals.length)]
    }
}

export default PasscodeGenerator;
