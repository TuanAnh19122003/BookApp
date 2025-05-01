import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import Icon2 from '@react-native-vector-icons/feather';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../redux/features/book/bookAction';
import { useFocusEffect } from '@react-navigation/native';
import { deleteBook } from '../../redux/features/book/bookAction';

const BookScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { books, loading } = useSelector(state => state.book);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const URL = 'http://10.0.2.2:5000';

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getAllBooks());
        }, [dispatch])
    );

    const handleDeletePress = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const handleEdit = (id) => {
        navigation.navigate('BookEdit', { id });
        console.log(id);
    };

    const confirmDelete = async () => {
        if (selectedBook && selectedBook.id) {
            await dispatch(deleteBook(selectedBook.id));
            setModalVisible(false);
            setSelectedBook(null);
            dispatch(getAllBooks()); 
        }
    };

    const handleHome = () => {
        navigation.goBack();
    };

    const handleAdd = () => {
        navigation.navigate('BookCreate');
    };

    const renderItem = ({ item }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookRow}>
                <View style={styles.bookContent}>
                    <Image
                        source={{ uri: `${URL}/${item.image}` }}
                        style={styles.img}
                        resizeMode="cover"
                    />
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>Author: {item.author}</Text>
                        <Text style={styles.text}>Category: {item.category?.name}</Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                        onPress={() => handleEdit(item.id)}
                    >
                        <Icon2 name="edit-3" size={20} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#F44336' }]}
                        onPress={() => handleDeletePress(item)}
                    >
                        <Icon name="trash-outline" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <TouchableOpacity onPress={handleHome}>
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Book</Text>
                <TouchableOpacity>
                    <Icon name="settings-outline" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <View style={styles.categoryHeader}>
                    <Text style={styles.textHeader}>Danh mục sách</Text>
                    <TouchableOpacity style={styles.add} onPress={handleAdd}>
                        <Icon name="add-sharp" size={30} />
                        <Text style={styles.textAdd}>New</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? <Text>Loading...</Text> : null}
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                style={{ padding: 10 }}
            />
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>
                            Bạn có chắc muốn xoá "{selectedBook?.title}"?
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.modalBtnCancel}
                                onPress={() => setModalVisible(false)}
                            >
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
    );
};

export default BookScreen;

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
        elevation: 5,
    },
    textTitle: {
        fontFamily: 'times new roman',
        fontSize: 22,
        fontWeight: 'bold',
    },
    list: {
        paddingTop: 30,
        marginBottom: 20,
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
        gap: 50,
    },
    add: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        backgroundColor: '#2196F3',
        padding: 5,
    },
    actionBtn: {
        padding: 5,
        backgroundColor: '#ff0505',
        padding: 8,
        borderRadius: 6,
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
        padding: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 15,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '25%',
    },
    text: {
        fontFamily: 'times new roman',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'times new roman',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    modalBtnCancel: {
        padding: 10,
        backgroundColor: '#EEE',
        borderRadius: 5,
    },
    modalBtnDelete: {
        padding: 10,
        backgroundColor: '#F44336',
        borderRadius: 5,
    },
    bookCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 25,
        elevation: 3,
    },
    bookRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    img: {
        width: 100,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#EEE',
    },
    info: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#000',
        fontFamily: 'times new roman',
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
        fontFamily: 'times new roman',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 10,
    },
});

