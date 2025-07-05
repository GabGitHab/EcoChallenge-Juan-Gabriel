import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Inicio from "../screens/Inicio";
import RegistroUsuario from "../screens/Usuarios/RegistroUsuario";
import EditarUsuario from "../screens/Usuarios/EditarUsuario";
import BorrarUsuario from "../screens/Usuarios/BorrarUsuario";
import MenuUsuario from "../screens/Usuarios/MenuUsuario";
import ListadoUsuarios from "../screens/Usuarios/ListadoUsuarios";
import React from "react";
import MenuRetos from "../screens/Retos/MenuRetos";
import RegistroRetos from "../screens/Retos/RegistroRetos";
import EditarRetos from "../screens/Retos/EditarRetos";
import BorrarRetos from "../screens/Retos/BorrarRetos";
import MenuMateriales from "../screens/Materiales/MenuMateriales";
import RegistroMaterial from "../screens/Materiales/RegistroMaterial";
import EditarMaterial from "../screens/Materiales/EditarMaterial";
import BorrarMaterial from "../screens/Materiales/BorrarMaterial";
import AgregarParticipacion from "../screens/Retos/AgregarParticipacion";
import VerReto from "../screens/Retos/VerReto";



const Stack = createStackNavigator()

const RootStack = () => {
    return (
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
            <Stack.Screen
                name="ListadoUsuarios"
                component={ListadoUsuarios}
                options={{ title: "Listado de Usuarios" }}
            />
            <Stack.Screen
                name="MenuRetos"
                component={MenuRetos}
                options={{ title: "Menu Retos" }}
            />
            <Stack.Screen
                name="RegistroRetos"
                component={RegistroRetos}
                options={{ title: "Registro Retos" }}
            />
            <Stack.Screen
                name="EditarRetos"
                component={EditarRetos}
                options={{ title: "Editar Retos" }}
            />
            <Stack.Screen
                name="BorrarRetos"
                component={BorrarRetos}
                options={{ title: "Borrar Retos" }}
            />
            <Stack.Screen
                name="MenuMateriales"
                component={MenuMateriales}
                options={{ title: "Menu de Materiales" }}
            />
            <Stack.Screen
                name="RegistroMaterial"
                component={RegistroMaterial}
                options={{ title: "Registro de material" }}
            />
            <Stack.Screen
                name="EditarMaterial"
                component={EditarMaterial}
                options={{ title: "Edicion de material" }}
            />
            <Stack.Screen
                name="BorrarMaterial"
                component={BorrarMaterial}
                options={{ title: "Borrar material" }}
            />
            <Stack.Screen
                name="AgregarParticipacion"
                component={AgregarParticipacion}
                options={{ title: "Agregar Participación" }}
            />
            <Stack.Screen
                name="DetallesReto"
                component={VerReto}
                options={{ title: "Detalles del Reto" }}
            />
        </Stack.Navigator>
    )
}

export default RootStack;