import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoadingHelper from '../Service/Helper/LoadingHelper'

// const LoadingModal = () => {

//   return (
    // <Modal transparent statusBarTranslucent visible={true}>
    // <View style={styles.container}>
    //   <View style={styles.wrapper}>
    //     <ActivityIndicator size={'large'} color={'#000'} />
    //   </View>
    // </View>
    // </Modal>
//   )
// }

class LoadingModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount(): void {
    LoadingHelper.setInstance({show: this.show, hide: this.hide})
  }

  show() {
    this.setState({visible: true})
  }

  hide() {
    this.setState({visible: false})
  }


  render() {
    const {visible} = this.state;
    return (
      <Modal transparent statusBarTranslucent visible={visible}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <ActivityIndicator size={'large'} color={'#000'} />
          </View>
        </View>
      </Modal>
    )
  }
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