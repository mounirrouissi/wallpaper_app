import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { COLORS } from '../../constants/theme';
import MansonaryLayout from '../MansonaryLayout/MansonaryLayout';
import { getAllImage } from '../../sanity';
import * as FileSystem from 'expo-file-system';
import { downloadImages, fetchImages } from '../../utils/worker';
import { ItemData } from '../../types';




const ImgGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allImage, setAllImage] = useState<ItemData[]>([]);



  useEffect(() => {

    const fetchData = async () => {
      // const recentImages: ItemData[] = await downloadImages(1, 10, 'https://islamic.mounirrouissi2.workers.dev');
      await fetchImages("latest","https://pub-98e34cc997934a94a4ed71d869048f88.r2.dev").then((images: ItemData[]) => {
        console.log("  recentImages", images)

        setAllImage(images);
      })
      
    }

    fetchData();
    setIsLoading(false);
  }, []);

 

  return (
    <ScrollView
      style={{ width: '100%', height: '100%', paddingHorizontal: 4 }}

    >

      {allImage ? (


        <MansonaryLayout data={allImage}/>
      ) : (
        <ActivityIndicator color={COLORS.tertiary} size='large' />
      )}
    </ScrollView>
  );
};





export default ImgGrid;
