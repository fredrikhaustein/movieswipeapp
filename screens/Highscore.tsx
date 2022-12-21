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
  
export const Highscore = ({navigation}: any) => {
    const gamePinToGroup = useStoreGamePin((state) => state.gamePin);
    const [posterURL, setPosterURL] = useState<string[]>();
    const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/',
    headers: {
        'X-RapidAPI-Key': 'edab4e7123msh8344a8f5fa69601p18c787jsnfaff8cc039db',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
    };

    function countElements(lst: any[]): {[key: string]: number} {
        const count: {[key: string]: number} = {};
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

        const posters: string[] = []
        console.log("Axios")
        console.log(toplist)
        toplist.forEach(async (val) => {
            const posterUrl = 'https://moviesdatabase.p.rapidapi.com/titles/' + val
            options.url = posterUrl
            await axios.request(options).then(function (response:any) {
                console.log(response.data)                
                posters.push(response.data.results["primaryImage"]["url"].toString());
            }).catch(function (error: any) {
                console.error(error);
            });
        console.log("posters", posters)
        setPosterURL(posters)
        })
        
    }

    function getTopList(counts: {[key: string]: number}): string[] {
        const sorted: string[] = []
        const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        for (const [key] of items) {
            sorted.push(key)
        }
        console.log("sorted", sorted)
        return sorted
      }
      

    async function getLikesFromDb(): Promise<string[]> {
        const fireBaseDoc = await getDoc(doc(db, "Groups", `${gamePinToGroup}`))
        const likesRest = fireBaseDoc.get("Likes")
        likesRest.sort()
        const counts = countElements(likesRest)
        console.log(counts)
        const toplist = getTopList(counts)
        return toplist
    }

    useEffect(() => {
        getLikesFromDb().then((res) => {
            getMoviePosters(res)
        }) 
    }, [])



    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.background,
                }}
        >
            <Text>
                Top Picks for group {gamePinToGroup}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log("poster urls",posterURL)}/>
            {posterURL != undefined ? (
            <ScrollView >
                {posterURL.map(posterUlr => (
                    <View key={posterUlr}>
                        <Image source={{uri : posterUlr}} />
                    </View>
                
                ))}
            </ScrollView>
            ) : (<Text>Loading</Text>)}
        </View>
    )
}

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
  });
  