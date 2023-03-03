import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

export default function Search() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>Here is Search</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
