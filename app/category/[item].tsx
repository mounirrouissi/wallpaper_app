import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, useColorScheme } from 'react-native';
import { Stack, useNavigation, useSearchParams } from 'expo-router';
import MansonaryLayout from './../../components/MansonaryLayout/MansonaryLayout';
import { COLORS } from '../../constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { getCategoryItemmsById } from '../../sanity';
import { ItemData } from '../../types';
import { fetchImages } from '../../utils/worker';


const Category = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const param = useSearchParams();
  const enTitle = param.item?.toString();
  const [getCategoryItem, setGetCategoryItem] = useState<ItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(enTitle)
    // Loading category base Image from backend
    if (enTitle) {
      setIsLoading(true);


/* aya =>https://pub-921e333fbb094f9a96a3c1932042de66.r2.dev
mosques =>https://pub-2302df9ae49f407c9ed568df76beecb3.r2.dev */

      let url=""

      switch (enTitle) {
        case 'ayat':
           url="https://pub-921e333fbb094f9a96a3c1932042de66.r2.dev"
           break;
        case 'mosques':
           url="https://pub-2302df9ae49f407c9ed568df76beecb3.r2.dev"
           break
        case 'islamicart':
           url="https://pub-48773643530e418ba1890bd6b1dae01c.r2.dev" 
           break;
        case 'galaxy':
          url="https://pub-15709f36d7134c779505c7c54be4420f.r2.dev"  
          break;
        case 'church':
           url="https://pub-88ce66b8f39e49f295362d8650c57e95.r2.dev"      
        break;
        case 'synagogue':
           url="https://pub-0e4c8cf34d0949eaa37f9d4270b1ecac.r2.dev"
           break;
        case 'nature':
           url="https://pub-1632a2ecf2714467a7496a139db56385.r2.dev"
           break;
           default:
            url:""
           

      }
      console.log("url: " + url)
      fetchImages(enTitle,url)


        .then((data) => 
        setGetCategoryItem(data)
        )
        .catch((err) => alert(err))
        .finally(() => setIsLoading(false));
    }
   }, [enTitle]);

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 4,
        paddingVertical: 4,
        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
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
          headerTitle: 'Categories',
        }}
      />

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={COLORS.tertiary} size="large" />
        </View>
      ) : (
        <>
          {getCategoryItem.length > 0 ? (
            <MansonaryLayout data={getCategoryItem} />
          ) : (
            <Text>No Item Found ..</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Category;
