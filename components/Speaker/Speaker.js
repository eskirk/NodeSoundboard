import React from 'react';
import { Button, View, TextInput, Text } from 'react-native';

export default class Speaker extends React.Component {
   constructor() {
      super();
      this.state = {
         message: '',
         response: []
      };
   }

   render() {
      return (
         <View>
            <TextInput
               ref={input => {this.TextInput = input}}
               style={{ height: 50, width: 200, textAlign: 'center' }}
               multiline={true}
               placeholder='Type here to speak to the hive'
               onChangeText={(text) => this.setState({ message: text })}
               value={this.state.message}
            />
            <Button
               title='Buzz Buzz'
               onPress={() => this.sendMessage()}
            />
            {/* <View>
               <Text>{'\n'}</Text>
               {this.displayMessages()}
            </View> */}
         </View>
      )
   }

   componentDidMount() {
      this.callApi()
         .then(res => this.setState({ response: res.messages }))
         .catch(err => console.log(err));
      
      console.log(this.state.response);
   }

   sendMessage() {
      console.log(this.state.message);
      this.postMessage();
      this.setState({
         message: ''
      });
      console.log(this.callApi());
   }

   displayMessages() {
      var messages = [];
      var key = 0;

      this.state.response.forEach(element => {
         console.log(element);
         messages.push(<Text key={key++}>{element}</Text>)
      })
      return messages;
   }

   postMessage = async () => {
      var headers = new Headers();
      headers.append('Accept', 'application/json, text/plain, */*'); // This one is enough for GET requests
      headers.append('Content-Type', 'application/json'); // This one sends body

      const response = fetch('http://192.168.1.31:4200/api/speak', {
         body: JSON.stringify({
            message: this.state.message,
         }),
         method: 'POST',
         headers: headers,
      });
   }

   callApi = async () => {
      const response = await fetch('http://192.168.1.31:4200/api/hello');
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      console.log(body);
      return body;
   }
}