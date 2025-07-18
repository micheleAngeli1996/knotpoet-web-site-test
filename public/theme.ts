import Aura from '@primeng/themes/aura';
import {definePreset} from "@primeng/themes";

export const kpPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f8f4fc',
      100: '#e4d6f6',
      200: '#cfb7f1',
      300: '#ba99eb',
      400: '#a57ae5',
      500: '#905cde',
      600: '#7449b2',
      700: '#583686',
      800: '#3c235a',
      900: '#20122f',
      950: '#13091d'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#905cde',
          inverseColor: '#ffffff',
          hoverColor: '#20122f',
          activeColor: '#3c235a'
        },
        highlight: {
          background: '#13091d',
          focusBackground: '#583686',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '#f8f4fc',
          inverseColor: '#13091d',
          hoverColor: '#e4d6f6',
          activeColor: '#cfb7f1'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
});
