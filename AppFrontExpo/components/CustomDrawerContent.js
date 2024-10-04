import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useTheme } from '../themeContext'; // Importe le hook useTheme

const CustomDrawerContent = (props) => {
  const { theme, toggleTheme } = useTheme(); // Récupère la fonction de bascule de thème

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      {/* rajouter un bouton pour changer entre le mode clair et sombre */}
      <DrawerItem
        label={theme === 'dark' ? 'Passer en mode Clair !' : 'Passer en mode Sombre !'}
        onPress={toggleTheme} 
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;