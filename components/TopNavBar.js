import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { fontSizes, spacing } from "../src/utils/sizes";
import { colors } from "../src/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TopNavBar({ pageTitle, goBack }) {
  const navigation = useNavigation();
  return (
    <View style={styles.topNavBar}>
      {goBack && (
        <TouchableOpacity
          style={styles.goBackZone}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={fontSizes.xl}
            color={colors.vBlack}
          />
        </TouchableOpacity>
      )}

      <Text style={styles.lgVFont}>{pageTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavBar: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: colors.vLightestGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.sm,
    gap: spacing.sm,
  },
  goBackZone: {
    justifyContent: "center",
  },
  lgVFont: {
    fontFamily: "VintedFont",
    fontSize: fontSizes.lg,
    color: colors.vBlack,
  },
});
