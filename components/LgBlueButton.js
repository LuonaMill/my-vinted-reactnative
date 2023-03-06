import { Dimensions, View, StyleSheet, Text } from "react-native";
import { colors } from "../src/utils/colors";
import { fontSizes, spacing } from "../src/utils/sizes";

const windowWidth = Dimensions.get("window").width;

// When pressed this button is used for submission (ongoing work)

export default function LgBlueButton({ title }) {
  return (
    <View style={styles.btnPrimary}>
      <Text style={styles.whiteTextM}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: colors.vBlue,
    height: 50,
    width: windowWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    fontFamily: "VintedFont",
    marginBottom: spacing.sm,
  },
  whiteTextM: {
    color: "white",
    fontSize: fontSizes.md,
    fontFamily: "VintedFont",
  },
});
