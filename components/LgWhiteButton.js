import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from "react-native";
import { colors } from "../src/utils/colors";
import { fontSizes, spacing } from "../src/utils/sizes";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

// This button can be bordered or not (boolean props border)
// When pressed this button is used for navigation

export default function LgWhiteButton({ title, border, destination }) {
  const navigation = useNavigation();

  return (
    <View>
      {destination ? (
        <TouchableOpacity
          style={[border && styles.btnBorder, styles.btnPrimary]}
          onPress={() => {
            if (destination) {
              navigation.navigate(destination);
            }
          }}
        >
          <Text style={styles.whiteTextM}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <View style={[border && styles.btnBorder, styles.btnPrimary]}>
          <Text style={styles.whiteTextM}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnPrimary: {
    height: 50,
    width: windowWidth * 0.9,
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    fontFamily: "VintedFont",
    marginBottom: spacing.sm,
  },
  btnBorder: {
    borderColor: colors.vBlue,
    borderWidth: 1,
  },
  whiteTextM: {
    color: colors.vBlue,
    fontSize: fontSizes.md,
    fontFamily: "VintedFont",
  },
});
