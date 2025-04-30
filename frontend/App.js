import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import BookScreen from './src/screens/books/BookScreen';
import CategoryScreen from './src/screens/categories/CategoryScreen';
import { store } from './src/redux/store';
import CategoryEditScreen from './src/screens/categories/CategoryEditScreen';
import CategoryCreateScreen from './src/screens/categories/CategoryCreateScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Book" component={BookScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryEdit" component={CategoryEditScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryNew" component={CategoryCreateScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'times new roman'
  }
})