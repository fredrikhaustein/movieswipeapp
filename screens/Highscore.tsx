import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  Linking,
} from "react-native";
import axios from "axios";
import { useStoreGamePin } from "../store/MovieFilter";
import { COLORS } from "../values/colors";
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../firebaseConfig";
import { Link } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { link } from "fs";
import { signOut } from "firebase/auth";

export const Highscore = ({ navigation }: any) => {
  const gamePinToGroup = useStoreGamePin((state) => state.gamePin);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [streamingLink, setStreamingLink] = useState<string>(
    "https://play.hbomax.com"
  );
  const [posterURLPartOne, setPosterURLPartOne] = useState<string[]>();
  const [posterURLPartTwo, setPosterURLPartTwo] = useState<string[]>();
  let postOne: string[] = [];
  let postTwo: string[] = [];
  const streamingLinks = {
    netflix: "https://www.netflix.com/",
    disney: "https://www.disneyplus.com/",
    prime: "https://www.primevideo.com/",
    apple: "https://tv.apple.com/",
  };
  const posterOptions = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles/",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  // const handleSignOut = () => {
  //   signOut(firebaseAuth);
  // };

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
    const postersPromise = toplist.map(async (imdbId) => {
      console.log(imdbId);
      const posterUrl =
        "https://moviesdatabase.p.rapidapi.com/titles/" + imdbId;
      posterOptions.url = posterUrl;
      try {
        const response = await axios.request(posterOptions);
        return response.data.results["primaryImage"]["url"].toString();
      } catch (error) {
        console.error(error);
      }
    });
    const posters = await Promise.all(postersPromise);
    setPosterURLPartOne(posters.slice(0, 3));
    setPosterURLPartTwo(posters.slice(3, 6));
    // const posters: string[] = [];
    // toplist.forEach(async (imdbId) => {
    //   console.log(imdbId)
    //   const posterUrl = "https://moviesdatabase.p.rapidapi.com/titles/" + imdbId;
    //   posterOptions.url = posterUrl;
    //   await axios
    //     .request(posterOptions)
    //     .then(function (response: any) {
    //       posters.push(response.data.results["primaryImage"]["url"].toString());
    //     })
    //     .catch(function (error: any) {
    //       console.error(error);
    //     });
    //   console.log("post", posters)
    //   setPosterURLPartOne(posters);
    //   // setPosterURLPartTwo(posters.slice(0, 3));
    // postOne = posters
    // postTwo = posters.slice(0, 3)
    // console.log("one", postOne)
    // console.log("two", postTwo)
    // });
  }

  function getTopList(counts: { [key: string]: number }): string[] {
    const sorted: string[] = [];
    const items = Object.entries(counts).sort((a, b) => {
      if (b[1] === a[1]) {
        return a[0].localeCompare(b[0]);
      }
      return b[1] - a[1];
    });
    for (const [key] of items) {
      sorted.push(key);
    }
    return sorted.slice(0, 10);
  }

  const handleOnPressFinish = async () => {
    await deleteDoc(doc(db, "Groups", `${gamePinToGroup}`));
    // handleSignOut();
    navigation.navigate("Home", { type: "anonymous" });
  };

  const handleFinishedPress = () => {
    // handleSignOut();
    navigation.navigate("Home", { type: "anonymous" });
  };

  const handleImageClick = () => {
    setModalVisible(true);
  };

  async function getLikesFromDb(): Promise<string[]> {
    const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`));
    const likesRest = fireBaseDoc.get("Likes");
    const service: string = fireBaseDoc.get("MovieService").toString();
    Object.entries(streamingLinks).map(([key, val]) => {
      if (key === service) {
        setStreamingLink(val);
      }
    });
    likesRest.sort();
    const counts = countElements(likesRest);
    const toplist = getTopList(counts);
    return toplist;
  }

  useEffect(() => {
    getLikesFromDb().then((res) => {
      getMoviePosters(res);
      setIsLoading(false);
    });
  }, [refresh]);

  const handleUnSubscribe = () => {
    const unsubscribe = onSnapshot(
      doc(db, "Groups", `${gamePinToGroup}`),
      (doc) => {
        const collectedData = doc.data();
        if (collectedData == undefined) {
          handleFinishedPress();
        }
      }
    );
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleUnSubscribe();
    }, 1000);
    return () => clearInterval(interval);
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
      <Text style={styles.textFieldStyle}>
        Top Picks for group {gamePinToGroup}
      </Text>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <TouchableOpacity
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <View style={{ height: "100%" }}>
            <View style={styles.modalView}>
              <Text
                style={{
                  color: COLORS.background,
                  fontSize: 25,
                  textAlign: "center",
                }}
                onPress={() => Linking.openURL(streamingLink)}
              >
                Go to Stream
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={{ height: 450 }}>
        {posterURLPartOne != undefined && !isLoading ? (
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={posterURLPartOne}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={handleImageClick}>
                  <View style={styles.item}>
                    <Text style={styles.number}>{index + 1}</Text>
                    <Image source={{ uri: item }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <FlatList
              data={posterURLPartTwo}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={handleImageClick}>
                  <View style={styles.item}>
                    <Text style={styles.number}>{index + 4}</Text>
                    <Image source={{ uri: item }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <TouchableOpacity
        style={styles.finishedButton}
        onPress={handleOnPressFinish}
      >
        <Text style={{ fontSize: 40, color: COLORS.background }}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  finishedButton: {
    padding: 5,
    margin: 10,
    backgroundColor: "black",
    borderRadius: 10,
  },
  textFieldStyle: {
    fontSize: 25,
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
  modalView: {
    margin: 20,
    marginTop: "50%",
    marginBottom: "10%",
    backgroundColor: COLORS.main,
    justifyContent:"center",
    borderRadius: 50,
    padding: 35,
    height: "60%",
    shadowColor: COLORS.main,
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
