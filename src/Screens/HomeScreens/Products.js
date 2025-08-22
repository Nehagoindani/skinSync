import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useAppContext } from '../../Context/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const products = [
  { id: '1', name: 'Body Set', price: 155, image: require('../../images/img3.jpg'), category: 'Body' },
  { id: '2', name: 'Face Serum', price: 89, image: require('../../images/img1.jpg'), category: 'Face' },
  { id: '3', name: 'Night Cream', price: 119, image: require('../../images/img2.jpg'), category: 'Face' },
  { id: '4', name: 'Vitamin C Gel', price: 75, image: require('../../images/img6.jpg'), category: 'Face' },
  { id: '5', name: 'Aloe Vera Gel', price: 60, image: require('../../images/img7.jpg'), category: 'Body' },
  { id: '6', name: 'Sunscreen SPF 50', price: 99, image: require('../../images/img4.jpg'), category: 'Face' },
  { id: '7', name: 'Shampoo', price: 45, image: require('../../images/img0.jpg'), category: 'Hair' },
  { id: '8', name: 'Conditioner', price: 55, image: require('../../images/img8.jpg'), category: 'Hair' },
  { id: '9', name: 'Hair Oil', price: 70, image: require('../../images/img9.jpg'), category: 'Hair' },
  { id: '10', name: 'Body Lotion', price: 65, image: require('../../images/img10.jpg'), category: 'Body' },
];

const categories = ['ALL', 'Face', 'Body', 'Hair'];

const ProductsScreen = ({ navigation }) => {
  const { cart, setCart, wishlist, setWishlist } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const addToCart = (product) => {
    const exists = cart.some((p) => p.name === product.name);
    if (!exists) setCart([...cart, { ...product, quantity: 1 }]);
    else setCart(cart.map(p => p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((p) => p.name === product.name);
    if (!exists) setWishlist([...wishlist, product]);
    else setWishlist(wishlist.filter((p) => p.name !== product.name));
  };

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const renderProduct = ({ item }) => {
    const liked = wishlist.some((p) => p.name === item.name);
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleWishlist(item)} style={styles.heartBtn}>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? 'red' : '#555'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
  
      <View style={styles.header}>
        <Image source={require('../../images/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} style={{ marginRight: 16 }}>
            <Ionicons name="heart-outline" size={28} color="#000" />
            {wishlist.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{wishlist.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={28} color="#000" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

    
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, selectedCategory === cat && styles.activeCategory]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  header: { padding: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  logo: { width: 150, height: 50 },
  iconsContainer: { position: 'absolute', right: 16, flexDirection: 'row' },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 12, marginBottom: 10 },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, margin: 8, width: width / 2 - 24, alignItems: 'center', elevation: 2 },
  image: { width: 80, height: 80, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  price: { fontSize: 14, color: '#555', marginBottom: 10 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  button: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, flex: 1, marginRight: 8 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  heartBtn: { padding: 4 },
  categories: { flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10 },
  categoryBtn: { paddingVertical: 6, paddingHorizontal: 15, backgroundColor: '#f2f2f2', borderRadius: 20, marginRight: 10 },
  activeCategory: { backgroundColor: '#000' },
  categoryText: { color: '#333' },
  activeCategoryText: { color: '#fff' },
  cartBadge: { position: 'absolute', right: -6, top: -6, backgroundColor: 'red', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 2 },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});
