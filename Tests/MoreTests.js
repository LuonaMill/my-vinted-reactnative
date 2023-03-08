import React from "react";
import { useWindowDimensions, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../src/utils/colors";
import { TextInput } from "react-native";
import { TextInput as Input } from "react-native-paper";
import CustomText from "../components/CustomText";
import ArticleCard from "../components/ArticleCard";

function App() {
  const { styles } = useStyle();

  return (
    <View style={styles.container}>
      <CustomText text="Mon texte" />
      <Input
        placeholder="test"
        keyboardType="email-address"
        label="Test"
        style={styles.input}
        mode="flat"
      />
      <TextInput
        placeholder="test"
        label="Test"
        multiline={true}
        numberOfLines={50}
        style={styles.input}
      />
      {/* <LinearGradient
        colors={[colors.vBlue, colors.vLightBlue]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0 }}
      >
        <Text>Vertical Gradient</Text>
      </LinearGradient> */}
    </View>
  );
}
const useStyle = () => {
  const dimensions = useWindowDimensions();
  // console.log("Logging dimensions", dimensions);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    linearGradient: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      height: 200,
      width: 350,
    },
    input: {
      width: dimensions.width * 0.9,
      borderColor: colors.vBlue,
      borderWidth: 1,
      // backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
    },
  });
  return { styles };
};

export default App;
