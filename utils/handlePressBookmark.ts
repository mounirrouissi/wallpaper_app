import AsyncStorage from '@react-native-async-storage/async-storage';

import { ToastAndroid } from 'react-native';
import { Bookmark } from '../types';

export const handlePressBookmark = async (isBookmarked: boolean, setIsBookmarked: Function, setImageUrl: Function, imageUrl: string, wallpaper: any, param?: any) => {
    if (isBookmarked) {
      // Remove the bookmark
      setImageUrl('');
   
      // Remove the bookmark from local storage
      const bookmarksJSON = await AsyncStorage.getItem('bookmarks');
      const bookmarks = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
      const updatedBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.imageUrl !== imageUrl);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
   
      ToastAndroid.show('Removed from bookmarks', ToastAndroid.SHORT);
      return false; // Return false to indicate that the bookmark was removed
    } else {
      console.log("Bookmarks updated "+ wallpaper?.mainImage)
      // Add the bookmark
      setImageUrl(wallpaper.mainImage);
   
      // Save the bookmark to local storage
      const bookmarksJSON = await AsyncStorage.getItem('bookmarks');
      const bookmarks = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
      
      const newBookmark: Bookmark = {
        id: wallpaper.mainImage ,
        imageUrl: wallpaper.mainImage,
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
   
      ToastAndroid.show('Bookmark added', ToastAndroid.SHORT);
      return true; // Return true to indicate that the bookmark was added
    }
   };