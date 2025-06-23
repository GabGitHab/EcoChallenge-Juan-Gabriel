import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Inicio from "../screens/Inicio";
import RegistroUsuario from "../screens/Usuarios/RegistroUsuario";
import EditarUsuario from "../screens/Usuarios/EditarUsuario";
import BorrarUsuario from "../screens/Usuarios/BorrarUsuario";
import MenuUsuario from "../screens/Usuarios/MenuUsuario";



const Stack = createStackNavigator()

const RootStack = () => {
    return (
        <NavigationContainer initialRouteName="Inicio">
            <Stack.Navigator>
                <Stack.Screen
                    name="Inicio"
                    component={Inicio}
                    options={{ title: "Inicio" }}
                />
                <Stack.Screen
                    name="RegistroUsuario"
                    component={RegistroUsuario}
                    options={{ title: "Registro Usuario" }}
                />
                <Stack.Screen
                    name="EditarUsuario"
                    component={EditarUsuario}
                    options={{ title: "Editar Usuario" }}
                />
                <Stack.Screen
                    name="BorrarUsuario"
                    component={BorrarUsuario}
                    options={{ title: "Registro Usuario" }}
                />
                <Stack.Screen
                    name="MenuUsuario"
                    component={MenuUsuario}
                    options={{ title: "Menu Usuario" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;