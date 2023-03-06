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

export default function Input({ title, type, placeholder, lines }) {
  const { styles } = useStyle();

  return (
    <View style={styles.inputView}>
      {title && <Text style={styles.inputTitle}>{title}</Text>}
      <TextInput
        placeholder={placeholder}
        multiline={true}
        numberOfLines={lines > 1 && lines}
        keyboardType={
          type === "email"
            ? "email-address"
            : type === "number"
            ? "numeric"
            : "default"
        }
        style={styles.input}
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
