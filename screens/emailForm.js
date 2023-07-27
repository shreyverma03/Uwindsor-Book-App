
import React, { useState } from "react";
import { TextInput, SafeAreaView, TouchableHighlight, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { sendEmail } from './sendEmail';

const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');

const EmailForm = ({ route }) => {
   const [email, setEmail] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   
   const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
    }
   const handleSubmit = async (email) => {
       try {
           const isValid = await validate(email);
           const body = `${route.params.item?.pnx.display.title}`
           if (isValid) {
               setErrorMessage("");
               sendEmail(email, "Book Details", body).then(() => {
                console.log('Your message was successfully sent!');
            });;
               console.log("SUBMITTED! ", email);
           } else {
               setErrorMessage("INVALID EMAIL.PLEASE CHECK YOUR INPUT AND TRY AGAIN.");
               console.log("EMAIL WAS INVALID.", email);
           }
           return isValid;
       } catch (error) {
           setErrorMessage("SOMETHING WENT WRONG.PLEASE TRY AGAIN LATER.");
       }
   }
  return (
    <SafeAreaView>
          <TextInput
              style={styles.emailInput}
          onChangeText={(e) => setEmail(e.target.value)}
          value={email}
      />
      <TouchableHighlight onPress={handleSubmit} style={styles.button}>
         <Text>Submit</Text>
      </TouchableHighlight>
       <Text>{errorMessage}</Text>
   </SafeAreaView>
  )
}
const styles = StyleSheet.create({
   emailInput: {
       width: 250,
       height: 250,
     borderWidth: 1,
     borderColor: 'black',
   },
   button: {
       borderWidth: 1,
       borderColor: 'green',
       borderRadius: 15,
       marginTop: 25,
       padding: 10,
       alignItems: 'center'
   },
});

export default EmailForm;