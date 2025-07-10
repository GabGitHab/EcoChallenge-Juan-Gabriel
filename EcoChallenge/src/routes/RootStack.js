import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useUser } from "../components/context/contextoUsuario";

import Login from "../session/Login";
import RegistroUsuario from "../screens/Usuarios/RegistroUsuario";

import Inicio from "../screens/Inicio";
import EditarUsuario from "../screens/Usuarios/EditarUsuario";
import BorrarUsuario from "../screens/Usuarios/BorrarUsuario";
import MenuUsuario from "../screens/Usuarios/MenuUsuario";
import ListadoUsuarios from "../screens/Usuarios/ListadoUsuarios";
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
import VerParticipacion from "../screens/Participaciones/VerParticipacion";
import ListaParticipaciones from "../components/Participaciones/ListaParticipaciones";


const AuthStackNavigator = createStackNavigator();
const AppStackNavigator = createStackNavigator();

const AuthStack = () => (
  <AuthStackNavigator.Navigator>
    <AuthStackNavigator.Screen
      name="Ingresar"
      component={Login}
      options={{ title: "Ingresar" }}
    />
    <AuthStackNavigator.Screen
      name="RegistroUsuario"
      component={RegistroUsuario}
      options={{ title: "Registro Usuario" }}
    />
  </AuthStackNavigator.Navigator>
);

const AppStack = () => (
  <AppStackNavigator.Navigator>
    <AppStackNavigator.Screen
      name="Inicio"
      component={Inicio}
      options={{ title: "Inicio" }}
    />
    <AppStackNavigator.Screen
      name="RegistroUsuario"
      component={RegistroUsuario}
      options={{ title: "Registro Usuario" }}
    />
    <AppStackNavigator.Screen
      name="EditarUsuario"
      component={EditarUsuario}
      options={{ title: "Editar Usuario" }}
    />
    <AppStackNavigator.Screen
      name="BorrarUsuario"
      component={BorrarUsuario}
      options={{ title: "Borrar Usuario" }}
    />
    <AppStackNavigator.Screen
      name="MenuUsuario"
      component={MenuUsuario}
      options={{ title: "Menú Usuario" }}
    />
    <AppStackNavigator.Screen
      name="ListadoUsuarios"
      component={ListadoUsuarios}
      options={{ title: "Listado de Usuarios" }}
    />
    <AppStackNavigator.Screen
      name="MenuRetos"
      component={MenuRetos}
      options={{ title: "Menú Retos" }}
    />
    <AppStackNavigator.Screen
      name="RegistroRetos"
      component={RegistroRetos}
      options={{ title: "Registro Retos" }}
    />
    <AppStackNavigator.Screen
      name="EditarRetos"
      component={EditarRetos}
      options={{ title: "Editar Retos" }}
    />
    <AppStackNavigator.Screen
      name="BorrarRetos"
      component={BorrarRetos}
      options={{ title: "Borrar Retos" }}
    />
    <AppStackNavigator.Screen
      name="MenuMateriales"
      component={MenuMateriales}
      options={{ title: "Menú Materiales" }}
    />
    <AppStackNavigator.Screen
      name="ListaParticipaciones"
      component={ListaParticipaciones}
      options={{ title: "Lista de Participaciones" }}
    />
    <AppStackNavigator.Screen
      name="RegistroMaterial"
      component={RegistroMaterial}
      options={{ title: "Registro de Material" }}
    />
    <AppStackNavigator.Screen
      name="EditarMaterial"
      component={EditarMaterial}
      options={{ title: "Edición de Material" }}
    />
    <AppStackNavigator.Screen
      name="BorrarMaterial"
      component={BorrarMaterial}
      options={{ title: "Borrar Material" }}
    />
    <AppStackNavigator.Screen
      name="AgregarParticipacion"
      component={AgregarParticipacion}
      options={{ title: "Agregar Participación" }}
    />
    <AppStackNavigator.Screen
      name="DetallesReto"
      component={VerReto}
      options={{ title: "Detalles del Reto" }}
    />
    <AppStackNavigator.Screen
      name="VerParticipacion"
      component={VerParticipacion}
      options={{ title: "Detalles de Participación" }}
    />
  </AppStackNavigator.Navigator>
);

const RootStack = () => {
  const { usuario } = useUser();

  return usuario ? <AppStack /> : <AuthStack />;
};

export default RootStack;
