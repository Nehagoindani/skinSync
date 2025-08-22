import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useAppContext } from '../../Context/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const WishlistScreen = () => {
  const { wishlist } = useAppContext();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Ionicons name="heart" size={24} color="red" style={{ marginTop: 5 }} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 12 }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Image source={require('../../images/logo.png')} style={{ width: 150, height: 50 }} resizeMode="contain" />
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF6B6B',
           marginTop: 30 }}>Wishlist</Text>
      </View>

      {wishlist.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 16 }}>Your wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, margin: 8, width: width / 2 - 24, alignItems: 'center' },
  image: { width: 80, height: 80, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  price: { fontSize: 14, color: '#555' },
});
