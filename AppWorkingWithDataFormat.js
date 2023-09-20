import { FlatList, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import MenuItems from './menuItems.json'

export default App = () => {
  // console.log(MenuItems)
  const Item = ({title, price}) => {
    return(
      <View style={menuStyles.innerTextBlock}>
        <Text style={menuStyles.innerText}>{title}</Text>
        <Text style={menuStyles.innerText}>{'$' + price}</Text>
      </View>
    );
  };

  const renderItem = ({item}) => <Item title={item.title} price = {item.price} />;

  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon Menu</Text>
      <FlatList
        data={MenuItems.menu}
        renderItem={renderItem}
        // keyExtractor={({index}) => index}
        />
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#495E57',
  },
  headerText: {
    color: '#F4CE14',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  innerTextBlock : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#495E57',
    // marginVertical: 10,
    padding: 14,
  },
  innerText: {
    fontSize: 22,
    color: '#F4CE14',
  },
});
