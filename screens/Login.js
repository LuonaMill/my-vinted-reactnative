import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

import axios from "axios";
import TopNavBar from "../components/TopNavBar";
import LgBlueButton from "../components/LgBlueButton";
import LgWhiteButton from "../components/LgWhiteButton";
import { spacing } from "../src/utils/sizes";
import { TextInput } from "react-native-paper";

export default function Login({ userToken, setToken, userId, setId }) {
  const { styles } = useStyle();
  const navigation = useNavigation();

  const [email, setEmail] = useState("laurine4@mail.com");
  const [password, setPassword] = useState("blabla");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("Merci de remplir tous les champs");
    } else {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }
      try {
        const response = await axios.post(
          `${process.env.VINTED_BACKEND}/user/login`,
          {
            email,
            password,
          }
        );
        console.log(response.data);
        if (response.data.token && response.data._id) {
          setToken(response.data.token);
          setId(response.data._id);
          alert("All good");
        } else {
          setErrorMessage("Une erreur est survenue, merci de réessayer");
        }
      } catch (error) {
        alert(error.response);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {!userToken && (
        <KeyboardAwareScrollView>
          <TopNavBar pageTitle="Connecte-toi" goBack />
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerView}>
              <View style={styles.centeredZone}>
                <View style={styles.centeredZone}>
                  <TextInput
                    label=" "
                    placeholder="Adresse email"
                    style={styles.input}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={(input) => {
                      setEmail(input);
                    }}
                  />
                  <TextInput
                    label=" "
                    placeholder="Mot de passe"
                    value={password}
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(input) => {
                      setPassword(input);
                    }}
                    secureTextEntry
                  />
                </View>
                <View style={styles.centeredZone}>
                  <Text>{errorMessage}</Text>
                  <TouchableOpacity onPress={handleSubmit}>
                    <LgBlueButton title="Se connecter" />
                  </TouchableOpacity>

                  <LgWhiteButton
                    title="S'inscrire"
                    border={true}
                    destination="Signup"
                  />
                  <LgWhiteButton
                    title="Retourner à l'accueil"
                    border={true}
                    destination="HomeLogin"
                  />
                  <LgWhiteButton
                    title="Tu as oublié ton mot de passe ?"
                    border={false}
                    destination={null}
                  />
                </View>
              </View>
              <View style={styles.centeredZone}>
                <LgWhiteButton title="Un problème ?" border={false} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
}
const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: "white",
      flex: 1,
      width: dimensions.width,
    },
    container: {
      height: dimensions.height * 0.9,
      paddingTop: spacing.sm,
    },
    containerView: {
      height: "90%",
      justifyContent: "space-between",
    },
    centeredZone: {
      alignItems: "center",
      marginTop: spacing.sm,
      marginBottom: spacing.sm,
    },

    input: {
      height: 50,
      width: dimensions.width * 0.9,
      borderBottomColor: "#E5E5E5",
      borderBottomWidth: 1,
      backgroundColor: "white",
    },
  });
  return { styles };
};
