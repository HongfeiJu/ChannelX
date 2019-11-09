/*
description: generate passcode
author: Hongfei Ju
date: 10/14/2019
 */

class PasscodeGenerator{
    generateOnetimePasscode(){
        const colors = ['Red', 'Blue', 'Gold', 'Teal', 'Navy', 'Lime', 'Cyan', 'Grey', 'Pink', 'Mint', 'Plum', 'Pear'],
            animals = ['Pig', 'Snake', 'Shark', 'Bird', 'Bear', 'Fish', 'Cat', 'Dog'];
        return colors[Math.floor(Math.random()*colors.length)]+animals[Math.floor(Math.random()*animals.length)]
    }
}

export default PasscodeGenerator;
