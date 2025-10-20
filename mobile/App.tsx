// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./src/screens/SearchScreen";
import SavedJobsScreen from "./src/screens/SavedJobsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "JobTracker — Search" }}
        />
        <Stack.Screen
          name="Saved"
          component={SavedJobsScreen}
          options={{ title: "Your Saved Jobs" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}