import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import logo from "../assets/logo.png";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Image source={logo} />
        <ActivityIndicator color="#09B1BA" size="large" />
      </View>
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
});
