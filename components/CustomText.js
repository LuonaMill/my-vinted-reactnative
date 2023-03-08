import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import { colors } from "../src/utils/colors";
import React from "react";

export default function CustomText({ text, size, color, textAlign }) {
  const { styles } = useStyle();
  return (
    <Text
      style={{
        fontFamily: "VintedFont",
        fontSize: size,
        color: color,
        textAlign: textAlign,
      }}
    >
      {text}
    </Text>
  );
}

CustomText.defaultProps = {
  text: "Votre texte ici",
  size: 16,
  color: colors.vBlack,
  textAlign: "left",
};

const useStyle = () => {
  const dimensions = useWindowDimensions();

  const styles = StyleSheet.create({
    text: {
      fontFamily: "VintedFont",
      fontSize: 16,
      color: colors.vBlack,
    },
  });
  return { styles };
};
