import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// pages
import Contries from "./pages/tabs/contries";
import Profile from "./pages/tabs/profile";
import SignUp from "./pages/signup";
import SignIn from "./pages/tabs/signin";

//auth
import Home from "./pages/auth/home";

export default function Routes() {

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Drawer">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Drawer" component={DrawerRoutes} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


function DrawerRoutes() {

    const Drawer = createDrawerNavigator();

    return(
        <Drawer.Navigator initialRouteName="SignUp">
            <Drawer.Screen name="SignUp" component={SignUp} />
            <Drawer.Screen name="SignIn" component={SignIn} />
            <Drawer.Screen name="Contries" component={Contries} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}
