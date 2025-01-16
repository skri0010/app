import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import PasswordListScreen from "./screens/PasswordListScreen";
import AddEditPasswordScreen from "./screens/AddEditPasswordScreen";
import { Animated, ScrollView, Text } from "react-native";
import colors from "./styles/colors";

type RootStackParamList = {
  Login: undefined;
  PasswordList: undefined;
  AddEditPassword: { passwordId?: string };
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.lightGrey,
      primary: colors.darkGrey,
    },
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: colors.lightGrey }}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordList"
            component={PasswordListScreen}
            options={{ title: "Your Passwords" }}
          />
          <Stack.Screen
            name="AddEditPassword"
            component={AddEditPasswordScreen}
            options={({ route }) => ({
              title: route.params?.passwordId
                ? "Edit Password"
                : "Add Password",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
