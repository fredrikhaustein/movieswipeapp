import { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { useStoreGamePin } from "../store/MovieFilter";
import { COLORS } from "../values/colors";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import InfoAboutFilmView from "../components/ScreenInScreen/InfoAboutFilmView";

export const SwipeScreen = ({ navigation }: any) => {
  const nrOfMovies = 8;
  const [lengthDisLikeAndLike, setLengthDisLikeAndLike] = useState<number>(0);
  const gotDataRef = useRef(false);
  const [showInfoBool, setShowInfoBool] = useState<boolean>(false);
  const [movieNumber, setMovieNumber] = useState<number>(0);
  const countRef = useRef(0);
  const pageRef = useRef(1);
  const gamePinToGroup = useStoreGamePin((state) => state.gamePin);
  const [showLoading, setShowLoading] = useState(true);
  const optionsAxios = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/search/basic",
    params: {
      country: "it",
      service: "netflix",
      type: "movie",
      genre: "18",
      page: "1",
      output_language: "en",
      language: "en",
    },
    headers: {
      "X-RapidAPI-Key": "edab4e7123msh8344a8f5fa69601p18c787jsnfaff8cc039db",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };
  const [moviesAPI, setMoviesAPI] = useState<any>();
  const [showErrorModule, setShowErrorModule] = useState(false);
  const [userCount, setUserCount] = useState<number>();

  async function getUsersCount() {
    const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`));
    const users = fireBaseDoc.get("Users");
    console.log("THIS IS USERS:", users);
    setUserCount(users.length);
  }

  async function getMovies() {
    console.log("Axios");
    const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`));
    const movieService = fireBaseDoc.get("MovieService");
    const movieGenre = fireBaseDoc.get("Genre");
    console.log("Service", movieService);
    optionsAxios.params.service = "netflix";
    optionsAxios.params.genre = movieGenre;
    optionsAxios.params.page = pageRef.current.toString();
    await axios
      .request(optionsAxios)
      .then(function (response: any) {
        // console.log(response.data.results);
        setMoviesAPI(response.data.results);
        setShowLoading(false);
      })
      .catch(function (error: any) {
        console.error(error);
        getMovies();
      });
    countRef.current = 0;
    setMovieNumber(countRef.current);
    // console.log(moviesAPI[movieNumber]["cast"]);
  }

  const handleUnSubscribe = () => {
    const unsubscribe = onSnapshot(
      doc(db, "Groups", `${gamePinToGroup}`),
      (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const collectedData = doc.data();
        if (collectedData) {
          if (
            collectedData["Dislikes"] === undefined ||
            collectedData["Dislikes"].length == 0
          ) {
            setLengthDisLikeAndLike(collectedData["Likes"].length);
          } else if (
            collectedData["Likes"] === undefined ||
            collectedData["Likes"].length == 0
          ) {
            setLengthDisLikeAndLike(collectedData["Likes"].length);
          } else {
            const totLenSwipedMovies =
              collectedData["Dislikes"].length + collectedData["Likes"].length;
            setLengthDisLikeAndLike(totLenSwipedMovies);
          }
        }
      }
    );
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    if (!gotDataRef.current) {
      getMovies();
      gotDataRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (userCount && lengthDisLikeAndLike >= nrOfMovies * userCount) {
      showHighScore();
    } else if (lengthDisLikeAndLike >= 16) {
      showHighScore();
    }
  }, [lengthDisLikeAndLike]);

  const showHighScore = () => {
    navigation.navigate("Highscore", { type: "anonymous" });
  };

  const nextImage = async () => {
    setShowInfoBool(false);
    setShowLoading(true);
    if (moviesAPI) {
      if (countRef.current >= moviesAPI.length - 1) {
        pageRef.current = pageRef.current + 1;
        getMovies();
        console.log("Cast", moviesAPI[movieNumber]["cast"]);
      } else {
        countRef.current = countRef.current + 1;
        setMovieNumber(countRef.current);
        setShowLoading(false);
      }
    }
    getUsersCount();
  };

  const likeMovie = async (like: boolean) => {
    console.log(like);
    const number = countRef.current;
    const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`));
    const mov = [];
    if (like) {
      const likesRest = fireBaseDoc.get("Likes");
      console.log(likesRest);
      likesRest.map((d: any) => mov.push(d));
      if (moviesAPI) {
        mov.push(moviesAPI[number]["imdbID"]);
      }
      await updateDoc(doc(db, "Groups", `${gamePinToGroup}`), {
        Likes: mov,
      });
    } else {
      const dislikesRest = fireBaseDoc.get("Dislikes");
      if (dislikesRest) {
        dislikesRest.map((d: any) => mov.push(d));
        if (moviesAPI) {
          mov.push(moviesAPI[number]["imdbID"]);
        }
        await updateDoc(doc(db, "Groups", `${gamePinToGroup}`), {
          Dislikes: mov,
        });
      }
    }
    nextImage();
    handleUnSubscribe();
  };
  const showInfo = () => {
    setShowInfoBool(!showInfoBool);
  };

  const handleOnPressToHighscoreList = () => {
    navigation.navigate("Highscore", { type: "anonymous" });
  };

  return (
    <>
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <Modal
          visible={showErrorModule}
          animationType="slide"
          onRequestClose={() => setShowErrorModule(false)}
          transparent={true}
        >
          <Text>
            Look's like we had a small error. CLick the button to try again.{" "}
          </Text>
        </Modal>
        {!showInfoBool || moviesAPI === undefined ? (
          <View>
            {moviesAPI == null || showLoading ? (
              <View>
                <ActivityIndicator size="large" color={COLORS.main} />
              </View>
            ) : (
              <View>
                <Image
                  source={{
                    uri: moviesAPI[movieNumber]["posterURLs"]["original"],
                  }}
                  style={{ width: 320, height: 500 }}
                />
              </View>
            )}
          </View>
        ) : (
          <InfoAboutFilmView
            title={moviesAPI[movieNumber]["originalTitle"]}
            imdbRating={moviesAPI[movieNumber]["imdbRating"]}
            cast={moviesAPI[movieNumber]["cast"]}
            overview={moviesAPI[movieNumber]["overview"]}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => likeMovie(false)}
        >
          <Icon name="close" color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showInfo}>
          <Icon name="info" color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => likeMovie(true)}>
          <Icon name="check" color={COLORS.background} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: COLORS.background }}>
        <TouchableOpacity
          style={styles.buttonHighscore}
          onPress={handleOnPressToHighscoreList}
        >
          <Text style={styles.textField_button}>Show highscore list</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SwipeScreen;
const styles = StyleSheet.create({
  textFieldTop: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  buttonHighscore: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    elevation: 3,
    borderColor: COLORS.main,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  textField_button: {
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    color: COLORS.background,
  },
  textField: {
    fontSize: 20,
    marginBottom: 5,
    paddingHorizontal: 30,
    overflow: "scroll",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    elevation: 3,
    borderColor: COLORS.main,
    backgroundColor: COLORS.main,
    borderRadius: 400,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
  },
});
/*<Animated.View
style={{
  transform: [{ translateX: pan.x }, { translateY: pan.y }],
}}
{...panResponder.panHandlers}
>*/

// const pan = useRef(new Animated.ValueXY()).current;
// function resetPos() {
//   Animated.timing(pan, {
//     toValue: { x: 0, y: 0 },
//     duration: 200,
//     useNativeDriver: true,
//   }).start();
// }
// const panResponder = useRef(
//   PanResponder.create({
//     onMoveShouldSetPanResponder: (event, gestureState) => {
//       const { dx, dy } = gestureState;
//       // return true if user is swiping, return false if it's a single click
//       return Math.abs(dx) !== 0 && Math.abs(dy) !== 0;
//     },
//     onMoveShouldSetPanResponderCapture: (event, gestureState) => {
//       const { dx, dy } = gestureState;
//       // return true if user is swiping, return false if it's a single click
//       return Math.abs(dx) !== 0 && Math.abs(dy) !== 0;
//     },
//     onPanResponderTerminationRequest: () => false,
//     onPanResponderGrant: () => {
//       pan.setValue({ x: 0, y: 0 });
//     },
//     onPanResponderMove: (event, gesture) => {
//       const x = gesture.dx;
//       const y = gesture.dy;
//       pan.setValue({ x, y });
//     },
//     onPanResponderEnd: (e, gestureState) => {
//       pan.flattenOffset();
//       resetPos();
//       if (gestureState.dx > 120) {
//         likeMovie();
//       }
//       if (gestureState.dx < -120) {
//         nextImage();
//       }
//     },
//   })
// ).current;

/*</Animated.View>*/
// <ScrollView>
//   <Text style={styles.textFieldTop}>
//     {moviesAPI[movieNumber]["originalTitle"]}
//   </Text>
//   <Text style={styles.textField}>
//     IMBD rating: {moviesAPI[movieNumber]["imdbRating"]}
//   </Text>
//   {moviesAPI[movieNumber]["cast"].slice(0, 3).map((cast: any) => (
//     <Text style={styles.textField} key={cast}>
//       {cast}
//     </Text>
//   ))}
//   <Text style={styles.textField}>
//     {moviesAPI[movieNumber]["overview"]}
//   </Text>
// </ScrollView>
