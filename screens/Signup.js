import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";

export default function Signup() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.fullyCentered}>
        <Text>Here is Signup screen</Text>
        <Text>If you already have an account, please login</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.opacityButton}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "pink",
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
});
