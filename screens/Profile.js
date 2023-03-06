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
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// Dans cette page, je souhaite récupérer les infos de profil

export default function Profile({ userId, setToken }) {
  const navigation = useNavigation();
  const [askForConfirmation, setAskForConfirmation] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMessage(null);
        const response = await axios.get(
          `http://localhost:4002/user/${userId}`
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
        <ActivityIndicator />
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
              <Text style={styles.titleText}>{userData.account.username}</Text>
              {counter === 0 ? (
                <Text style={styles.subtitleText}>Pas d'annonce en ligne</Text>
              ) : (
                <Text style={styles.subtitleText}>
                  {counter} annonces en ligne
                </Text>
              )}
            </View>
          </LinearGradient>

          <KeyboardAwareScrollView></KeyboardAwareScrollView>
          <View>
            <Text>Bienvenue sur ton profil {userData.account.username}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setAskForConfirmation(true);
            }}
            style={styles.opacityButton}
          >
            <Text>Se déconnecter</Text>
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

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
    width: windowWidth,
    height: windowHeight * 0.3,
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
    top: (windowHeight * 0.3 - 150) / 2,
    left: (windowWidth - 150) / 2,
    alignItems: "center",
    gap: spacing.sm,
  },
  titleText: {
    color: "white",
    fontSize: 19,
    fontFamily: "VintedFont",
  },
  subtitleText: {
    color: "white",
    fontSize: 15,
    fontFamily: "VintedFont",
  },
});
