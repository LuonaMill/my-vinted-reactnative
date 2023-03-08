import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import logo from "../assets/logo.png";
import mainPicture from "../assets/image1.jpg";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../src/utils/colors";

export default function HomeLogin() {
  const { styles } = useStyle();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.mainZone}>
        <View style={styles.centered}>
          <Image source={mainPicture} style={styles.mainPicture} />
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("InfoPlatform");
                }}
              >
                <Text style={styles.darkGrayText}>Notre plateforme </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();

  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      justifyContent: "flex-start",
      borderBottomColor: colors.vLightestGrey,
      borderBottomWidth: 1,
      width: dimensions.width,
    },
    logo: {
      width: 100,
      height: 50,
      margin: 10,
      resizeMode: "contain",
    },
    mainZone: {
      justifyContent: "space-evenly",
      width: dimensions.width,
      height: dimensions.height * 0.9,
    },
    mainPicture: {
      width: dimensions.width * 0.95,
      height: dimensions.height * 0.35,
      resizeMode: "cover",
    },
    centered: {
      alignItems: "center",
    },
    mainText: {
      fontSize: 32,
      textAlign: "center",
      color: colors.vDarkestGrey,
      marginLeft: 20,
      fontFamily: "VintedFont",
    },
    mainZoneBottom: {
      height: "40%",
      // justifyContent: "space-between",
      paddingLeft: 20,
      paddingRight: 20,
      gap: 30,

      // backgroundColor: "pink",
    },

    btnPrimary: {
      backgroundColor: colors.vBlue,
      height: 50,
      marginLeft: 10,
      marginRight: 10,
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
      textDecorationLine: "underline",
    },
    lightGrayText: {
      color: colors.vLightGrey,
      fontFamily: "VintedFont",
    },
  });
  return { styles };
};
