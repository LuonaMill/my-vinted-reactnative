import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { colors } from "../src/utils/colors";
import { fontSizes } from "../src/utils/sizes";
import Constants from "expo-constants";
import TopNavBar from "../components/TopNavBar";

export default function InfoPlatform() {
  const { styles } = useStyle();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <TopNavBar pageTitle="Notre plateforme" goBack />
        <View style={styles.borderBetweenViews}></View>

        <View style={styles.mainZone}>
          <Text style={styles.title}>
            INFORMATIONS GÉNÉRALES ET BONNES PRATIQUES
          </Text>
          <Text style={styles.subtitle}>QU’EST-CE QUE VINTED ?</Text>
          <Text style={styles.text}>
            Vinted est un service d'hébergement et d’intermédiation en ligne qui
            permet aux Utilisateurs d'échanger, de vendre et d'acheter des
            objets sur sa plateforme (le « Site »). Vinted facilite ces
            transactions et permet aux Utilisateurs de communiquer par messages
            privés ou en postant des messages sur le forum. Vinted propose
            également des services supplémentaires payants pour sécuriser ces
            transactions (les « Services de Protection Acheteur ») ou pour
            améliorer la visibilité des articles qu'ils mettent en vente (comme
            le « boost d’article » ou le « Dressing en Vitrine »). Vinted ne
            vend pas, n'achète pas et n'échange pas d'articles et n'est pas
            partie aux transactions entre les Utilisateurs. Le nombre mensuels
            moyen de destinataires actifs de Vinted au sein de l’Union
            européenne, calculé comme une moyenne sur la période des six
            derniers mois, conformément au règlement (UE) 2022/2065 (sur un
            marché unique des services numériques) était de 37.4 millions en
            date du 31/01/2023.
          </Text>
        </View>
      </ScrollView>
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
    title: {
      fontFamily: "VintedFont",
      fontSize: fontSizes.lg,
      textAlign: "center",
      marginTop: 10,
      color: colors.vBlack,
    },
    subtitle: {
      fontFamily: "VintedFont",
      fontSize: fontSizes.lg - 2,
      marginTop: 20,
      color: colors.vDarkerGrey,
    },
    text: {
      fontFamily: "VintedFont",
      fontSize: fontSizes.lg - 4,
      marginTop: 10,
      color: colors.vDarkerGrey,
    },
    borderBetweenViews: {
      height: 12,
      width: dimensions.width,
      backgroundColor: colors.vLightest2Grey,
    },
    mainZone: {
      backgroundColor: "white",
      padding: 20,
    },
  });
  return { styles };
};
