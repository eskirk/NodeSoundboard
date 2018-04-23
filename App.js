import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Speaker from './components/Speaker/Speaker';


export default class App extends React.Component {
   constructor() {
      super();

      this.state = {
         response: ''
      };
   }

   render() {
      return (
         <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>The hive must hear me</Text>
            <Speaker/>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#a4e3fc',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
