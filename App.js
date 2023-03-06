import "react-native-gesture-handler";

import * as Font from "expo-font";

// import Apploading from "expo-app-loading";

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

// import SplashScreenTest from "./screens/SplashScreen";
import HomeLogin from "./screens/HomeLogin";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Publish from "./screens/Publish";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import Offer from "./screens/Offer";
import MoreTests from "./Tests/MoreTests";

//! Pour ma navigation, je vais utiliser des stacks screens et des tab screens
// Arrivée sur l'appli :
// 1- SplashScreen
// Si pas de token  : 2- Login Screen et redirection possible vers SignupScreen
// Si token : 3 - Tab Navigator avec 4 Bottom tab screens : Accueil / Chercher / Vendre / Profil
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const customFonts = {
    VintedFont: require("./assets/fonts/VintedFont.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
  };

  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } else {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    }
  };

  const setId = async (id) => {
    if (id) {
      await AsyncStorage.setItem("userId", id);
      setUserId(id);
    } else {
      await AsyncStorage.removeItem("userId");
      setUserId(null);
    }
  };

  useEffect(() => {
    const _loadFontsTokenIdAsync = async () => {
      await Font.loadAsync(customFonts);
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      setFontsLoaded(true);
      setUserToken(userToken);
      setUserId(userId);
      setIsLoading(false);
    };

    _loadFontsTokenIdAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <ActivityIndicator />
      ) : !userToken ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => (
              <Login
                token={userToken}
                id={userId}
                setToken={setToken}
                setId={setId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="HomeLogin" options={{ headerShown: false }}>
            {() => <HomeLogin />}
          </Stack.Screen>
          <Stack.Screen name="Signup" options={{ headerShown: false }}>
            {() => (
              <Signup
                token={userToken}
                id={userId}
                setToken={setToken}
                setId={setId}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "TabHome") {
                      focused
                        ? (iconName = "home")
                        : (iconName = "home-outline");
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
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
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
                      <Stack.Screen
                        name="Accueil"
                        options={{ headerShown: false }}
                      >
                        {() => <Home userToken={userToken} userId={userId} />}
                      </Stack.Screen>
                      <Stack.Screen name="Offre" component={Offer} />
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
                <Tab.Screen
                  name="TabPublish"
                  options={{ tabBarLabel: "Vendre" }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Vendre"
                        component={Publish}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabProfile"
                  options={{ tabBarLabel: "Profil" }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profil"
                        options={{ headerShown: false }}
                      >
                        {() => <Profile userId={userId} setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="TabTest" options={{ tabBarLabel: "Tests" }}>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Test"
                        options={{ headerShown: false }}
                      >
                        {() => <MoreTests setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
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
