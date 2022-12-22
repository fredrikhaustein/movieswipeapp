import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../values/colors";
import { AirbnbRating } from "@rneui/themed";

interface IInfoAboutFilmView {
  title: string;
  imdbRating: number;
  cast: any;
  overview: any;
}

export const InfoAboutFilmView = (infoOfFilm: IInfoAboutFilmView) => {
  console.log(infoOfFilm);
  return (
    <View style={styles.viewBox}>
      <ScrollView>
        <Text style={styles.textFieldTop}>{infoOfFilm.title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.topText}>IMBD rating: </Text>
          <Text style={{ marginTop: 10, fontSize: 20 }}>
            {infoOfFilm.imdbRating / 10}/10
          </Text>
        </View>
        <Text style={styles.topText}>Summary:</Text>
        <Text style={styles.textField}>{infoOfFilm.overview}</Text>
      </ScrollView>
    </View>
  );
};

export default InfoAboutFilmView;

const styles = StyleSheet.create({
  viewBox: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#000000",
    borderWidth: 4,
    borderRadius: 5,
  },
  topText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 30,
  },
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
