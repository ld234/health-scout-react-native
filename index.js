/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for
 * Created:  5 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { AppRegistry } from 'react-native';
import App from './App';
import './src/services/ReactotronConfig';
console.disableYellowBox = true;
AppRegistry.registerComponent('HealthScout', () => App);
