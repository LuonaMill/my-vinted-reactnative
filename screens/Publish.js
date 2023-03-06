import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import TopNavBar from "../components/TopNavBar";
import Input from "../components/Input";
import { colors } from "../src/utils/colors";
import { spacing } from "../src/utils/sizes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Publish() {
  const { styles } = useStyle();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavBar pageTitle="Vends ton article" />
      <KeyboardAwareScrollView>
        <View style={styles.addPictureView}>
          <TouchableOpacity style={styles.addPictureBtn}>
            <Text style={styles.addPictureText}>+ Ajouter photos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.borderBetweenViews}></View>
        <View style={styles.addArticleView}>
          <Input title="Titre" placeholder="ex: Chemise Sézane verte" />
          <Input
            title="Décris ton article"
            placeholder="ex: porté quelques fois, taille correctement"
            lines={10}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      backgroundColor: "white",
      flex: 1,
      width: dimensions.width,
    },
    addPictureView: {
      width: dimensions.width,
      height: dimensions.height * 0.2,
      borderColor: colors.vLighterGrey,
      borderWidth: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    addPictureBtn: {
      borderColor: colors.vBlue,
      borderWidth: 1,
      padding: spacing.sm,
      borderRadius: 5,
    },
    addPictureText: {
      color: colors.vBlue,
    },
    borderBetweenViews: {
      height: 12,
      width: dimensions.width,
      backgroundColor: colors.vLightest2Grey,
    },
    addArticleView: {
      width: dimensions.width,
      // height: dimensions.height * 0.2,
      borderColor: colors.vLighterGrey,
      borderWidth: 1,
      backgroundColor: "white",
      // justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles };
};
