import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from './Text'
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BottomModalProps {
    visible: boolean;
    onComment?: () => void;
    onReadLater?: () => void;
    onShare?: () => void;
    onClose?: () => void;
}

const BottomModal = ({visible, onClose, onComment, onReadLater, onShare}: BottomModalProps) => {
  return (
    <Modal transparent statusBarTranslucent visible={visible}>
        <TouchableOpacity activeOpacity={0.5} onPress={onClose} style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={onComment} style={styles.action}>
                    <Icon style={{marginRight: 10}} name='chat-bubble' size={25} color={'#ADB5BD'} />
                    <Text>Lihat Komentar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onReadLater} style={styles.action}>
                    <Icon style={{marginRight: 10}} name='bookmark-border' size={25} color={'#ADB5BD'} />
                    <Text>Simpan ke Baca Nanti</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onShare} style={styles.action}>
                    <Icon style={{marginRight: 10}} name='share' size={25} color={'#ADB5BD'} />
                    <Text>Bagikan</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose} activeOpacity={0.8} style={styles.cancel}>
                    <Icon style={{marginRight: 10}} name='close' size={25} color={'#ADB5BD'} />
                    <Text>Batalkan</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    </Modal>
  )
}

export default BottomModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    wrapper: {
        backgroundColor: '#FFF',
        padding: 15,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
    },
    cancel: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        borderTopWidth: 1,
        borderColor: '#ADB5BD'
    }
})