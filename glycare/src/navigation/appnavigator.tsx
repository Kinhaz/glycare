import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './types';

// ── Importe suas screens aqui ──
import InicioScreen   from "../screens/InicioScreen";
import LoginScreen    from "../screens/LoginScreen";
import CadastrarScreen from "../screens/CadastrarScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#1E1B4B" },
        animation: "slide_from_right",
      }}
    >
      {/* ── Registre suas screens aqui ── */}
      <Stack.Screen name="Inicio"    component={InicioScreen} />
      <Stack.Screen name="Login"     component={LoginScreen} />
      <Stack.Screen name="Cadastrar" component={CadastrarScreen} />
    </Stack.Navigator>
  );
}