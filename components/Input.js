import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { colors } from "../src/utils/colors";
import { useState } from "react";

export default function Input({ title, type, placeholder, lines, setState }) {
  const { styles } = useStyle();
  //   const [setState, setSetState] = useState();

  return (
    <View style={styles.inputView}>
      {title && <Text style={styles.inputTitle}>{title}</Text>}
      <TextInput
        placeholder={placeholder}
        keyboardType={
          type === "email"
            ? "email-address"
            : type === "number"
            ? "numeric"
            : "default"
        }
        style={styles.input}
        onChangeText={(input) => setState(input)}
        autoCapitalize="none"
      />
    </View>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    inputView: {
      width: dimensions.width,
      borderBottomColor: colors.vLightestGrey,
      borderBottomWidth: 1,
      padding: 20,
    },
    input: {
      width: dimensions.width * 0.9,
      borderBottomColor: colors.vLighterGrey,
      borderBottomWidth: 1,
      backgroundColor: "white",
      padding: 10,
    },
    inputTitle: {
      fontFamily: "VintedFont",
      fontSize: 16,
      lineHeight: 18,
      color: colors.vDarkestGrey,
    },
  });
  return { styles };
};
