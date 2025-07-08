import { createStackNavigator } from "@react-navigation/stack";
import { useUser } from "../components/context/contextoUsuario";

// Pantallas
import Inicio from "../screens/Inicio";
import RegistroUsuario from "../screens/Usuarios/RegistroUsuario";
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
import Login from "../session/Login";
import VerParticipacion from "../screens/Participaciones/VerParticipacion";

const Stack = createStackNavigator();

const RootStack = () => {
    const { usuario } = useUser();

    return (
        <Stack.Navigator>
            {usuario ? (
                <Stack.Screen
                    name="Ingresar"
                    component={Login}
                    options={{ title: "Ingresar" }}
                />
            ) : (
                <>
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
                        options={{ title: "Borrar Usuario" }}
                    />
                    <Stack.Screen
                        name="MenuUsuario"
                        component={MenuUsuario}
                        options={{ title: "Menú Usuario" }}
                    />
                    <Stack.Screen
                        name="ListadoUsuarios"
                        component={ListadoUsuarios}
                        options={{ title: "Listado de Usuarios" }}
                    />
                    <Stack.Screen
                        name="MenuRetos"
                        component={MenuRetos}
                        options={{ title: "Menú Retos" }}
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
                        options={{ title: "Menú Materiales" }}
                    />
                    <Stack.Screen
                        name="RegistroMaterial"
                        component={RegistroMaterial}
                        options={{ title: "Registro de Material" }}
                    />
                    <Stack.Screen
                        name="EditarMaterial"
                        component={EditarMaterial}
                        options={{ title: "Edición de Material" }}
                    />
                    <Stack.Screen
                        name="BorrarMaterial"
                        component={BorrarMaterial}
                        options={{ title: "Borrar Material" }}
                    />
                    <Stack.Screen
                        name="AgregarParticipacion"
                        component={AgregarParticipacion}
                        options={{ title: "Agregar Participación" }}
                    />
                    <Stack.Screen
                        name="DetallesReto"
                        component={VerReto} //falta<
                        options={{ title: "Detalles del Reto" }}
                    />
                    <Stack.Screen
                        name="VerParticiacion"
                        component={VerParticipacion} //falta
                        options={{ title: "Detalles de Participación" }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootStack;
