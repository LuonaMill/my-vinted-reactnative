import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TopNavBar from "../components/TopNavBar";
import LgBlueButton from "../components/LgBlueButton";
import LgWhiteButton from "../components/LgWhiteButton";
import { colors } from "../src/utils/colors";
import { spacing } from "../src/utils/sizes";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Signup({ setToken, setId, userToken }) {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      if (email && username && password) {
        const response = await axios.post("http://localhost:4002/user/signup", {
          username,
          email,
          password,
          newsletter,
        });
        console.log(response.data._id);
        if (response.data.token && response.data._id) {
          setToken(response.data.token);
          setId(response.data._id);
          alert("All good");
        } else {
          setErrorMessage("Une erreur est survenue");
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Merci de remplir tous les champs");
      } else if (error.response.status === 409) {
        setErrorMessage("Cet email existe déjà parmi nos utilisateurs");
      } else {
        console.log(error.response);
        setErrorMessage("Une erreur est survenue, merci de réessayer");
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeAreaView, { width: width }]}>
      {!userToken && (
        <KeyboardAwareScrollView>
          <TopNavBar pageTitle="Inscris-toi" goBack />
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerView}>
              <View>
                <View style={styles.centeredZone}>
                  <TextInput
                    placeholder="Nom d'utilisateur"
                    style={styles.input}
                    value={username}
                    onChangeText={(input) => {
                      setUsername(input);
                    }}
                  />
                  <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.input}
                    value={email}
                    onChangeText={(input) => {
                      setEmail(input);
                    }}
                  />
                  <TextInput
                    placeholder="Mot de passe"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={(input) => {
                      setPassword(input);
                    }}
                  />
                </View>
                <View style={styles.paddingZone}>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      size={25}
                      fillColor={colors.vBlue}
                      onPress={() => {
                        setNewsletter(!newsletter);
                      }}
                    />

                    <Text>S'inscrire à la newsletter</Text>
                  </View>
                  <Text>
                    En m’inscrivant je confirme avoir lu et accepté les
                    Conditions Générales d’Utilisation et les Politique de
                    Confidentialité de Vintend. Je confirme aussi avoir au moins
                    18 ans.
                  </Text>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              </View>
              <View style={styles.centeredZone}>
                <TouchableOpacity onPress={handleSubmit}>
                  <LgBlueButton title="S'inscrire" />
                </TouchableOpacity>
                <LgWhiteButton
                  title="Se connecter"
                  border={true}
                  destination="Login"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "white",
    // justifyContent: "center",
    width: windowWidth,
    flex: 1,
  },

  container: {
    height: windowHeight * 0.9,
    paddingTop: spacing.sm,
  },
  containerView: {
    // height: "90%",
    justifyContent: "space-between",
  },

  centeredZone: {
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },

  paddingZone: {
    padding: spacing.md,
    gap: spacing.sm,
  },

  opacityButton: {
    height: 40,
    width: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  input: {
    height: 50,
    width: 400,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vintedFont24: {
    fontFamily: "VintedFont",
    fontSize: 24,
  },

  btnReversePrimary: {
    borderColor: "#09B1BA",
    borderWidth: 1,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    fontFamily: "VintedFont",
  },
  errorMessage: {
    fontFamily: "VintedFont",
    fontSize: 14,
    color: "red",
  },
});
