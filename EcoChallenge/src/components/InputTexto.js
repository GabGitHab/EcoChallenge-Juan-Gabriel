import { StyleSheet, TextInput, View } from "react-native";

const InputTexto = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                underlineColorAndroid="transparent"
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor="grey" //d3ffbb
                keyboardType={props.keyboardType} //"numeric", "email-address", "default", "phone-pad"
                secureTextEntry={props.secureTextEntry} //oculat texto, recive true or false
                returnKeyType={props.returnKeyType} //
                numberOfLines={props.numberOfLines} // define cantidad de lienas
                multiline={props.multiline} // define si puede ser multilinea o no (true o false)
                onSubmitEditing={props.onSubmitEditing}
                style={styles.input}
                blurOnSubmit={false}
                value={props.value}
                defaultValue={props.defaultValue}

            />
        </View>
    );
};

export default InputTexto;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        padding: 15,
    },
});

