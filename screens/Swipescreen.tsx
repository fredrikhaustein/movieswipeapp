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
} from "react-native";
import axios from 'axios'
import { Icon } from "@rneui/themed";
import { useStoreGamePin } from "../store/MovieFilter";
import { COLORS } from "../values/colors";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const SwipeScreen = () => {
  const gotDataRef = useRef(false);
  const [showInfoBool, setShowInfoBool] = useState<boolean>(false);
  const [movieNumber, setMovieNumber] = useState<number>(0);
  const countRef = useRef(0);
  const pageRef = useRef(1); 
  const gamePinToGroup = useStoreGamePin((state) => state.gamePin);
  const optionsAxios = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
      country: 'us',
      service: 'netflix',
      type: 'movie',
      genre: '18',
      page: '1',
      output_language: 'en',
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': 'edab4e7123msh8344a8f5fa69601p18c787jsnfaff8cc039db',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };
  const [moviesAPI, setMoviesAPI] = useState();

  async function getMovies() {
    console.log("run axios")
    await axios.request(optionsAxios).then(function (response: any) {
      setMoviesAPI(response.data.results)
    }).catch(function (error: any) {
      console.error(error);
    });
    countRef.current = 0;
    setMovieNumber(countRef.current);
  }

  useEffect(() => {
    if(! gotDataRef.current) {
      getMovies();
      gotDataRef.current = true
    }
  },[])

  const nextImage = () => {
    if (countRef.current >= moviesAPI.length - 1) {
      pageRef.current = pageRef.current + 1; 
      optionsAxios.params.page = '' + pageRef.current;
      getMovies();
    } else {
      countRef.current = countRef.current + 1;
      setMovieNumber(countRef.current);
    }
  }

  const likeMovie = async () => {
    const number = countRef.current;
    const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`))
    const likesRest = fireBaseDoc.get("Movies")
    const mov = []
    likesRest.map((d: any) => mov.push(d))
    mov.push(moviesAPI[number]["imdbID"])
    await updateDoc(doc(db, "Groups", `${gamePinToGroup}`), {
        Movies: mov
      })
    nextImage(); 
  }
  const showInfo = () => {
    setShowInfoBool(!showInfoBool);
  };

  const pan = useRef(new Animated.ValueXY()).current;
  function resetPos() {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const { dx, dy } = gestureState;
        // return true if user is swiping, return false if it's a single click
        return Math.abs(dx) !== 0 && Math.abs(dy) !== 0;
      },
      onMoveShouldSetPanResponderCapture: (event, gestureState) => {
        const { dx, dy } = gestureState;
        // return true if user is swiping, return false if it's a single click
        return Math.abs(dx) !== 0 && Math.abs(dy) !== 0;
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gesture) => {
        const x = gesture.dx;
        const y = gesture.dy;
        pan.setValue({ x, y });
      },
      onPanResponderEnd: (e, gestureState) => {
        pan.flattenOffset();
        resetPos();
        if (gestureState.dx > 120) {
          likeMovie();
        }
        if (gestureState.dx <  -120) {
          nextImage();
        }
      },
    })
  ).current;

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
        <Text style={{ fontSize: 35 }}>GroupID: {gamePinToGroup}</Text>
        {(!showInfoBool) || (moviesAPI === undefined)  ? (
          /*<Animated.View
            style={{
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            }}
            {...panResponder.panHandlers}
          >*/
          <View>

            {moviesAPI == null ? (
              <Text
              style={styles.textField}
              >
              Loading
              </Text>
            ) : (
              <Image
              source={{ uri: moviesAPI[movieNumber]["posterURLs"]["original"] }}
              style={{ width: 320, height: 500 }}
              />
              )}
          </View>
          /*</Animated.View>*/
        ) : (
          <ScrollView>
            <Text style={styles.textFieldTop}>
              {moviesAPI[movieNumber]["originalTitle"]}
            </Text>
            <Text style={styles.textField}>
              IMBD rating: {moviesAPI[movieNumber]["imdbRating"]}
            </Text>
            {moviesAPI[movieNumber]["cast"].slice(0, 3).map((cast) => (
              <Text style={styles.textField} key={cast}>
                {cast}
              </Text>
            ))}
            <Text style={styles.textField}>
              {moviesAPI[movieNumber]["overview"]}
            </Text>
          </ScrollView>
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
        <TouchableOpacity style={styles.button} onPress={nextImage}>
          <Icon name="close" color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showInfo}>
          <Icon name="info" color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={likeMovie}>
          <Icon name="check" color={COLORS.background} />
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
    margin: 20,
  },
});
