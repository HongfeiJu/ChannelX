/*
Description: passcode generator testing
Authors: Hongfei Ju
Date: 10/14/2019
*/
import PasscodeGenerator from "./PasscodeGenerator";

test('should generate one string', ()=>{
    console.log((new PasscodeGenerator()).generateOnetimePasscode());
});


