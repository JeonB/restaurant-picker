import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { Text } from '@rneui/themed';
import { Button } from 'react-native-paper';
import RestaurantInfo from '@_components/ui/dataView';
import CategoryButton from '@_components/ui/categoryButton';
import { RandomPickerModal } from '@_components/random/randomPickModal';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getData } from '@_services/api';
import { handleData } from '@_services/keyword_search';
import { Restaurant } from '@_types/Restaurant';
import { RootStackParamList } from '@_types/navigation';
import Map from '@_components/ui/map';
import { QueryParamsType } from '@_types/queryParams';
import * as Location from 'expo-location';

export function Main() {
  const { width, height } = useWindowDimensions();
  const [info, setInfo] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string[]>(['']);
  const [showRandomPicker, setShowRandomPicker] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<Restaurant | null>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  let queryParams: QueryParamsType = {
    query: '맛집',
    x: '',
    y: '',
    category_group_code: 'FD6',
    radius: 100,
    size: 15,
    page: 1,
  };
  const [state, setState] = useState<QueryParamsType>(queryParams);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        const { latitude, longitude } = location.coords;
        queryParams = {
          ...queryParams,
          x: longitude.toString(),
          y: latitude.toString(),
        };
        setState(queryParams);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    })();
  }, [state]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchData(category);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    fetch();
  }, [category]);
  const fetchData = async (categories: string[]) => {
    try {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      queryParams = { ...state, query: randomCategory };
      setState(queryParams);
      const result: Restaurant[] = await handleData(state);
      if (result) {
        setInfo(result);
        // setShowRandomPicker(true);
        setShowRandomPickButton(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const [showRandomPickButton, setShowRandomPickButton] = useState(true);

  const handleRandomPickClick = async () => {
    try {
      await fetchData(category);
      setShowRandomPicker(true);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleDetailViewClick = () => {
    if (selectedInfo) {
      navigation.navigate('Detail', { url: selectedInfo.place_url });
    }
  };

  const handleCategoryChange = (itemIndex: number) => {
    setSelectedInfo(info[itemIndex]);
    setTimeout(() => setShowRandomPicker(false), 200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {selectedInfo ? (
          <Map info={selectedInfo} />
        ) : (
          <Image
            source={{ uri: 'https://i.postimg.cc/rpJGytmg/image.png' }}
            style={{ width: 400, height: 400 }}
          />
        )}
      </View>
      <CategoryButton category={category} setCategory={setCategory} />
      {selectedInfo && (
        <View style={styles.infoView}>
          <Text h4 h4Style={{ fontSize: 20, marginBottom: 10 }}>
            {selectedInfo?.place_name || ''}
          </Text>
          <Text>{selectedInfo?.category_name || ''}</Text>

          <RestaurantInfo info={selectedInfo} />
        </View>
      )}
      {showRandomPickButton ? (
        <Button
          style={styles.randomPickButton}
          icon="silverware-fork-knife"
          onPress={handleRandomPickClick}
          textColor="#003366">
          Random Pick
        </Button>
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={handleDetailViewClick} style={styles.detailButton}>
            <Text style={{ color: 'white' }}>식당 상세 정보</Text>
          </Button>
          <Button
            style={styles.reselectButton}
            icon="restart"
            onPress={handleRandomPickClick}
            mode="outlined"
            textColor="#003366">
            다시 선택
          </Button>
        </View>
      )}
      {info.length > 0 && (
        <RandomPickerModal
          visible={showRandomPicker}
          info={info}
          onClose={() => setShowRandomPicker(false)}
          onIndexChange={handleCategoryChange}
        />
      )}
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
  },
  randomPickButton: {
    margin: 20,
    padding: 4,
    width: 300,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#E8EAF6',
  },
  reselectButton: {
    borderColor: '#003366',
    margin: 15,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: '#2E6FCF',
    borderRadius: 5,
    width: 200,
    margin: 15,
  },
  infoView: {
    width: deviceWidth > 430 ? 450 : 400,
    alignItems: 'center',
    margin: 5,
  },
  mediaContainer: {
    width: 400,
    height: 400,
    position: 'relative',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: deviceWidth > 430 ? '110%' : '120%',
    height: 'auto',
    aspectRatio: 1,
  },
});
