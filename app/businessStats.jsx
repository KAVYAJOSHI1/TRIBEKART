
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import businessStats_style from "../styles/businessStats_style";
import { fetchSellerStats } from "../services/api";

const screenWidth = Dimensions.get("window").width;

const initialCategoryData = [
  { name: "Paintings", count: 0, color: "#FF6384" },
  { name: "Fabrics", count: 0, color: "#36A2EB" },
  { name: "Statues", count: 0, color: "#FFCE56" },
  { name: "Other", count: 0, color: "#4BC0C0" },
];

const BusinessStats = () => {
  const router = useRouter();

  const [totalRevenue, setTotalRevenue] = useState(0.0);
  const [totalItemSold, setTotalItemSold] = useState(0);

  const [itemStats, setItemStats] = useState([]);
  const [categoryData, setCategoryData] = useState(initialCategoryData);

  const fetchStats = async () => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const data = await fetchSellerStats(user.id);
            if (data) {
              setTotalRevenue(data.totalRevenue || 0);
              setTotalItemSold(data.totalItemsSold || 0);

              // Map category data to chart format
              // Default colors for known categories
              const colors = { 'painting': '#FF6384', 'fabric': '#36A2EB', 'statue': '#FFCE56', 'other': '#4BC0C0' };

              // If no data, use initial
              if (!data.categoryData || data.categoryData.length === 0) {
                setCategoryData(initialCategoryData);
              } else {
                const newCatData = data.categoryData.map(c => ({
                  name: c.category.charAt(0).toUpperCase() + c.category.slice(1),
                  count: c.count,
                  color: colors[c.category] || '#999',
                  legendFontColor: "#000",
                  legendFontSize: 14
                }));
                setCategoryData(newCatData);
              }

              setItemStats(data.itemStats || []);
            }
          } else {
            router.dismissAll();
          }
        });
      });
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <View style={businessStats_style.container}>
      <View style={businessStats_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={businessStats_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={businessStats_style.headerText}>𝗕𝘂𝘀𝗶𝗻𝗲𝘀𝘀 𝗦𝘁𝗮𝘁𝘀</Text>
      </View>

      <ScrollView>
        <View style={businessStats_style.overallStatsView}>
          <Text style={businessStats_style.overallStatsText}>Total Revenue: ₹{totalRevenue.toFixed(1)}</Text>
          <Text style={businessStats_style.overallStatsText}>Total items sold: {totalItemSold}</Text>
        </View>

        <Text style={businessStats_style.cardTitle}>Item Stats (Completed Orders):</Text>
        {itemStats.map((item, index) => (
          <View key={index} style={businessStats_style.itemCard}>
            <Text style={businessStats_style.itemName}>{item.name}</Text>
            <Text style={businessStats_style.itemAmount}>price: ₹{item.price}</Text>
            <Text style={businessStats_style.itemAmount}>sold: {item.amountSold}</Text>
          </View>
        ))}

        <Text style={businessStats_style.cardTitle2}>Category sold:</Text>
        <PieChart data={categoryData.map((item) => ({ name: item.name, population: item.count, color: item.color, legendFontColor: "#000", legendFontSize: 14 }))} width={screenWidth - 30} height={220} chartConfig={{ color: () => "#000" }} accessor={"population"} backgroundColor="transparent" paddingLeft="15" />
      </ScrollView>
    </View>
  );
};

export default BusinessStats;