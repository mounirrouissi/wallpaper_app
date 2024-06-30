import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


//grid one
const grid = [
  {
    id: 1,
    name: "Maths",
    image: require("../assets/home/calculator.png"),
    topic: "3 Topics",
    background: "#FBBEBE",
    component: "Maths",
  },
  {
    id: 2,
    name: "Science",
    image: require("../assets/home/science.png"),
    topic: "3 Topics",
    background: "#FF5400",
    component: "Science",
  },
  {
    id: 3,
    name: "Music",
    image: require("../assets/home/music.png"),
    topic: " 5 Songs",
    background: "#FFBD00",
    component: "Music",
  },
  {
    id: 4,
    name: "Painting",
    image: require("../assets/home/paint.png"),
    topic: " 8 Topics",
    background: "#6C63FF",
    component: "Painting",
  },
];

//grid two
const grid2=[
  {
    id: 5,
    name: "Languages",
    image: require("../assets/home/languages.png"),
    topic: " 7 Topics",
    background: "#FD5467",
    component: "Languages",
  },
  {
    id: 6,
    name: "Stories",
    image: require("../assets/home/stories.png"),
    topic: " 9 Topics",
    background: "#00A5A0",
    component: "Stories",
  },
]

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Perform search operations here
  };

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const isAfterNoon = hours >= 12;

    if (isAfterNoon) {
      setGreeting("Hi, Good Evening");
    } else {
      setGreeting("Hi, Good Morning");
    }
  }, []);

  return (
    <ScrollView style={styles.all}>
    <View>
      <Text
      style={{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 50,
      }}
    >
      {greeting}
    </Text>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search..."
          placeholderTextColor="#fff"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.container}>
        {grid.map((item) => (
          // <TouchableWithoutFeedback
          // >
          <TouchableOpacity
            key={item.id}
            style={[styles.grid, { backgroundColor: item.background }]} onPress={() => navigation.navigate(item.component)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
              <Image source={item.image} style={styles.image} />
            </View>
            <Text style={styles.topic}>{item.topic}</Text>
          </TouchableOpacity>
          // </TouchableWithoutFeedback>
        ))}

        {grid2.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.grid2, { backgroundColor: item.background }]} onPress={() => navigation.navigate(item.component)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
              <Image source={item.image} style={styles.image} />
            </View>
            <Text style={styles.topic}>{item.topic}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.nav}>
          <TouchableOpacity>
            <Image source={require('../assets/home/home.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/home/fav.png')} style={styles.navIcon} />
          </TouchableOpacity>
      </View> */}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    // padding: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 20,
    margin: 20,
  },
  searchBar: {
    backgroundColor: "#3a3a3a",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  searchInput: {
    fontSize: 16,
    color: "#000",
  },
  grid: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    margin: "1%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1e1e1e",
  },
  grid2: {
    width: "98%",
    backgroundColor: "#fff",
    padding: 20,
    margin: "1%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1e1e1e",
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 30,
  },
  topic: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 15,
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#121212',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  navIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 80,
    // backgroundColor: '#fff',
  }
});