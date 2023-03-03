import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useCallback } from "react";
import Constants from "expo-constants";
import logo from "../assets/logo.png";
import mainPicture from "../assets/image1.png";

SplashScreen.preventAutoHideAsync();

export default function HomeLogin() {
  const { height, width } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    VintedFont: require("../assets/fonts/VintedFont.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaView} onLayout={onLayoutRootView}>
      <View style={[styles.header, { width: width }]}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={[styles.mainZone, { width: width, height: height * 0.9 }]}>
        <View>
          <Image
            source={mainPicture}
            style={[styles.mainPicture, { width: width }]}
          />
        </View>
        <View>
          <View>
            <Text>
              Vends sans frais ce que tu ne portes plus. Rejoins-nous !
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnPrimary}>
              <Text style={styles.textPrimary}>S'inscrire sur Vinted</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnReversePrimary}>
              <Text style={styles.textReversePrimary}>J'ai déjà un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-start",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  logo: {
    width: 100,
    height: 50,
    margin: 10,
    resizeMode: "contain",
  },
  mainZone: {
    justifyContent: "space-evenly",
    backgroundColor: "pink",
  },
  mainPicture: {
    height: 300,
    resizeMode: "contain",
  },
  btnPrimary: {
    backgroundColor: "#09B1BA",
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textPrimary: {
    color: "white",
    fontSize: 20,
  },
  btnReversePrimary: {
    borderColor: "#09B1BA",
    borderWidth: 1,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    fontFamily: Platform.OS === "ios" ? "VintedFont" : "VintedFont.ttf",
  },
  textReversePrimary: {
    color: "#09B1BA",
    fontSize: 20,
  },
});
