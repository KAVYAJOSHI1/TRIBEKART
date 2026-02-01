import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import documentation_style from "../styles/documentation_style";

const Documentation = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Static Data for "History of Tribal Products"
  const tribalData = [
    {
      id: "1",
      title: "Warli Painting",
      history: "Warli painting is a style of tribal art mostly created by the tribal people from the North Sahyadri Range in Maharashtra, India. It dates back to 2500-3000 BC.",
      materials: "Rice paste, water, and gum on red ochre walls.",
      process: "Basic geometric shapes like circles, triangles, and squares are used to represent nature and human life.",
      cultural: "It depicts social life, harvesting, and weddings, reflecting the tribe's deep connection with nature.",
      region: "Maharashtra, India",
      artist: "Jivya Soma Mashe (Legendary Artist)",
      availability: "Widely available on canvas, pots, and walls.",
      video: "https://www.youtube.com/embed/N9I/a-yKksw" // Example Video ID (Correct format for Embed)
    },
    {
      id: "2",
      title: "Dhokra Art",
      history: "Dhokra is non-ferrous metal casting using the lost-wax casting technique. This sort of metal casting has been used in India for over 4,000 years.",
      materials: "Brass, Beeswax, Clay.",
      process: "A clay core is covered with wax designs, then covered with clay again and baked. Molten metal replaces the wax.",
      cultural: "Used for making idols, jewelry, and utility items.",
      region: "West Bengal, Odisha, Jharkhand",
      artist: "Traditional Dhokra Artisans",
      availability: "Specialized handicraft markets.",
      video: "https://www.youtube.com/embed/S2p0oU1qwKI"
    },
    {
      id: "3",
      title: "Madhubani Art",
      history: "Also known as Mithila art, it originated in the Mithila region of India and Nepal. It is characterized by eye-catching geometrical patterns.",
      materials: "Natural dyes and pigments, twigs, nib-pens.",
      process: "Paintings are done on freshly plastered mud walls and floors of huts, now also on cloth and canvas.",
      cultural: "Depicts mythology, royal court scenes, and weddings.",
      region: "Bihar, India",
      artist: "Sita Devi, Ganga Devi",
      availability: "Globally recognized and available.",
      video: "https://www.youtube.com/embed/e1S02A7w3Xo"
    }
  ];

  const [filteredDocuments, setFilteredDocuments] = useState(tribalData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredDocs = tribalData.filter((document) => {
      return document.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDocuments(filteredDocs);
  };

  return (
    <>
      <View style={documentation_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={documentation_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={documentation_style.headerText}>𝗘𝘅𝗽𝗹𝗼𝗿𝗲 𝗜𝗻𝗱𝗶𝗮𝗻 𝗔𝗿𝘁</Text>
      </View>

      <View style={documentation_style.headerBottom}>
        <View style={documentation_style.search}>
          <Image source={require("../assets/images/search-icon.png")} style={documentation_style.searchIcon}></Image>
          <TextInput style={documentation_style.searchTextBox} placeholder="Search for art..." placeholderTextColor={"#5D4037"} value={searchQuery} onChangeText={handleSearch}></TextInput>
        </View>
      </View>

      <View style={documentation_style.bar}>
        <View style={documentation_style.barLine}></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {filteredDocuments.length === 0 ? (
          <View style={documentation_style.statusView}>
            <Text style={documentation_style.statusText}>No search results</Text>
          </View>
        ) : (
          filteredDocuments.map((document) => (
            <View key={document.id} style={documentation_style.card}>
              <Image source={require("../assets/images/TestImage.jpg")} style={documentation_style.cardImage} />
              <Text style={documentation_style.cardTitle}>{document.title}</Text>

              <View style={{ padding: 10 }}>
                <Text style={documentation_style.cardText}><Text style={{ fontWeight: 'bold' }}>𝗛𝗶𝘀𝘁𝗼𝗿𝘆: </Text>{document.history}</Text>
                <Text style={documentation_style.cardText}><Text style={{ fontWeight: 'bold' }}>𝗠𝗮𝘁𝗲𝗿𝗶𝗮𝗹: </Text>{document.materials}</Text>
                <Text style={documentation_style.cardText}><Text style={{ fontWeight: 'bold' }}>𝗣𝗿𝗼𝗰𝗲𝘀𝘀: </Text>{document.process}</Text>
                <Text style={documentation_style.cardText}><Text style={{ fontWeight: 'bold' }}>𝗖𝘂𝗹𝘁𝘂𝗿𝗮𝗹 𝗦𝗶𝗴𝗻𝗶𝗳𝗶𝗰𝗮𝗻𝗰𝗲: </Text>{document.cultural}</Text>
                <Text style={documentation_style.cardText}><Text style={{ fontWeight: 'bold' }}>𝗥𝗲𝗴𝗶𝗼𝗻: </Text>{document.region}</Text>
              </View>

              <View style={{ height: 200, marginTop: 10, width: '100%' }}>
                <WebView
                  source={{ uri: document.video }}
                  style={{ flex: 1 }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsInlineMediaPlayback={true}
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
}

export default Documentation;