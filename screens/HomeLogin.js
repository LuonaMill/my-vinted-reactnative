import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import logo from "../assets/logo.png";
import mainPicture from "../assets/image1.png";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../src/utils/colors";

export default function HomeLogin() {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
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
        <View style={styles.mainZoneBottom}>
          <View>
            <Text style={styles.mainText}>
              Vends sans frais ce que tu ne portes plus.
            </Text>
            <Text style={styles.mainText}>Rejoins-nous !</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnPrimary}>
              <Text
                style={styles.textPrimary}
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                S'inscrire sur Vinted
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnReversePrimary}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.textReversePrimary}>J'ai déjà un compte</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.lightGrayText}>A propos de Vinted : </Text>
              <Text style={styles.darkGrayText}>Notre plateforme </Text>
            </View>
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
    // borderBottomColor: "#E5E5E5",
    borderBottomColor: colors.vLightestGrey,
    borderBottomWidth: 1,
  },
  logo: {
    width: 100,
    height: 50,
    margin: 10,
    resizeMode: "contain",
  },
  mainZone: {
    justifyContent: "space-evenly",
    // backgroundColor: "pink",
  },
  mainPicture: {
    height: 300,
    resizeMode: "contain",
    marginTop: 30,
  },
  mainText: {
    fontSize: 32,
    textAlign: "center",
    color: colors.vDarkestGrey,
    marginLeft: 20,
    fontFamily: "VintedFont",
  },
  mainZoneBottom: {
    height: "45%",
    // backgroundColor: "yellow",
    justifyContent: "space-between",
    padding: 20,
  },

  btnPrimary: {
    backgroundColor: colors.vBlue,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textPrimary: {
    color: "white",
    fontSize: 20,
    fontFamily: "VintedFont",
  },
  btnReversePrimary: {
    borderColor: colors.vBlue,
    borderWidth: 1,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    fontFamily: Platform.OS === "ios" ? "VintedFont" : "VintedFont.ttf",
  },
  textReversePrimary: {
    color: colors.vBlue,
    fontSize: 20,
    fontFamily: "VintedFont",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  darkGrayText: {
    color: colors.vDarkerGrey,
    fontFamily: "VintedFont",
  },
  lightGrayText: {
    color: colors.vLightGrey,
    fontFamily: "VintedFont",
  },
});
