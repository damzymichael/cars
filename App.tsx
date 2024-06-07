/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
// import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

type Todos = {id: number; title: string; completed: string};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState<Todos[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.nameText}>Todos</Text>
      {data.length
        ? data.slice(5).map((post, i) => (
            <View key={i} style={styles.todos}>
              <Text>{post.title}</Text>
            </View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Colors.lighter,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  nameText: {
    fontSize: 30,
    marginBottom: 100,
  },
  todos: {
    padding: 10,
    marginTop: 20,
  },
});

export default App;
