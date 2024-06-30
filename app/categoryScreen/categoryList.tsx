import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ViewStyle, TextStyle, ActivityIndicator, Image, ImageBackground, Pressable, useColorScheme } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link, Stack, useNavigation, useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../constants/theme';
// import { getCategory, urlFor } from '../../sanity';
import Colors from '../../constants/Colors';
import { mosqueImage, ayaImage } from '../../constants/images';
import { Categories, imageMap } from '../../utils';


interface Category {
  _id: number;
  title: string;
  enTitle?: string;
  image: any;
}

const SearchBtn = () => {

  const router = useRouter();
  const navigation = useNavigation();
  const [activeWallpaperType, setActiveWallpaperType] = useState("Trending");
  const [categories, setCategories] = useState<Category[]>([]); // Specify the type of categories as Category[]
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Loading category list from backend
 
      setCategories(Categories);
      setLoading(false);
   
  }, []);

  const tabStyle = (activeWallpaperType: string, item: any): ViewStyle => ({
    paddingVertical: SIZES.xxLarge / 2,
    paddingHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xxLarge,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: activeWallpaperType === item.name ? COLORS.secondary : COLORS.tertiary,
    backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', // Change background color based on theme
   });

  const tabTextStyle = (activeWallpaperType: string, item: any): TextStyle => ({
    color: activeWallpaperType === item.name ? COLORS.secondary : COLORS.tertiary,
  });

  const renderCategoryTab = ({ item }: { item: Category }) => (
    
    
    <TouchableOpacity
    delayPressIn={40}
      style={styles.tabWrapper}
      onPress={() => {
        setActiveWallpaperType(item.title);
        router.push(`/category/${item.enTitle}`);
      }}
    >
      <ImageBackground
        
        source={item.enTitle ? imageMap[item.enTitle] : undefined}

        style={[styles.tab, tabStyle(activeWallpaperType, item)]}
      >
        <Text style={[styles.tabText, tabTextStyle(activeWallpaperType, item)]}>
          {item.title.toUpperCase()}
        </Text>
      </ImageBackground>
    </TouchableOpacity>




  );
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>

<Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          },
          headerLeft: () => (
            <Pressable onPress={() => {
              navigation.goBack();
            }}>
              {({ pressed }) => (
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 8, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerTitle: 'Categories List',
      
        }}
      />
      {/* Scrollable flat list category */}
      <View style={styles.tabsContainer}>
     {loading ? (
       <View style={styles.loadingContainer}>
         <ActivityIndicator color={COLORS.tertiary} size="large" />
       </View>
     ) : (
       <FlatList
         data={categories}
         renderItem={renderCategoryTab}
         keyExtractor={(item) => item._id.toString()}
         horizontal={false} // Add this line to make the list scroll horizontally
         showsHorizontalScrollIndicator={false} // Add this line to hide the horizontal scroll indicator
         contentContainerStyle={{ paddingHorizontal: 10 }} // Add this line to add space at the ends of the list
       />
     )}
   </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Align content in the middle of the screen
  },
  tabsContainer: {
    flex: 1,
    marginTop: SIZES.small,
  },
  tabWrapper: {
    marginLeft: 10,
    marginRight: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 0,
    borderColor: COLORS.gray2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 'auto',
    height: 120,
  },
  tabText: {
    color: COLORS.tertiary,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 2,
    
    fontSize: 22,
    fontWeight: '900',
    
    bottom: 0,
    right: 0,
    padding: 10,
    
    zIndex: 1,
  
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBtn;
