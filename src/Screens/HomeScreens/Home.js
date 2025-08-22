import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useAppContext } from '../../Context/AppContext';
import Header from '../../component/Header';


import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.webp';

const categories = ['ALL', 'Face', 'Body', 'Hair'];

const bestsellers = [
  {
    id: '1',
    name: 'Face Set',
    price: '$180.00',
    image: img2,
  },
  {
    id: '2',
    name: 'Body Set',
    price: '$155.00',
    image: img3,
  },
  {
    id: '3',
    name: 'Best Scrubs',
    price: '$190.00',
    image: img4,
  },
];

const HomeScreen = ({navigation}) => {
  const { user } = useAppContext();
  console.log('user in HomeScreen:', user);
  
  const flatListRef = useRef(null);

   const scrollLeft = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const scrollRight = () => {
    flatListRef.current?.scrollToOffset({ offset: 300, animated: true });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
     
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.email || 'Guest'}</Text>
          <Text style={styles.subTitle}>Find your beauty products</Text>
        </View>
        <TouchableOpacity>
          <Feather name="bell" size={22} color="#000" />
        </TouchableOpacity>
      </View>

   
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.filterBtn}>
          <AntDesign name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

 
      <View style={styles.banner}>
        <Image
          source={require('../../images/img1.jpg')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>New product for your skin</Text>
          <TouchableOpacity  onPress={()=>navigation.navigate('Menu')} style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>

    
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categories}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={[styles.categoryBtn, index === 0 && styles.activeCategory]}>
            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

 
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bestsellers</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={scrollLeft}>
          <AntDesign name="leftcircle" size={30} color="#ff6b6b" />
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          horizontal
          data={bestsellers}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.productImage} resizeMode="contain" />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          )}
        />

        <TouchableOpacity onPress={scrollRight}>
          <AntDesign name="rightcircle" size={30} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subTitle: {
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  filterBtn: {
    backgroundColor: '#fdb531',
    marginLeft: 10,
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  bannerText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  shopNowBtn: {
    backgroundColor: '#fdb531',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    cursor: 'pointer',
   
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  seeAll: {
    color: '#ff6b6b',
    fontWeight: '500',
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#333',
  },
  activeCategory: {
    backgroundColor: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#a8737356',
    borderRadius: 18,
    padding: 10,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#555',
  },
});
