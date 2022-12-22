import { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { useStoreGamePin } from "../store/MovieFilter";
import { COLORS } from "../values/colors";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const Highscore = ({ navigation }: any) => {
  const gamePinToGroup = useStoreGamePin((state) => state.gamePin);
  const [isLoading, setIsLoading] = useState(true);
  const [posterURL, setPosterURL] = useState<string[]>();
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles/",
    headers: {
      "X-RapidAPI-Key": "edab4e7123msh8344a8f5fa69601p18c787jsnfaff8cc039db",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  function countElements(lst: any[]): { [key: string]: number } {
    const count: { [key: string]: number } = {};
    for (const element of lst) {
      if (element in count) {
        count[element]++;
      } else {
        count[element] = 1;
      }
    }
    return count;
  }

  async function getMoviePosters(toplist: string[]) {
    const posters: string[] = [];
    toplist.forEach(async (val) => {
      const posterUrl = "https://moviesdatabase.p.rapidapi.com/titles/" + val;
      options.url = posterUrl;
      await axios
        .request(options)
        .then(function (response: any) {
          console.log("Response Data", response.data);
          posters.push(response.data.results["primaryImage"]["url"].toString());
        })
        .catch(function (error: any) {
          console.error(error);
        });
      console.log("posters", posters);
      setPosterURL(posters);
    });
  }

  function getTopList(counts: { [key: string]: number }): string[] {
    const sorted: string[] = [];
    const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    for (const [key] of items) {
      sorted.push(key);
    }
    console.log("sorted", sorted);
    return sorted.slice(0, 10);
  }

  async function getLikesFromDb(): Promise<string[]> {
    const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`));
    const likesRest = fireBaseDoc.get("Likes");
    likesRest.sort();
    console.log("LikeRest sort", likesRest);
    const counts = countElements(likesRest);
    console.log(counts);
    const toplist = getTopList(counts);
    return toplist;
  }

  useEffect(() => {
    getLikesFromDb().then((res) => {
      getMoviePosters(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={styles.textFieldStyle}>Top Picks for group {gamePinToGroup}</Text>
      {posterURL != undefined && !isLoading ? (
        <FlatList
          data={posterURL}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.number}>{index + 1}</Text>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
          keyExtractor={(item) => item}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textField_button: {
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    color: COLORS.background,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    elevation: 3,
    borderColor: COLORS.main,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    margin: 10,
  },
  textFieldStyle: {
    fontSize: 25,
    margin: 10,
    textAlign: "center",
  },
  textFieldGroupStyle: {
    fontSize: 35,
    margin: 10,
    textAlign: "center",
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  number: {
    fontSize: 18,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
