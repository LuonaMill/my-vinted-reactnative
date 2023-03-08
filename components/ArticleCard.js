import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import CustomText from "./CustomText";
import { colors } from "../src/utils/colors";
import { spacing } from "../src/utils/sizes";
import { Ionicons } from "@expo/vector-icons";

export default function ArticleCard({ article }) {
  const { styles } = useStyle();

  //! A RETRAVAILLER
  const handleFavorite = async (event) => {
    if (!favorite) {
      const addToFavorite = await axios.post(
        `${process.env.VINTED_BACKEND}/user/favorites/${userToken}`,
        {
          token: userToken,
          product_name: data.product_name,
          offerId: data._id,
        }
      );
      console.log(response.data._id);
      setFavorite(true);
    } else {
      // const deleteFavorite = await axios.delete(
      //   `http://localhost:4002/user/favorites/${userToken}`
      // );
      alert("Déjà dans tes favs");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.articleView}>
        <View style={styles.ownerInfos}>
          {article.owner.account.avatar ? (
            <Image
              source={{ uri: `${article.owner.account.avatar.secure_url}` }}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={{ uri: "https://bigjpg.com/static/css/og.jpg" }}
              style={styles.avatar}
            />
          )}

          <CustomText
            text={article.owner.account.username}
            size={13}
            color={colors.vDarkerGrey}
          />
        </View>
        <Image
          style={styles.img}
          source={{
            uri: article.product_image?.secure_url,
          }}
        />
        <View style={styles.articleInfos}>
          <View style={[styles.row, styles.spaceBetween]}>
            <CustomText
              text={`${article.product_price} €`}
              size={13}
              color="black"
            />
            <View style={[styles.row]}>
              <Ionicons name="heart-outline" size={13} color={colors.vGrey} />
              <CustomText text="2" size={13} color={colors.vGrey} />
            </View>
          </View>
          <View style={styles.bottomInfos}>
            {article.product_details && (
              <>
                <CustomText
                  text={
                    !article.product_details[0].MARQUE
                      ? "unknown"
                      : `${article.product_details[0].MARQUE}`
                  }
                  size={13}
                  color={colors.vLightGrey}
                />
                <CustomText
                  text={
                    !article.product_details[0].TAILLE
                      ? "unknown"
                      : `${article.product_details[0].TAILLE}`
                  }
                  size={13}
                  color={colors.vLightGrey}
                />
              </>
            )}
          </View>
        </View>
      </View>
      {/* <View style={styles.articleView}>
        <View style={styles.ownerInfos}>
          <Image
            source={{ uri: "https://bigjpg.com/static/css/og.jpg" }}
            style={styles.avatar}
          />

          <CustomText
            text="nom du owner"
            size={13}
            color={colors.vDarkerGrey}
          />
        </View>
        <Image
          style={styles.img}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lion_d%27Afrique.jpg/1879px-Lion_d%27Afrique.jpg",
          }}
        />
        <View style={styles.articleInfos}>
          <View style={[styles.row, styles.spaceBetween]}>
            <CustomText text="100 €" size={13} color="black" />
            <View style={[styles.row]}>
              <Ionicons name="heart-outline" size={13} color={colors.vGrey} />
              <CustomText text="2" size={13} color={colors.vGrey} />
            </View>
          </View>
          <View>
            <CustomText text="Brand" size={13} color={colors.vLightGrey} />
            <CustomText text="Size" size={13} color={colors.vLightGrey} />
          </View>
        </View>
      </View> */}
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const articleViewWidth = dimensions.width * 0.45;
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      //   backgroundColor: "pink",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    articleView: {
      width: articleViewWidth,
      borderColor: "red",
      //   borderWidth: 1,
      marginBottom: spacing.md,
      marginRight: spacing.xs,
      marginLeft: spacing.xs,
    },

    ownerInfos: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      padding: spacing.xs,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    spaceBetween: {
      justifyContent: "space-between",
    },
    articleInfos: {
      padding: spacing.xs,
      gap: spacing.xs,
    },
    bottomInfos: {
      height: dimensions.height / 30,
      backgroundColor: "white",
    },

    avatar: {
      height: articleViewWidth * 0.15,
      width: articleViewWidth * 0.15,
      borderRadius: (articleViewWidth * 0.15) / 2,
    },

    img: {
      height: dimensions.height * 0.25,
      width: articleViewWidth,
      resizeMode: "cover",
    },
  });
  return { styles };
};
