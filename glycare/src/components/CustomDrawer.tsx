import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import { DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

// =========================================
// CORES
// =========================================
const COLORS = {
  bg:       "#1E1B4B",
  active:   "#A5B4FC",
  inactive: "#6B68A8",
  text:     "#FFFFFF",
  divider:  "#2D2A6E",
  icon:     "#A5B4FC",
};

// =========================================
// ITENS DO MENU — fácil de modificar
// =========================================
const MENU_ITEMS = [
  { label: "Perfil",           route: "Perfil",         icon: "person-outline"     },
  { label: "Espaço Familiar",  route: "EspacoFamiliar", icon: "people-outline"     },
  { label: "Monitorar",        route: "Monitorar",      icon: "pulse-outline"      },
  { label: "Relatórios",       route: "Relatorios",     icon: "bar-chart-outline"  },
  { label: "Configurações",    route: "Configuracoes",  icon: "settings-outline"   },
];

const LOGO_URL = "https://snipboard.io/dGebyq.jpg";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium });
  if (!fontsLoaded) return null;

  const currentRoute = props.state.routes[props.state.index]?.name;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / topo */}
        <View style={styles.header}>
          <Image
            source={{ uri: LOGO_URL }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.divider} />

        {/* Itens do menu */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <TouchableOpacity
                key={item.route}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                activeOpacity={0.75}
                onPress={() => props.navigation.navigate(item.route)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isActive ? COLORS.active : COLORS.inactive}
                />
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Rodapé — sair */}
      <View style={styles.footer}>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.75}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Ionicons name="close-outline" size={20} color={COLORS.inactive} />
          <Text style={styles.menuLabel}>Fechar menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 0,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
  },
  logo: {
    width: 110,
    height: 44,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 20,
    marginVertical: 8,
  },

  // Menu
  menuList: {
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  menuItemActive: {
    backgroundColor: "#2D2A6E",
  },
  menuLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 15,
    color: COLORS.inactive,
  },
  menuLabelActive: {
    fontFamily: "DMSans_500Medium",
    color: COLORS.active,
  },

  // Footer
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
});
