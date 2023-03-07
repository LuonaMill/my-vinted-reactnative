import {
  Image,
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
import * as ImagePicker from "expo-image-picker";

export default function Signup({ setToken, setId, userToken }) {
  const navigation = useNavigation();
  const { styles } = useStyle();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.canceled === true) {
        alert("Vous n'avez pas sélectionné d'image");
      } else {
        setPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      const uri = picture;
      const uriParts = uri.split(".");
      const fileType = uriParts[1];

      const formData = new FormData();
      formData.append("avatar", {
        uri,
        name: `avatarPicture`,
        type: `image/${fileType}`,
      });
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsletter);

      console.log(fileType);
      console.log(uri);

      if (email && username && password) {
        const response = await axios.post(
          "http://localhost:4002/user/signup",
          formData
        );
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
    <SafeAreaView style={styles.safeAreaView}>
      {!userToken && (
        <KeyboardAwareScrollView>
          <TopNavBar pageTitle="Inscris-toi" goBack />
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerView}>
              <View style={styles.centeredZone}>
                <View>
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
                <View style={styles.pictureZone}>
                  {picture ? (
                    <>
                      <View>
                        <TouchableOpacity
                          style={styles.pictureSubzone}
                          onPress={getPermissionAndGetPicture}
                        >
                          <Text style={styles.vintedFont16Blue}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.pictureSubzone}
                          onPress={() => {
                            setPicture(null);
                          }}
                        >
                          <Text style={styles.vintedFont16Blue}>Supprimer</Text>
                        </TouchableOpacity>
                      </View>
                      <Image
                        style={styles.imgSize}
                        source={{ uri: `${picture}` }}
                      />
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.picturesZone}
                      onPress={getPermissionAndGetPicture}
                    >
                      <LgWhiteButton
                        title="+ Ajouter une photo de profil"
                        border={true}
                      />
                    </TouchableOpacity>
                  )}
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

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: "white",
      width: dimensions.width,
      flex: 1,
    },

    container: {
      height: dimensions.height * 0.9,
      paddingTop: spacing.sm,
    },
    containerView: {
      justifyContent: "space-between",
      alignItems: "center",
    },

    centeredZone: {
      width: dimensions.width * 0.9,
      justifyContent: "center",
      marginTop: spacing.sm,
      marginBottom: spacing.sm,
    },

    paddingZone: {
      maxWidth: dimensions.width * 0.9,
      padding: spacing.md,
      gap: spacing.sm,
    },

    pictureZone: {
      width: dimensions.width * 0.9,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
      gap: 40,
      // borderBottomColor: colors.vLightGrey,
      // borderBottomWidth: 1,
    },
    pictureSubzone: {
      maxWidth: dimensions.width * 0.9,
      padding: 20,
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
      borderBottomColor: colors.vLightestGrey,
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
    vintedFont16Blue: {
      fontFamily: "VintedFont",
      fontSize: 16,
      color: colors.vBlue,
    },

    btnReversePrimary: {
      borderColor: colors.vBlue,
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
    imgSize: {
      height: 120,
      width: 120,
      marginRight: 10,
    },
  });
  return { styles };
};
