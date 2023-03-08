import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import { fontSizes, spacing } from "../src/utils/sizes";
import { colors } from "../src/utils/colors";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import profilePicture from "../assets/photoprofil.jpeg";
import LgWhiteButton from "../components/LgWhiteButton";
import CustomText from "../components/CustomText";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Dans cette page, je souhaite récupérer les infos de profil

export default function Profile({ userId, setToken }) {
  const navigation = useNavigation();
  const { styles } = useStyle();
  const [askForConfirmation, setAskForConfirmation] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [avatar, setAvatar] = useState([]);

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
        setAvatar(result.assets[0].uri);
        console.log(avatar);
      }
    } else {
      alert("Permission refusée");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMessage(null);
        const response = await axios.get(
          `https://site--backend-vinted--wbbmf4gr4bwy.code.run/user/${userId}`
        );
        console.log(response.data);
        if (response.data) {
          setUserData(response.data.user);
          setCounter(response.data.counter);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage("Oups, quelque chose ne s'est pas passé comme prévu");
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <>
          <ActivityIndicator />
          <Text>{userId}</Text>
        </>
      ) : (
        <ScrollView>
          <LinearGradient
            colors={[colors.vBlue, colors.vLightBlue]}
            style={styles.avatarZone}
            start={{ x: 0.7, y: 0 }}
          >
            <MaterialIcons
              name="keyboard-backspace"
              size={fontSizes.xl}
              color={colors.vLightest2Grey}
            />
            <View style={styles.userPosition}>
              <Image source={profilePicture} style={styles.imgSize} />
              <CustomText
                color="white"
                size={19}
                text={userData.account.username}
              />
              <CustomText
                color="white"
                text={
                  !counter
                    ? "Pas d'annonce en ligne"
                    : counter === 1
                    ? "1 annonce en ligne"
                    : `${counter} annonces en ligne`
                }
              />
              <TouchableOpacity
                style={[styles.whiteAndCenter, styles.cameraImg]}
              >
                <Ionicons
                  name="camera-outline"
                  size={26}
                  color={colors.vDarkerGrey}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.whiteAndCenter, styles.galleryImg]}
                onPress={getPermissionAndGetPicture}
              >
                <Ionicons
                  name="ios-folder-open-outline"
                  size={24}
                  color={colors.vDarkerGrey}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <KeyboardAwareScrollView>
            <View style={styles.mainView}>
              <CustomText
                text={`Bienvenue sur ton profil ${userData.account.username}`}
                color={colors.vDarkestGrey}
                size={24}
                textAlign="center"
              />

              <TouchableOpacity
                onPress={(event) => {
                  event.stopPropagation();
                  setAskForConfirmation(true);
                }}
                style={styles.opacityButton}
              >
                <LgWhiteButton title="Se déconnecter" border={true} />
              </TouchableOpacity>
              {askForConfirmation && (
                <>
                  <Text>Etes-vous sûr de vouloir vous déconnecter ?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setToken(null);
                    }}
                    style={styles.opacityButton}
                  >
                    <Text>Oui</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setAskForConfirmation(false);
                    }}
                    style={styles.opacityButton}
                  >
                    <Text>Non</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
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
    avatarZone: {
      width: dimensions.width,
      height: dimensions.height * 0.3,
      backgroundColor:
        "linear-gradient(209.69deg, #09B1BA 18.16%, rgba(9, 177, 186, 0.36) 85.56%);",
    },
    imgSize: {
      height: 120,
      width: 120,
      borderRadius: 60,
    },
    userPosition: {
      position: "absolute",
      top: (dimensions.height * 0.3 - 150) / 2,
      left: (dimensions.width - 150) / 2,
      alignItems: "center",
      gap: spacing.sm,
    },

    whiteAndCenter: {
      height: 35,
      width: 35,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      borderRadius: 17.5,
    },
    cameraImg: {
      position: "absolute",
      left: 120,
    },
    galleryImg: {
      position: "absolute",
      top: 50,
      left: 120,
    },
    mainView: {
      width: dimensions.width,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles };
};
