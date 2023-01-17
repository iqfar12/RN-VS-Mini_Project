import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  onClickAccount?: () => void;
  title: string;
  onSearch?: (val: string) => void;
  isSearch?: boolean;
  onClickSearch?: () => void;
  onCloseSearch?: () => void;
  searchVal?: string;
}

const Header = ({
  onClickAccount,
  onClickSearch,
  title,
  isSearch,
  onSearch,
  onCloseSearch,
  searchVal,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {isSearch ? (
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={onSearch}
            placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
            style={styles.textInput}
            placeholder="search"
            value={searchVal}
          />
          <TouchableOpacity onPress={onCloseSearch} style={styles.icon}>
            <Icon name="cancel" size={25} color={'#FFF'} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.title}>
          <Text color="#FFF" size={18} textAlign={'center'}>
            {title}
          </Text>
        </View>
      )}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onClickSearch} style={styles.icon}>
          <Icon name="search" size={30} color={'#FFF'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickAccount} style={styles.icon}>
          <Icon name="account-circle" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  title: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
  icon: {
    marginLeft: 5,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    paddingBottom: 5,
    color: '#FFF',
  },
  inputContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    borderColor: '#FFF',
    borderBottomWidth: 1,
    marginBottom: -9,
  },
});
