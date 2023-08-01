import React, { useState } from "react";
import {
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { sendEmail } from "./sendEmail";
import { useNavigation } from '@react-navigation/native'; 

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var {width, height} = Dimensions.get('window');
const EmailForm = ({ route }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const validate = (email) => {
  const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    try {
      const isValid = validate(email);
      const body = `Title of book: ${route.params.item?.pnx.display.title}\n\n\nLocation of Book: ${route.params.location}`;

      if (isValid) {
        setErrorMessage("");
        sendEmail(email, "Book Details", body).then(() => {
          console.log("Your message was successfully sent!");
        });
        console.log("SUBMITTED! ", email);
      } else {
        setErrorMessage("INVALID EMAIL. PLEASE CHECK YOUR INPUT AND TRY AGAIN.");
        console.log("EMAIL WAS INVALID.", email);
      }
    } catch (error) {
      console.error("Error sending email:", error); // Log the specific error
      setErrorMessage("SOMETHING WENT WRONG. PLEASE TRY AGAIN LATER.");
    }
  };

  return (

    
   <><View>
          <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
          <View style={styles.topRightContainer}>
              <TouchableOpacity style={{}} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                  <ChevronLeftIcon size="30" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
            </View>
             
          </SafeAreaView>

          <View style={styles.imageContainer}>
              <Image
                  source={require('../assets/download.png')} 
                  style={{ marginTop:100,width, height: height * 0.30 }} />
              
          </View>
      </View><SafeAreaView style={styles.container}>
              <Text className="font-bold" style={ {color: "#60a7db"}}>Enter the email to share the Book Details</Text>

              <View style={styles.content}>
                  
                  <TextInput className="font-bold"
                      style={styles.emailInput}
                      onChangeText={setEmail}
                      value={email}
                      placeholder="Enter your email"
                      placeholderTextColor="#aaa" />
                  {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                      <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
              </View>
          </SafeAreaView></>

   
   
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
        marginTop:100,
        width: '100%',
        height: '60%',
    },
 container: {
        
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        marginTop:60,
      },
    
      content: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",

      },
       
      emailInput: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: "lightblue",
        fontWeight: "900", //
      },
      errorMessage: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
      },
      button: {
        backgroundColor: "#1e90ff",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
      },
      topRightContainer: {
        position: "absolute",
        top: 45,
        left: 20,
        zIndex: 1,
        borderStyle:'solid',
        borderWidth: 2, // Add border width
        borderColor: "#fff", // Add border color
        borderRadius: 15,
        backgroundColor: "#1e90ff", 
      },
});

export default EmailForm;
