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

export default function Profile() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>Here is Profile</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.opacityButton}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={styles.opacityButton}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "blue",
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
