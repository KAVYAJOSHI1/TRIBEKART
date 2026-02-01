import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import faq_style from "../styles/faq_style";

const Card = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity style={faq_style.card} onPress={() => setExpanded(!expanded)}>
      <View style={faq_style.cardHeader}>
        <Text style={faq_style.cardQuestion}>{question}</Text>
        <Image source={expanded ? require("../assets/images/up-arrow.png") : require("../assets/images/down-arrow.png")} style={faq_style.arrowIcon}></Image>
      </View>
      {expanded && <Text style={faq_style.cardAnswer}>{answer}</Text>}
    </TouchableOpacity>
  );
};

const Fyp = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("General");

  // Static FAQ Data
  const faqData = {
    general: [
      { question: "What is TribeKart?", answer: "TribeKart is a marketplace for authentic tribal art and products." },
      { question: "How do I search for products?", answer: "Use the search bar on the home page to find specific items." },
      { question: "Are the products authentic?", answer: "Yes, we verify all our sellers to ensure authenticity." }
    ],
    account: [
      { question: "How do I reset my password?", answer: "Go to the Login page and click 'Forgot Password'." },
      { question: "Can I change my email?", answer: "Yes, you can update your details in the 'My Details' section." }
    ],
    service: [
      { question: "How long does shipping take?", answer: "Usually 5-7 business days depending on your location." },
      { question: "Do you offer international shipping?", answer: "Currently, we only ship within India." }
    ],
    payment: [
      { question: "What payment methods are accepted?", answer: "We accept Credit/Debit cards, UPI, and Wallet payments." },
      { question: "How do I add money to my wallet?", answer: "Go to 'Payment Methods' in your account and click 'Add to Wallet'." },
      { question: "Is my payment information safe?", answer: "Yes, we use secure encryption for all transactions." }
    ]
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  }

  const displayedCards = faqData[selectedOption.toLowerCase()] || [];

  return (
    <View style={faq_style.container}>
      <View style={faq_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={faq_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={faq_style.headerText}>𝗙𝗔𝗤𝘀</Text>
      </View>

      <View style={faq_style.bar}>
        <View style={faq_style.barLine}></View>
      </View>

      <View style={faq_style.filterSection}>
        <TouchableOpacity style={selectedOption === "General" ? faq_style.filterOptionSelected : faq_style.filterOption} onPress={() => handleOptionPress("General")}>
          <Text style={selectedOption === "General" ? faq_style.filterTextSelected : faq_style.filterText}>General</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Account" ? faq_style.filterOptionSelected : faq_style.filterOption} onPress={() => handleOptionPress("Account")}>
          <Text style={selectedOption === "Account" ? faq_style.filterTextSelected : faq_style.filterText}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Service" ? faq_style.filterOptionSelected : faq_style.filterOption} onPress={() => handleOptionPress("Service")}>
          <Text style={selectedOption === "Service" ? faq_style.filterTextSelected : faq_style.filterText}>Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Payment" ? faq_style.filterOptionSelected : faq_style.filterOption} onPress={() => handleOptionPress("Payment")}>
          <Text style={selectedOption === "Payment" ? faq_style.filterTextSelected : faq_style.filterText}>Payment</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={faq_style.cardsContainer}>
        {displayedCards.map((card, index) => (<Card key={index} question={card.question} answer={card.answer} />))}
      </ScrollView>
    </View>
  );
}

export default Fyp;