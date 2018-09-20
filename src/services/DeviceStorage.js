
import { AsyncStorage } from 'react-native';

saveItem = async (key, value) => {
    console.log('saving');
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
}

getJWT = async () => {
    try {
      const value = await AsyncStorage.getItem('id_token');
      return value;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
      return null;
    }
}

deleteJWT = async () => {
    try{
      await AsyncStorage.removeItem('id_token')
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
}


export default {
  saveItem,
  deleteJWT,
  getJWT,
};