import { useState, useRef } from "react";
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
import { Icon } from "@rneui/themed";
import { COLORS } from "../values/colors";

export const SwipeScreen = () => {
  const [showInfoBool, setShowInfoBool] = useState<boolean>(false);
  const [movieNumber, setMovieNumber] = useState<number>(0);
  const countRef = useRef(0);

  function nextImage() {
    if (countRef.current >= movies.length - 1) {
      countRef.current = 0;
      setMovieNumber(countRef.current);
    } else {
      countRef.current = countRef.current + 1;
      setMovieNumber(countRef.current);
    }
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
        if (Math.abs(gestureState.dx) > 120) {
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
        {!showInfoBool ? (
          <Animated.View
            style={{
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            }}
            {...panResponder.panHandlers}
          >
            <Image
              source={{ uri: movies[movieNumber]["posterURLs"]["original"] }}
              style={{ width: 320, height: 500 }}
            />
          </Animated.View>
        ) : (
          <ScrollView>
            <Text style={styles.textFieldTop}>
              {movies[movieNumber]["originalTitle"]}
            </Text>
            <Text style={styles.textField}>
              IMBD rating: {movies[movieNumber]["imdbRating"]}
            </Text>
            {movies[movieNumber]["cast"].slice(0, 3).map((cast) => (
              <Text style={styles.textField} key={cast}>
                {cast}
              </Text>
            ))}
            <Text style={styles.textField}>
              {movies[movieNumber]["overview"]}
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
        <TouchableOpacity style={styles.button} onPress={nextImage}>
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
const movies = [
  {
    imdbID: "tt1548865",
    tmdbID: "44806",
    imdbRating: 73,
    imdbVoteCount: 560,
    tmdbRating: 73,
    backdropPath: "",
    backdropURLs: {},
    originalTitle: "12th \u0026 Delaware",
    genres: [99],
    countries: ["US"],
    year: 2010,
    runtime: 90,
    cast: [],
    significants: ["Heidi Ewing", "Rachel Grady"],
    title: "12th \u0026 Delaware",
    overview:
      "The abortion battle continues to rage in unexpected ways on one corner in an American city.",
    tagline: "Every day a battle is born.",
    video: "rFVTc4aghos",
    posterPath: "/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
    posterURLs: {
      "154": "https://image.tmdb.org/t/p/w154/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
      "185": "https://image.tmdb.org/t/p/w185/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
      "342": "https://image.tmdb.org/t/p/w342/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
      "500": "https://image.tmdb.org/t/p/w500/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
      "780": "https://image.tmdb.org/t/p/w780/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
      "92": "https://image.tmdb.org/t/p/w92/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
      original:
        "https://image.tmdb.org/t/p/original/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
    },
    age: 14,
    streamingInfo: {
      hbo: {
        no: {
          link: "https://play.hbomax.com/page/urn:hbo:page:GVU3rMw5TTlFvjSoJAZWP:type:feature",
          added: 1655503737,
          leaving: 0,
        },
      },
    },
    originalLanguage: "en",
  },
  {
    imdbID: "tt11188206",
    tmdbID: "641363",
    imdbRating: 67,
    imdbVoteCount: 762,
    tmdbRating: 69,
    backdropPath: "/cqzutHhDC7LjKrvHZVWmFhDkehJ.jpg",
    backdropURLs: {
      "1280":
        "https://image.tmdb.org/t/p/w1280/cqzutHhDC7LjKrvHZVWmFhDkehJ.jpg",
      "300": "https://image.tmdb.org/t/p/w300/cqzutHhDC7LjKrvHZVWmFhDkehJ.jpg",
      "780": "https://image.tmdb.org/t/p/w780/cqzutHhDC7LjKrvHZVWmFhDkehJ.jpg",
      original:
        "https://image.tmdb.org/t/p/original/cqzutHhDC7LjKrvHZVWmFhDkehJ.jpg",
    },
    originalTitle: "15 Minutes of Shame",
    genres: [99],
    countries: ["US"],
    year: 2021,
    runtime: 85,
    cast: ["Monica Lewinsky", "Max Joseph"],
    significants: ["Max Joseph"],
    title: "15 Minutes of Shame",
    overview:
      "Monica Lewinsky and filmmaker Max Joseph (Catfish) examine the human price of public shaming and cyber-harassment, profiling people who have experienced them first-hand - while investigating the bullies, bystanders, and experts in between.",
    tagline: "Who's next?",
    video: "dhJrnNdH-aw",
    posterPath: "/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
    posterURLs: {
      "154": "https://image.tmdb.org/t/p/w154/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
      "185": "https://image.tmdb.org/t/p/w185/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
      "342": "https://image.tmdb.org/t/p/w342/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
      "500": "https://image.tmdb.org/t/p/w500/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
      "780": "https://image.tmdb.org/t/p/w780/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
      "92": "https://image.tmdb.org/t/p/w92/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
      original:
        "https://image.tmdb.org/t/p/original/lQrJOZbNUrzJLwXqPUKqZGJ5NoC.jpg",
    },
    age: 18,
    streamingInfo: {
      hbo: {
        no: {
          link: "https://play.hbomax.com/page/urn:hbo:page:GYVwB2QzURrmjIwEAAABa:type:feature",
          added: 1655511518,
          leaving: 0,
        },
      },
    },
    originalLanguage: "en",
  },
  {
    imdbID: "tt2920540",
    tmdbID: "246400",
    imdbRating: 74,
    imdbVoteCount: 11577,
    tmdbRating: 71,
    backdropPath: "/vHRbyJFN2bgFsMeVJVJdvQwmyB4.jpg",
    backdropURLs: {
      "1280":
        "https://image.tmdb.org/t/p/w1280/vHRbyJFN2bgFsMeVJVJdvQwmyB4.jpg",
      "300": "https://image.tmdb.org/t/p/w300/vHRbyJFN2bgFsMeVJVJdvQwmyB4.jpg",
      "780": "https://image.tmdb.org/t/p/w780/vHRbyJFN2bgFsMeVJVJdvQwmyB4.jpg",
      original:
        "https://image.tmdb.org/t/p/original/vHRbyJFN2bgFsMeVJVJdvQwmyB4.jpg",
    },
    originalTitle: "20,000 Days on Earth",
    genres: [99, 18, 10402],
    countries: ["GB"],
    year: 2014,
    runtime: 97,
    cast: [
      "Nick Cave",
      "Warren Ellis",
      "Blixa Bargeld",
      "Susie Bick",
      "Arthur Cave",
      "Earl Cave",
      "Kirk Lake",
    ],
    significants: ["Iain Forsyth", "Jane Pollard"],
    title: "20,000 Days on Earth",
    overview:
      "A semi-fictionalized documentary about a day in the life of Australian musician Nick Cave's persona.",
    tagline: "",
    video: "WDlmnXBUoH0",
    posterPath: "/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
    posterURLs: {
      "154": "https://image.tmdb.org/t/p/w154/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
      "185": "https://image.tmdb.org/t/p/w185/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
      "342": "https://image.tmdb.org/t/p/w342/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
      "500": "https://image.tmdb.org/t/p/w500/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
      "780": "https://image.tmdb.org/t/p/w780/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
      "92": "https://image.tmdb.org/t/p/w92/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
      original:
        "https://image.tmdb.org/t/p/original/pUmYsh07P2Bq6ip2RZmOq6mr2vF.jpg",
    },
    age: 11,
    streamingInfo: {
      hbo: {
        no: {
          link: "https://play.hbomax.com/page/urn:hbo:page:GY1FZ7A0Ac41ARwEAAACk:type:feature",
          added: 1668146987,
          leaving: 17304155990,
        },
      },
    },
    originalLanguage: "en",
  },
  {
    imdbID: "tt15716316",
    tmdbID: "903976",
    imdbRating: 70,
    imdbVoteCount: 73,
    tmdbRating: 0,
    backdropPath: "/d4XwM8T3ALWCtiEppTajv0Dcz3T.jpg",
    backdropURLs: {
      "1280":
        "https://image.tmdb.org/t/p/w1280/d4XwM8T3ALWCtiEppTajv0Dcz3T.jpg",
      "300": "https://image.tmdb.org/t/p/w300/d4XwM8T3ALWCtiEppTajv0Dcz3T.jpg",
      "780": "https://image.tmdb.org/t/p/w780/d4XwM8T3ALWCtiEppTajv0Dcz3T.jpg",
      original:
        "https://image.tmdb.org/t/p/original/d4XwM8T3ALWCtiEppTajv0Dcz3T.jpg",
    },
    originalTitle: "2021 Rock \u0026 Roll Hall of Fame Induction Ceremony",
    genres: [10402],
    countries: ["US"],
    year: 2021,
    runtime: 196,
    cast: [
      "Dave Grohl",
      "Taylor Hawkins",
      "Pat Smear",
      "Nate Mendel",
      "Chris Shiflett",
      "Rami Jaffee",
      "Belinda Carlisle",
    ],
    significants: ["Joel Gallen"],
    title: "2021 Rock \u0026 Roll Hall of Fame Induction Ceremony",
    overview:
      "Filmed at the Rocket Mortgage Fieldhouse in Cleveland, Ohio, the 2021 Rock \u0026 Roll Hall of Fame Induction Ceremony honors inductees: Tina Turner, Carole King, The Go-Go's, JAY-Z, Foo Fighters, and Todd Rundgren; along with Kraftwerk, Charley Patton and Gil Scott-Heron; LL Cool J, Billy Preston and Randy Rhoads; Clarence Avant for the Ahmet Ertegun Award. The special music event also features a host of all-star presenters, performers, and special guests, including Angela Bassett, Christina Aguilera, Mickey Guyton, H.E.R., Keith Urban, Taylor Swift, Jennifer Hudson, Drew Barrymore, Paul McCartney, Lionel Richie, and many others.",
    tagline: "",
    video: "rHSiI5FAcUM",
    posterPath: "/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
    posterURLs: {
      "154": "https://image.tmdb.org/t/p/w154/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
      "185": "https://image.tmdb.org/t/p/w185/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
      "342": "https://image.tmdb.org/t/p/w342/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
      "500": "https://image.tmdb.org/t/p/w500/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
      "780": "https://image.tmdb.org/t/p/w780/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
      "92": "https://image.tmdb.org/t/p/w92/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
      original:
        "https://image.tmdb.org/t/p/original/msxpyHyX0MaPvgHvWCOXloEHqsb.jpg",
    },
    age: 18,
    streamingInfo: {
      hbo: {
        no: {
          link: "https://play.hbomax.com/page/urn:hbo:page:GYWbsowyn7IqTVwEAAABB:type:feature",
          added: 1668854882,
          leaving: 0,
        },
      },
    },
    originalLanguage: "en",
  },
  {
    imdbID: "tt4976192",
    tmdbID: "500919",
    imdbRating: 44,
    imdbVoteCount: 8511,
    tmdbRating: 54,
    backdropPath: "/7eTWQb475pM9H3NEOiUzGYASEx0.jpg",
    backdropURLs: {
      "1280":
        "https://image.tmdb.org/t/p/w1280/7eTWQb475pM9H3NEOiUzGYASEx0.jpg",
      "300": "https://image.tmdb.org/t/p/w300/7eTWQb475pM9H3NEOiUzGYASEx0.jpg",
      "780": "https://image.tmdb.org/t/p/w780/7eTWQb475pM9H3NEOiUzGYASEx0.jpg",
      original:
        "https://image.tmdb.org/t/p/original/7eTWQb475pM9H3NEOiUzGYASEx0.jpg",
    },
    originalTitle: "211",
    genres: [28, 18, 53],
    countries: ["US"],
    year: 2018,
    runtime: 86,
    cast: [
      "Nicolas Cage",
      "Sophie Skelton",
      "Dwayne Cameron",
      "Weston Cage Coppola",
      "Michael Rainey Jr.",
      "Cory Hardrict",
      "Amanda Cerny",
    ],
    significants: ["York Alec Shackleton"],
    title: "211",
    overview:
      "Inspired by one of the longest and bloodiest real-life events in police history, Officer Mike Chandler and a young civilian passenger find themselves under-prepared and outgunned when fate puts them squarely in the crosshairs of a daring bank heist in progress by a fearless team of highly-trained and heavily-armed men.",
    tagline: "Your life can change in an instant.",
    video: "SCLjS-owEig",
    posterPath: "/81RColr4rau6DZ7z9eMsksokcfk.jpg",
    posterURLs: {
      "154": "https://image.tmdb.org/t/p/w154/81RColr4rau6DZ7z9eMsksokcfk.jpg",
      "185": "https://image.tmdb.org/t/p/w185/81RColr4rau6DZ7z9eMsksokcfk.jpg",
      "342": "https://image.tmdb.org/t/p/w342/81RColr4rau6DZ7z9eMsksokcfk.jpg",
      "500": "https://image.tmdb.org/t/p/w500/81RColr4rau6DZ7z9eMsksokcfk.jpg",
      "780": "https://image.tmdb.org/t/p/w780/81RColr4rau6DZ7z9eMsksokcfk.jpg",
      "92": "https://image.tmdb.org/t/p/w92/81RColr4rau6DZ7z9eMsksokcfk.jpg",
      original:
        "https://image.tmdb.org/t/p/original/81RColr4rau6DZ7z9eMsksokcfk.jpg",
    },
    age: -1,
    streamingInfo: {
      hbo: {
        no: {
          link: "https://play.hbomax.com/page/urn:hbo:page:GYdUG2QH-DMJ-wwEAAAAR:type:feature",
          added: 1655512813,
          leaving: 16893719400,
        },
      },
    },
    originalLanguage: "en",
  },
  {
    imdbID: "tt2172934",
    tmdbID: "192102",
    imdbRating: 62,
    imdbVoteCount: 94234,
    tmdbRating: 60,
    backdropPath: "/yNWVnD6kYcU5mX54aJrS9XkkIWQ.jpg",
    backdropURLs: {
      "1280":
        "https://image.tmdb.org/t/p/w1280/yNWVnD6kYcU5mX54aJrS9XkkIWQ.jpg",
      "300": "https://image.tmdb.org/t/p/w300/yNWVnD6kYcU5mX54aJrS9XkkIWQ.jpg",
      "780": "https://image.tmdb.org/t/p/w780/yNWVnD6kYcU5mX54aJrS9XkkIWQ.jpg",
      original:
        "https://image.tmdb.org/t/p/original/yNWVnD6kYcU5mX54aJrS9XkkIWQ.jpg",
    },
    originalTitle: "3 Days to Kill",
    genres: [28, 18, 53],
    countries: ["FR", "US"],
    year: 2014,
    runtime: 113,
    cast: [
      "Kevin Costner",
      "Hailee Steinfeld",
      "Connie Nielsen",
      "Amber Heard",
      "Tómas Lemarquis",
      "Richard Sammel",
      "Raymond J. Barry",
    ],
    significants: ["McG"],
    title: "3 Days to Kill",
    overview:
      "A dangerous international spy is determined to give up his high stakes life to finally build a closer relationship with his estranged wife and daughter. But first, he must complete one last mission - even if it means juggling the two toughest assignments yet: hunting down the world's most ruthless terrorist and looking after his teenage daughter for the first time in ten years, while his wife is out of town.",
    tagline: "",
    video: "iVLRDwLv3kg",
    posterPath: "/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
    posterURLs: {
      "154": "https://image.tmdb.org/t/p/w154/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
      "185": "https://image.tmdb.org/t/p/w185/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
      "342": "https://image.tmdb.org/t/p/w342/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
      "500": "https://image.tmdb.org/t/p/w500/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
      "780": "https://image.tmdb.org/t/p/w780/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
      "92": "https://image.tmdb.org/t/p/w92/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
      original:
        "https://image.tmdb.org/t/p/original/sliYPOgeUuf62qktgXbfMBmYvj1.jpg",
    },
    age: 14,
    streamingInfo: {
      hbo: {
        no: {
          link: "https://play.hbomax.com/page/urn:hbo:page:GYgKeZQU0WGmAkQEAAAGV:type:feature",
          added: 1655502214,
          leaving: 16920503400,
        },
      },
      prime: {
        no: {
          link: "https://www.primevideo.com/detail/0R7SJ23HCB046QUXGLA6YZ0LY7/",
          added: 1666920556,
          leaving: 0,
        },
      },
    },
    originalLanguage: "en",
  },
];
