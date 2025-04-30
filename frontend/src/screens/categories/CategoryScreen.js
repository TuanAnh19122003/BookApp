import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import Icon2 from '@react-native-vector-icons/feather'

const CategoryScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleDeletePress = (category) => {
        setSelectedCategory(category)
        setModalVisible(true)
    }

    const confirmDelete = () => {
        console.log('Xoá:', selectedCategory)
        setModalVisible(false)
    }
    const hanldeHome = () => {
        navigation.goBack()
    }
    const hanldeEdit = () => {
        navigation.navigate('CategoryEdit')
    }
    const hanldeAdd = () => {
        navigation.navigate('CategoryNew')
    }
    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <TouchableOpacity onPress={hanldeHome}>
                    <Icon name='arrow-back' size={30} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Thể loại sách</Text>
                <TouchableOpacity>
                    <Icon name='settings-outline' size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <View style={styles.categoryHeader}>
                    <Text style={styles.textHeader}>Danh sách thể loại</Text>
                    <TouchableOpacity style={styles.add} onPress={hanldeAdd}>
                        <Icon name='add-sharp' size={30} />
                        <Text style={styles.textAdd}>New</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.listCategory} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={styles.category}>
                        <Text style={styles.text}>Thể Thao</Text>
                        <View style={styles.action}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]} onPress={hanldeEdit}>
                                <Icon2 name='edit' size={30} style={{ color: '#FFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => handleDeletePress('Thể Thao')}
                            >
                                <Icon name='remove-circle-outline' size={30} style={{ color: '#FFF' }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.category}>
                        <Text style={styles.text}>Thể Thao</Text>
                        <View style={styles.action}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]} onPress={hanldeEdit}>
                                <Icon2 name='edit' size={30} style={{ color: '#FFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => handleDeletePress('Thể Thao')}
                            >
                                <Icon name='remove-circle-outline' size={30} style={{ color: '#FFF' }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.category}>
                        <Text style={styles.text}>Thể Thao</Text>
                        <View style={styles.action}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]} onPress={hanldeEdit}>
                                <Icon2 name='edit' size={30} style={{ color: '#FFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => handleDeletePress('Thể Thao')}
                            >
                                <Icon name='remove-circle-outline' size={30} style={{ color: '#FFF' }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                </ScrollView>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalText}>Bạn có chắc muốn xoá "{selectedCategory}"?</Text>
                            <View style={styles.modalActions}>
                                <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                                    <Text style={{ color: '#000' }}>Huỷ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalBtnDelete} onPress={confirmDelete}>
                                    <Text style={{ color: '#FFF' }}>Xoá</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        elevation: 5
    },
    textTitle: {
        fontFamily: 'times new roman',
        fontSize: 22,
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
        paddingTop: 20,
    },
    textHeader: {
        fontFamily: 'times new roman',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textAdd: {
        fontFamily: 'times new roman',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 50
    },
    add: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        backgroundColor: '#2196F3',
        padding: 5
    },
    actionBtn: {
        padding: 5,
        backgroundColor: '#ff0505',
    },
    listCategory: {
        paddingTop: 20,
        padding: 15,
        marginBottom: 25,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 15,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '25%'
    },
    text: {
        fontFamily: 'times new roman',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 10
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'times new roman'
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10
    },
    modalBtnCancel: {
        padding: 10,
        backgroundColor: '#EEE',
        borderRadius: 5
    },
    modalBtnDelete: {
        padding: 10,
        backgroundColor: '#F44336',
        borderRadius: 5
    },

})