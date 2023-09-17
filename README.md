# React Native - Working with data

# 1. Http in React Native
```javascript
import React, { useEffect, useState } from 'react';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
      );
      const json = await response.json();
      setData(json.menu);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      getMenu();
    }, []
  );

  return (...);
  }

```

# 2. Working with data formats
## 2.1. Convert a string to JSON in React Native
```javascript
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const [myJSON, setJsonObj] = useState([]);

  const convertStringToJson = () => {
    const myStr = '{
    "name": "Veggie Kabob",
    "price": "$12",
    "type": "Main Dish"
    }';
    const result = JSON.parse(myStr);
    setJsonObj(result);
  }

  useEffect(() =>{
    convertStringToJson();
  },[]);
   

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Little Lemon</Text>
      {myJSON && (
        <View style={styles.innerContainer}>
          <Text style={styles.itemText}>{'Menu Item: ' + myJSON.name}</Text>
          <Text style={styles.itemText}>{'Price: ' + myJSON.price}</Text>
          <Text style={styles.itemText}>{'Type: ' + myJSON.type}</Text>
        </View>
      )}
    </SafeAreaView>
  );
} 
```

## 2.2. Convert an array of Strings to JSON in React Native
```javascript
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const [myJSON, setJsonObj] = useState([]);

  const convertStringToJson = () => {
    const myStr =
      '[
            {
                "name": "Veggie Kabob",
                "price": "$12",
                "type": "Main Dish"
            },
            {
                "name": "Greek Salad",
                "price": "$7",
                "type": "Side"
            },
            {
                "name": "Black Tea",
                "price": "$3",
                "type": "Drink"
            }
        ]';

    const result = JSON.parse(myStr);
    setJsonObj(result);
  };

  useEffect(() => {
    convertStringToJson();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Little Lemon</Text>
      {myJSON &&
        myJSON.map((menuItem) => {
          return (
            <View style={styles.innerContainer}>
              <Text style={styles.itemText}>{'Menu Item: ' + menuItem.name}</Text>
              <Text style={styles.itemText}>{'Price: ' + menuItem.price}</Text>
              <Text style={styles.itemText}>{'Type: ' + menuItem.type}</Text>
            </View>
          );
        })}
    </SafeAreaView>
  );
}
```

# 3. Fetching Image with React Native
```javascript
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </View>
  );
};

export default DisplayAnImage;
```

# 4. AsyncStorage

## 4.1. Using the setItem Method
- When using setItem with an existing key, the value provided replaces the previously stored value, resulting in an override operation.
```javascript
const updatePreferences = async (userPreferences) => {
  try {
    const jsonValue = JSON.stringify(userPreferences)
    await AsyncStorage.setItem(“preferences”, jsonValue)
  } catch(e) {
   // Handle error
  }
}

const newPreferences = {
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: true
}; 

updatePreferences(newPreferences);
```
## 4.2. Using the mergeItem Method
-  this requires the updated values to be passed and not the whole object. That’s convenient if you prefer to perform the merging operation manually.
```javascript
const mergePreferences = async (userPreferences) => {
  try {
    const jsonValue = JSON.stringify(userPreferences)
    await AsyncStorage.mergeItem('preferences', jsonValue)
  } catch(e) {
   // Handle error
  }
} 

const newPreferences = {
  smsNotifications: true
}; 

mergePreferences(newPreferences);
```

## 4.3. Using the removeItem Method
- When it comes to deleting data, AsyncStorage offers the removeItem API, which removes data under a given key. For example, if the user wants to reset the application data, you can clean up everything that was in storage by using removeItem API method. Following the example of user preferences, explore the code below to discover how this is done.
```javascript
const deletePreferences = async () => {
  try {
    await AsyncStorage.removeItem('preferences')
  } catch(e) {
   // Handle error
  }
} 

deletePreferences();
```

## 4.4. Editing Multiple Entries with multi
> All three methods explored till now only support operating under a single key.

> In some cases, you may want to perform operations in batches to either save, update, read or delete multiple entries in one single API call.

> For these specific APIs, the word multi is used at the beginning as the convention. APIs for multiple entries are as follows: multiGet, multiSet, multiMerge, and multiRemove.

> You can learn more about them in the additional resources of this lesson.


## 4.5. Deleting all Data

```javascript
clearAllData = async () => {
 try {
   await AsyncStorage.clear()
 } catch(e) {
   // Handle error
 }
}
```
# 5. Reading
- [Fetching images in React Native](https://reactnative.dev/docs/image)
- [JSON Mock API and Mock response](https://beta.reactjs.org/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy)
- [SQL Tutorial - SQL Cheat Sheet](https://www.sqltutorial.org/wp-content/uploads/2016/04/SQL-cheat-sheet.pdf)