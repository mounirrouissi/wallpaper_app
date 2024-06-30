import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, Pressable, ToastAndroid } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Link, useNavigation, useRouter } from 'expo-router';
import MasonryList from '@react-native-seoul/masonry-list';
import { urlFor } from '../../sanity';
import { Entypo, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark } from '../../app/images/[id]';
import { handlePressBookmark } from '../../utils/handlePressBookmark';
import { ItemData } from '../../types';



type MansonaryLayoutProps = {
  data: ItemData[];
};

const MansonaryLayout = ({ data }: MansonaryLayoutProps) => {
  const [isLoadingNext, setIsLoadingNext] = useState(false);


  console.log( "data", data );


  return (
    <View style={{ flex: 1 }}>
      
      <MasonryList
        data={data}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardItem data={item as ItemData} />}
        refreshing={isLoadingNext}
        onEndReachedThreshold={0.1}
      />
      {isLoadingNext && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', }}>
          <ActivityIndicator color={COLORS.tertiary} size='large' />
        </View>
      )}
    </View>
  );
};

type CardItemProps = {
  data: ItemData | unknown;
};

const CardItem = ({ data }: CardItemProps) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  /* const handlePressBookmark = async () => {
    if (isBookmarked) {
      // Remove the bookmark
      setIsBookmarked(false);
      setImageUrl('');
  
      // Remove the bookmark from local storage
      const bookmarksJSON = await AsyncStorage.getItem('bookmarks');
      const bookmarks = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
      const updatedBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.imageUrl !== imageUrl);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  
      ToastAndroid.show('Removed from bookmarks', ToastAndroid.SHORT);
    } else {
      // Add the bookmark
      setIsBookmarked(true);
      // setImageUrl(urlFor(getMainImage[0].mainImage).url());
  
      // Save the bookmark to local storage
      const bookmarksJSON = await AsyncStorage.getItem('bookmarks');
      const bookmarks = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
      // const id = param.id?.toString(); // Assuming the 'id' is obtained from 'param'
      const id = ""; // Assuming the 'id' is obtained from 'param'
      const newBookmark: Bookmark = {
        id: id ,
        
        imageUrl: "",
        // likes: 1,
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  
      ToastAndroid.show('Bookmark added', ToastAndroid.SHORT);
    }
  }; */
  // Explicitly cast data to ItemData
  const itemData = data as ItemData;

  return (
    <View style={{ borderRadius: 20, overflow: 'hidden' }}>
  <View style={{ marginBottom: 10 , zIndex:100,position: 'absolute', top: 20, right: 10}}>
  <Pressable onPress={async()=>{
 const result = await handlePressBookmark(isBookmarked, setIsBookmarked, setImageUrl, itemData.mainImage, itemData, "");
 setIsBookmarked(result);
}}>
 <View
   style={{
     height: 45,
     width: 45,
     borderRadius: 10,
     justifyContent: 'center',
     alignItems: 'center',
     shadowColor: COLORS.tertiary,
     shadowOpacity: 0.8,
     shadowOffset: { width: 0, height: 2 },
     shadowRadius: 4,
     elevation: 5,
     backgroundColor: isBookmarked ? 'red' : "transparent",
   }}
 >
   <Entypo name="heart-outlined" size={35} color={COLORS.tertiary} />
 </View>
</Pressable>
              </View>
      <TouchableOpacity
        style={{
          height: Math.round(Math.random() * 100 + 200),
          margin: 4,
        }}
        onPress={async() => {
          await AsyncStorage.setItem('itemData', JSON.stringify(itemData));
            router.push(`/images/${itemData._id}`);

        }}
      >
        {/* <Entypo name="heart-outlined" size={35} color={COLORS.tertiary} style={{  }} /> */}
        <Image
          // source={{ uri: urlFor(itemData.mainImage).url() }}
          source={{ uri: itemData.mainImage }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover', margin: 10, marginLeft: 5, padding: 5, marginBottom: 5 }}
        />
      </TouchableOpacity>
    </View>

  );
};

export default MansonaryLayout;
