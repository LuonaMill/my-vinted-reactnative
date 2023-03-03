import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";

export default function Login() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.fullyCentered}>
        <Text>Here is Login Screen</Text>
        <Text>If you don't have an account yet, please sign up</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={styles.opacityButton}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Tab");
        }}
        style={styles.opacityButton}
      >
        <Text>Go to Home screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "grey",
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
  fullyCentered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
