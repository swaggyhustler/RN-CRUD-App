import {useState, ReactNode} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { Colors } from '../constants/Colors';
import { ThemeContext } from './ThemeContext';

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({children}) =>{
    const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
    const theme = colorScheme==='light' ? Colors.light : Colors.dark;
    
    return (
        <ThemeContext.Provider value={{
            colorScheme, setColorScheme, theme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}