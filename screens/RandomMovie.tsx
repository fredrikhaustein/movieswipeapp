import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import axios from "axios";
import { COLORS } from "../values/colors";
import { generateRandomNr } from "../utils/generateRandomNr";
import InfoAboutFilmView from "../components/ScreenInScreen/InfoAboutFilmView";
import { Icon } from "@rneui/base";
import { genreList,  genreListSingular } from "../utils/genreSelectionList";
import { randomInt } from "crypto";
import { LinkingContext } from "@react-navigation/native";

export const RandomMovie = () => {
  const [isInfo, setShowInfo] = useState(false);
  const [randomMovie, setRandomMovie] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(true)
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

  async function getMovies() {
    console.log("Axios");
    await axios
      .request(optionsAxios)
      .then(function (response: any) {
        const data = response.data.results;
        const number = generateRandomNr(data.length);
        setRandomMovie(data[number]);
        setShowActivityIndicator(false)
        console.log("Movie set sucessfully")
      })
      .catch(function (error: any) {
        console.error(error);
        setRefresh(!refresh)
      });
  }

  const setRandomParam = (() => {
    const genreLength = genreListSingular.length
    const genreIndex = Math.floor(Math.random()  * (genreLength + 1))
    const page = Math.floor(Math.random() * (4)).toString()
    if (genreList[genreIndex].apiKey === undefined) {
      console.log("Genrelist is undefined. Setting to Comedy")
      optionsAxios.params.genre = "35"}
    else {
      optionsAxios.params.genre = genreList[genreIndex].apiKey
    }
    if (page === undefined) {
      console.log("page is undefined")
      optionsAxios.params.page = "1"
    }
    else {
      optionsAxios.params.page = page
    }
  })


  useEffect(() => {
    setShowActivityIndicator(true)
    setRandomParam();
    getMovies();
  }, [refresh]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
      }}
    >
      {!isInfo || randomMovie === undefined ? (
        <View>
          {randomMovie == null || showActivityIndicator ? (
            <View style= {{height: 500}}>
            <View style={{height: 250}}/>
              <ActivityIndicator size="large" color={COLORS.main} />
            </View>
          ) : (
            <View>
              <Image
                source={{
                  uri: randomMovie["posterURLs"]["original"],
                }}
                style={{ width: 320, height: 500, alignContent: "center" }}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={{height: 500}}>
        <View style={{ flex: 1, maxHeight: 500 }}>
          <InfoAboutFilmView
            title={randomMovie["originalTitle"]}
            imdbRating={randomMovie["imdbRating"]}
            cast={randomMovie["cast"]}
            overview={randomMovie["overview"]}
          />
        </View>
        </View>
      )}
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
        onPress={() => setRefresh(!refresh)}
        >
        <Icon name = "close" color={COLORS.background} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowInfo(!isInfo)}
        >
        <Icon name="info" color={COLORS.background} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(randomMovie!["streamingInfo"]["netflix"]["it"]["link"])}
        >
          <Icon name = "check" color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textFieldStyle: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  number: {
    fontSize: 18,
    marginRight: 10,
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
