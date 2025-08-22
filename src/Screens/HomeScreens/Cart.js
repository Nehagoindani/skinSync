import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useAppContext } from '../../Context/AppContext';

const CartScreen = () => {
  const { cart, setCart } = useAppContext();


  const increaseQty = (item) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };


  const decreaseQty = (item) => {
    setCart((prevCart) =>
      prevCart
        .map((p) =>
          p.name === item.name
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };


  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>

      <View style={styles.qtyRow}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => decreaseQty(item)}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => increaseQty(item)}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          <View style={styles.checkoutBar}>
            <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => alert('Proceeding to Checkout...')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 8 },
  details: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#555', marginVertical: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: '#ddd', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  qty: { fontSize: 16, marginHorizontal: 10, minWidth: 20, textAlign: 'center' },
  checkoutBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd',
  },
  total: { fontSize: 18, fontWeight: '600' },
  checkoutBtn: { backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#555' },
});
