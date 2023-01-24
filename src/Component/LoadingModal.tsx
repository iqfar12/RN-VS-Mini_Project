import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadingModal = () => {
  return (
    <Modal transparent statusBarTranslucent visible={true}>
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size={'large'} color={'#000'} />
      </View>
    </View>
    </Modal>
  )
}

export default LoadingModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    wrapper: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})