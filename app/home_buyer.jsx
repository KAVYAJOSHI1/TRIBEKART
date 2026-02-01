import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import Swiper from 'react-native-swiper';
import * as NavigationBar from "expo-navigation-bar";
import home_buyer_style from "../styles/home_buyer_style";
import { fetchProducts } from "../services/api";

// // import { db, auth} from "../services/firebaseConfig";
// import { collection, query, where, getDocs } from "firebase/firestore";

const ProductCard = ({ item, router }) => {
  return (
    <TouchableOpacity style={home_buyer_style.productCard} onPress={() => router.push({ pathname: "/buyer_item", params: { itemId: item.id } })}>
      <Image source={require("../assets/images/TestImage.jpg")} style={home_buyer_style.productImage}></Image>
      <Text style={home_buyer_style.productName}>{item.name}</Text>
      <Text style={home_buyer_style.productPrice}>₹{item.price}</Text>
      <Text style={home_buyer_style.productCreator}>By {item.sellerName || "Unknown Creator"}</Text>
    </TouchableOpacity>
  );
};

const HomeBuyer = () => {
  const router = useRouter();

  const [footerMarginBottom, setFooterMarginBottom] = useState(15);
  const isNavBarVisible = NavigationBar.useVisibility();

  const [selectedOption, setSelectedOption] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const swiperRef = useRef(null);

  useEffect(() => {
    const checkNavigationBar = async () => {
      const screenHeight = Dimensions.get("screen").height;
      const windowHeight = Dimensions.get("window").height;
      const navBarHeight = screenHeight - windowHeight;

      setFooterMarginBottom(navBarHeight >= 77 ? 45 : 15);
    };

    checkNavigationBar();
  }, [isNavBarVisible]);

  const fetchItems = async () => {
    // Fetch from Backend with Search and Filter
    const data = await fetchProducts(selectedOption, searchQuery);
    setItems(data);

    // For carousel, we might want to keep a separate "All" list, 
    // but for now let's just use the data. 
    // If search is empty and option all, update sortedItems for carousel too.
    if (searchQuery === "" && selectedOption === "All") {
      setSortedItems(data);
    }
  };

  // Debounce search or just fetch on change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedOption]);

  return (
    <>
      <View style={home_buyer_style.header}>
        <View style={home_buyer_style.headerTop}>
          <Text style={home_buyer_style.headTitle}>𝗗𝗶𝘀𝗰𝗼𝘃𝗲𝗿</Text>
          <TouchableOpacity onPress={() => router.push("/notification")}>
            <Image source={require("../assets/images/notification-logo.png")} style={home_buyer_style.notification}></Image>
          </TouchableOpacity>
        </View>

        <View style={home_buyer_style.headerBottom}>
          <View style={home_buyer_style.search}>
            <Image source={require("../assets/images/search-icon.png")} style={home_buyer_style.searchIcon}></Image>
            <TextInput style={home_buyer_style.searchTextBox} placeholder="Search for art..." placeholderTextColor={"#6B4226"} value={searchQuery} onChangeText={(text) => setSearchQuery(text)}></TextInput>
            <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
              <Image source={require("../assets/images/filter-icon.png")} style={home_buyer_style.filtericon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showFilters && (
        <View style={home_buyer_style.filterSection}>
          <TouchableOpacity style={selectedOption === "All" ? home_buyer_style.filterOptionSelected : home_buyer_style.filterOption} onPress={() => { setSelectedOption("All"); }}>
            <Text style={selectedOption === "All" ? home_buyer_style.filterTextSelected : home_buyer_style.filterText}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={selectedOption === "Paintings" ? home_buyer_style.filterOptionSelected : home_buyer_style.filterOption} onPress={() => { setSelectedOption("Paintings"); }}>
            <Text style={selectedOption === "Paintings" ? home_buyer_style.filterTextSelected : home_buyer_style.filterText}>Paintings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={selectedOption === "Fabrics" ? home_buyer_style.filterOptionSelected : home_buyer_style.filterOption} onPress={() => { setSelectedOption("Fabrics"); }}>
            <Text style={selectedOption === "Fabrics" ? home_buyer_style.filterTextSelected : home_buyer_style.filterText}>Fabrics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={selectedOption === "Statues" ? home_buyer_style.filterOptionSelected : home_buyer_style.filterOption} onPress={() => { setSelectedOption("Statues"); }}>
            <Text style={selectedOption === "Statues" ? home_buyer_style.filterTextSelected : home_buyer_style.filterText}>Statues</Text>
          </TouchableOpacity>

          <TouchableOpacity style={selectedOption === "Others" ? home_buyer_style.filterOptionSelected : home_buyer_style.filterOption} onPress={() => { setSelectedOption("Others"); }}>
            <Text style={selectedOption === "Others" ? home_buyer_style.filterTextSelected : home_buyer_style.filterText}>Others</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={home_buyer_style.body}>
        {searchQuery.trim() === "" && (
          <>
            <View style={home_buyer_style.carouselTitleView}>
              <Text style={home_buyer_style.carouselTitle}>Most sold items</Text>
            </View>

            <Swiper key={sortedItems.length} showsButtons={false} loop={true} showsPagination={false} height={260} autoplay={true} autoplayTimeout={3} ref={swiperRef}>
              {sortedItems.map((item, index) => (
                <TouchableOpacity key={index} style={home_buyer_style.carouselCard} onPress={() => router.push({ pathname: "/buyer_item", params: { itemId: item.id } })}>
                  <Image source={require("../assets/images/TestImage.jpg")} style={home_buyer_style.carouselImage}></Image>
                  <Text style={home_buyer_style.carouselName}>{item.name}</Text>
                  <Text style={home_buyer_style.carouselPrice}>₹{item.price}</Text>
                  <Text style={home_buyer_style.carouselCreator}>By {item.sellerName || "Unknown Creator"}</Text>
                </TouchableOpacity>
              ))}
            </Swiper>
          </>
        )}

        <View style={home_buyer_style.bodyView}>
          {items.length > 0 ? (
            items.map((item) => (
              <ProductCard key={item.id} item={item} router={router} />
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10, marginLeft: "35%", color: "#999999" }}>No results found</Text>
          )}
        </View>
      </ScrollView>

      <View style={[home_buyer_style.footer, { marginBottom: footerMarginBottom }]}>
        <TouchableOpacity style={home_buyer_style.footerIcon}>
          <Image source={require("../assets/images/home-icon.png")} style={home_buyer_style.homeIcon}></Image>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={home_buyer_style.footerIcon} onPress={() => router.push("./documentation")}>
          <Image source={require("../assets/images/documentation-icon.png")} style={home_buyer_style.homeIcon}></Image>
          <Text style={home_buyer_style.subsection}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={home_buyer_style.footerIcon} onPress={() => router.push("/cart")}>
          <Image source={require("../assets/images/cart-icon.png")} style={home_buyer_style.homeIcon}></Image>
          <Text style={home_buyer_style.subsection}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={home_buyer_style.footerIcon} onPress={() => router.push("/buyer_account")}>
          <Image source={require("../assets/images/user-icon.png")} style={home_buyer_style.homeIcon}></Image>
          <Text style={home_buyer_style.subsection}>Account</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default HomeBuyer;