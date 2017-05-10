// @flow
// https://material.io/color/#!/?view.left=0&view.right=0&primary.color=212121&secondary.color=039BE5

import {
  fullWhite,
  lightBlue600,
  pinkA200,
  pinkA400,
  pinkA100,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

export default {
  palette: {
    primary1Color: lightBlue600,
    primary2Color: '#006db3',
    primary3Color: '#63ccff',
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#212121',
    canvasColor: '#212121',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  toolbar: {
    backgroundColor: '#212121',
  },
};
