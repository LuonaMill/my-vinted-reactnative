import "react-native-gesture-handler";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// import Apploading from "expo-app-loading";

import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import SplashScreenTest from "./screens/SplashScreen";
import HomeLogin from "./screens/HomeLogin";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Publish from "./screens/Publish";
import Profile from "./screens/Profile";
import Search from "./screens/Search";

//! J'importe des fonts
// const getFonts = () =>
//   Font.loadAsync({
//     openSans: require("./assets/fonts/OpenSans/OpenSans-Regular.ttf"),
//     openSansBold: require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
//   });

SplashScreen.preventAutoHideAsync();

//! Pour ma navigation, je vais utiliser des stacks screens et des tab screens
// Arrivée sur l'appli :
// 1- SplashScreen
// Si pas de token  : 2- Login Screen et redirection possible vers SignupScreen
// Si token : 3 - Tab Navigator avec 4 Bottom tab screens : Accueil / Chercher / Vendre / Profil
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          openSans: require("./assets/fonts/OpenSans/OpenSans-Regular.ttf"),
          openSansBold: require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {fontsLoaded ? ( */}
        <Stack.Screen
          name="SplashScreen"
          options={{ headerShown: false }}
          component={SplashScreenTest}
        />
        {/* // <Apploading
          //   startAsync={getFonts}
          //   onFinish={() => {
          //     setFontsLoaded(true);
          //   }}
          //   onError={console.warn}
          // /> */}
        <Stack.Screen
          name="HomeLogin"
          options={{ headerShown: false }}
          component={HomeLogin}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "TabHome") {
                    focused ? (iconName = "home") : (iconName = "home-outline");
                  } else if (route.name === "TabSearch") {
                    focused
                      ? (iconName = "search")
                      : (iconName = "search-outline");
                  } else if (route.name === "TabPublish") {
                    focused
                      ? (iconName = "add-circle")
                      : (iconName = "add-circle-outline");
                  } else if (route.name === "TabProfile") {
                    focused
                      ? (iconName = "person")
                      : (iconName = "person-outline");
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: "#09B1BA",
                tabBarInactiveTintColor: "grey",
              })}
            >
              <Tab.Screen
                name="TabHome"
                options={{
                  tabBarLabel: "Accueil",
                  tabBarBadge: 3,
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Accueil" component={Home} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="TabSearch"
                options={{ tabBarLabel: "Chercher" }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Rechercher un article"
                      component={Search}
                    />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name="TabPublish" options={{ tabBarLabel: "Vendre" }}>
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Vendre" component={Publish} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name="TabProfile" options={{ tabBarLabel: "Profil" }}>
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Profil" component={Profile} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

{
  /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */
}
