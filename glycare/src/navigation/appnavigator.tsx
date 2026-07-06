import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './types';

// ── Importe suas screens aqui ──


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName=""
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#1E1B4B" },
        animation: "slide_from_right",
      }}
    >
      {/* ── Registre suas screens aqui ── */}
    </Stack.Navigator>
  );
}