import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import { fontSizes, spacing } from "../src/utils/sizes";
import { colors } from "../src/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

export default function TopNavBar({ pageTitle, goBack, setState }) {
  const { styles } = useStyle();
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
      {pageTitle === "searchBar" ? (
        <TextInput
          placeholder="Rechercher"
          style={styles.searchBar}
          onChangeText={(input) => {
            setState(input);
          }}
        />
      ) : (
        <Text style={styles.lgVFont}>{pageTitle}</Text>
      )}
    </View>
  );
}

TopNavBar.defaultProps = {
  goBack: false,
  pageTitle: "Votre titre pageTitle",
  setState: () => {},
};

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const navBarHeight = 60;
  const styles = StyleSheet.create({
    topNavBar: {
      height: navBarHeight,
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
    searchBar: {
      width: dimensions.width * 0.8,
      height: navBarHeight * 0.6,
    },
  });
  return { styles };
};
