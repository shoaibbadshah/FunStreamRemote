

import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import RtmEngine from 'agora-react-native-rtm';

const App = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [rtmClient, setRtmClient] = useState(null);

  const connectionData = {
    appId: '4d76a039d253457cb82a097e396932d8',
    channel: 'test',
    token: '007eJxTYGi73+J51fia/sYZ56cnZ03VXb20p9mkI+5A5X+xIyVan8IUGExSzM0SDYwtU4xMjU1MzZOTLIwSDSzNU40tzSyNjVIszM+VpjUEMjKcOL2KhZEBAkF8FoaS1OISBgYArXEgzQ==',
  };

  const rtmToken = '0064d76a039d253457cb82a097e396932d8IAC7v+1uJwp6wJpp6I+S2P0ibWKImtiCVhQBITqKK0ALRbuJbuwAAAAAEABp3WzgZh53ZgEA6AP22nVm';
  const userId = '007eJxTYHCaGG7WcmXG4j1Vy0VtJkk3T2UUWcKjJ7ndPI/ZpKfovJUCg0mKuVmigbFlipGpsYmpeXKShVGigaV5qrGlmaWxUYrFl/OlaQ2BjAwqmZdYGRlYGRiBEMxnMDYzNbO0MDHQNTYwMNQ1NExN07VMNbYAsgxSTdIsjC0sDA0B+98i1Q==';

  useEffect(() => {
    // const initRtm = async () => {
    //   const client = new RtmEngine();
    //   setRtmClient(client);

    //   await client.createClient(connectionData.appId);
    //   // await client.loginV2(userId, token)
    //   await client.login({ token: rtmToken, uid: userId });


    //   client.addListener('ConnectionStateChanged', (e) => {
    //     console.log('connection state changed000000000000000000')
    //   });


    //   client.on('messageReceived', (message, peerId) => {
    //     Alert.alert('message received')
    //     setMessages(prevMessages => [
    //       ...prevMessages,
    //       { text: message.text, sender: peerId },
    //     ]);
    //   });

    //   await client.joinChannel(connectionData.channel);
    // };


    const initRtm = async () => {
      const client = new RtmEngine();
      setRtmClient(client);

      try {
        await client.createInstance(connectionData.appId);
        console.log('Client created');

        await client.loginV2(userId, rtmToken);
        console.log('Logged in successfully');

        // client.addListener('ConnectionStateChanged', (e) => {
        //   console.log('Connection state changed:', e);
        // });

        // client.on('messageReceived', (message, peerId) => {
        //   Alert.alert('Message received');
        //   setMessages(prevMessages => [
        //     ...prevMessages,
        //     { text: message.text, sender: peerId },
        //   ]);
        // });

        // await client.joinChannel(connectionData.channel);
        // console.log('Joined channel successfully');
      } catch (error) {
        console.error('RTM Client init error:', error);
      }
    };

    initRtm();

    return () => {
      rtmClient?.logout();
      rtmClient?.destroyClient();
    };
  }, []);

  const sendMessage = async () => {
    if (rtmClient) {
      console.log('hello=========================')

      rtmClient.addListener('ConnectionStateChanged', (e) => {
        console.log('connection state changed000000000000000000')
      });
    }
    // if (rtmClient && message.trim()) {
    //   rtmClient
    //   await rtmClient.sendMessageToChannel(connectionData.channel, {
    //     text: message,
    //   });
    //   setMessages(prevMessages => [
    //     ...prevMessages,
    //     { text: message, sender: userId },
    //   ]);
    //   setMessage('');
    // }
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall ? (
    <View style={{ flex: 1 }}>
      <AgoraUIKit connectionData={connectionData} rtmCallbacks={callbacks} />
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Text style={{ padding: 5, backgroundColor: item.sender === userId ? 'lightblue' : 'lightgray' }}>
              {item.sender}: {item.text}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          style={{ borderColor: 'gray', borderWidth: 1, padding: 5, marginVertical: 10 }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  ) : (
    <View style={{ backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text
        style={{ backgroundColor: 'green', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 12, color: 'white' }}
        onPress={() => setVideoCall(true)}
      >
        Start Live Streaming
      </Text>
    </View>
  );
};

export default App;




// import React, {useState} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import {Text, View} from 'react-native';


// const App = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const connectionData = {
//       appId: '41a844d3a9044fb18d54b92f2bf9647b',
//       channel: 'test',
//       token: '007eJxTYJiSWnGKd/MO/t2y4tIz30hv2KDw71Lzku6k49mNp9Ot6tYoMJgYJlqYmKQYJ1oamJikJRlapJiaJFkapRklpVmamZgneaTEpzUEMjJw7DVjZmSAQBCfhaEktbiEgQEAQvkeyw==',
//   };

//   const callbacks = {
//     EndCall: () => setVideoCall(false),

// };

// return videoCall ? (
//   <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
// ) : (
//   <View style={{backgroundColor:'#eee', justifyContent:'center', alignItems:'center', flex:1}}>
//   <Text style={{backgroundColor:'green', paddingHorizontal:22, paddingVertical:12, borderRadius:12, color:'white'}} onPress={() => setVideoCall(true)}>Start Live Steaming</Text>
//   </View>
// );

// }

// export default App;






// // import React from 'react';
// // import type {PropsWithChildren} from 'react';
// // import {
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   useColorScheme,
// //   View,
// // } from 'react-native';

// // import {
// //   Colors,
// //   DebugInstructions,
// //   Header,
// //   LearnMoreLinks,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';

// // type SectionProps = PropsWithChildren<{
// //   title: string;
// // }>;

// // function Section({children, title}: SectionProps): JSX.Element {
// //   const isDarkMode = useColorScheme() === 'dark';
// //   return (
// //     <View style={styles.sectionContainer}>
// //       <Text
// //         style={[
// //           styles.sectionTitle,
// //           {
// //             color: isDarkMode ? Colors.white : Colors.black,
// //           },
// //         ]}>
// //         {title}
// //       </Text>
// //       <Text
// //         style={[
// //           styles.sectionDescription,
// //           {
// //             color: isDarkMode ? Colors.light : Colors.dark,
// //           },
// //         ]}>
// //         {children}
// //       </Text>
// //     </View>
// //   );
// // }

// // function App(): JSX.Element {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   const backgroundStyle = {
// //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// //   };

// //   return (
// //     <SafeAreaView style={backgroundStyle}>
// //       <StatusBar
// //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
// //         backgroundColor={backgroundStyle.backgroundColor}
// //       />
// //       <ScrollView
// //         contentInsetAdjustmentBehavior="automatic"
// //         style={backgroundStyle}>
// //         <Header />
// //         <View
// //           style={{
// //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
// //           }}>
// //           <Section title="Step One">
// //             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
// //             screen and then come back to see your edits.
// //           </Section>
// //           <Section title="See Your Changes">
// //             <ReloadInstructions />
// //           </Section>
// //           <Section title="Debug">
// //             <DebugInstructions />
// //           </Section>
// //           <Section title="Learn More">
// //             Read the docs to discover what to do next:
// //           </Section>
// //           <LearnMoreLinks />
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   sectionContainer: {
// //     marginTop: 32,
// //     paddingHorizontal: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //   },
// //   sectionDescription: {
// //     marginTop: 8,
// //     fontSize: 18,
// //     fontWeight: '400',
// //   },
// //   highlight: {
// //     fontWeight: '700',
// //   },
// // });

// // export default App;



// import React, { useState, useEffect } from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import { Text, View, TextInput, Button, FlatList } from 'react-native';
// import RtmEngine from 'agora-react-native-rtm';

// const App = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const [messages, setMessages] = useState([{ sender: 'hello' }]);
//   const [message, setMessage] = useState('');
//   const [rtmClient, setRtmClient] = useState(null);

//   const connectionData = {
//     appId: '4d76a039d253457cb82a097e396932d8',
//     channel: 'test',
//     token: '007eJxTYAhdkpvVp/oonsNuY1LmuhN2Um9K91fffLS6s+P1jHz7vGgFBhPDRAsTkxTjREsDE5O0JEOLFFOTJEujNKOkNEszE/Okv5sT0hoCGRncH1qxMjJAIIjPwlCSWlzCwAAAgZgggA==',
//   };

//   // const rtmToken = 'YOUR_RTM_TOKEN';
//   // const userId = 'USER_ID';

//   const rtmToken = '0064d76a039d253457cb82a097e396932d8IAC7v+1uJwp6wJpp6I+S2P0ibWKImtiCVhQBITqKK0ALRbuJbuwAAAAAEABp3WzgZh53ZgEA6AP22nVm';
//   const userId = '007eJxTYDjWp7e3WF748IK3GzzmLvd4/vCf8g7Gp00MsubbXHb/V1mqwGBimGhhYpJinGhpYGKSlmRokWJqkmRplGaUlGZpZmKe5LI5Ia0hkJEhq6SNgZGBFYgZGUB8FYZkS3PLROM0A13DZBMLXUPD1DTdRHMzY90k08REY+M0cwtjU2MAwdwnoQ==';


//   useEffect(() => {
//     const initRtm = async () => {
//       try {
//         const client = new RtmEngine();
//         setRtmClient(client);

//         await client.createInstance(connectionData.appId);
//         console.log('RTM Client created');

//         await client.login({ token: rtmToken, uid: userId });
//         // await client.loginV2(userId, connectionData.token);
//         console.log('RTM Client logged in');

//         client.on('messageReceived', (message, peerId) => {
//           console.log('Message received:', message);
//           setMessages(prevMessages => [
//             ...prevMessages,
//             { text: message.text, sender: peerId },
//           ]);
//         });

//         await client.joinChannel(connectionData.channel);
//         console.log('Joined channel');
//       } catch (error) {
//         console.error('RTM Initialization error:', error);
//       }
//     };

//     initRtm();

//     return () => {
//       rtmClient?.logout();
//       rtmClient?.destroyClient();
//     };
//   }, []);

//   const sendMessage = async () => {
//     try {
//       if (rtmClient && message.trim()) {
//         await rtmClient.sendMessageToChannel(connectionData.channel, {
//           text: message,
//         });
//         console.log('Message sent:', message);
//         setMessages(prevMessages => [
//           ...prevMessages,
//           { text: message, sender: userId },
//         ]);
//         setMessage('');
//       } else {
//         console.warn('RTM Client not initialized or message is empty');
//       }
//     } catch (error) {
//       console.error('Send message error:', error);
//     }
//   };

//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };

//   return videoCall ? (
//     <View style={{ flex: 1 }}>
//       <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
//       <View style={{ flex: 1, padding: 10 }}>
//         <FlatList
//           data={messages}
//           renderItem={({ item }) => (
//             <Text style={{ padding: 5, backgroundColor: item.sender === userId ? 'lightblue' : 'lightgray' }}>
//               {item.sender}: {item.text}
//             </Text>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//         <TextInput
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type your message"
//           style={{ borderColor: 'gray', borderWidth: 1, padding: 5, marginVertical: 10 }}
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   ) : (
//     <View style={{ backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
//       <Text
//         style={{ backgroundColor: 'green', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 12, color: 'white' }}
//         onPress={() => setVideoCall(true)}
//       >
//         Start Live Streaming
//       </Text>
//     </View>
//   );
// };

// export default App;

