import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';
import { getBookById, editBook, getAllBooks } from '../../redux/features/book/bookAction';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { getAllCategories } from '../../redux/features/category/CategoryAction';

const BookEditScreen = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);
    const { book } = useSelector(state => state.book);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState('');

    const URL = 'http://10.0.2.2:5000';

    useEffect(() => {
        dispatch(getBookById(id));
    }, [id]);

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setDescription(book.description);
            setCategoryId(book.category?.id || '');
            setImageUri(book.image);
            setImageFile(null);
        }
    }, [book]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('description', description);
            formData.append('categoryId', categoryId);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            await dispatch(editBook(id, formData));
            await dispatch(getAllBooks());
            navigation.goBack();
        } catch (error) {
            console.error('Lỗi khi cập nhật sách:', error);
        }
    };

    const handleChooseImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                setImageUri(asset.uri);
                setImageFile({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || 'image.jpg'
                });
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.appbar}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name='arrow-back' size={30} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chỉnh sửa sách</Text>
                <View style={{ width: 30 }}></View>
            </View>

            <View style={styles.form}>
                <Text style={styles.text}>Tiêu đề sách:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nhập tiêu đề sách"
                />

                <Text style={styles.text}>Tác giả:</Text>
                <TextInput
                    style={styles.input}
                    value={author}
                    onChangeText={setAuthor}
                    placeholder="Nhập tác giả"
                />

                <Text style={styles.text}>Mô tả:</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Nhập mô tả"
                    multiline
                />

                <Text style={styles.text}>Danh mục:</Text>
                <Picker
                    selectedValue={categoryId}
                    style={styles.input}
                    onValueChange={(itemValue) => setCategoryId(itemValue)}
                >
                    <Picker.Item label="Chọn danh mục" value="" />
                    {categories.map((category) => (
                        <Picker.Item
                            key={category.id}
                            label={category.name}
                            value={category.id}
                        />
                    ))}
                </Picker>

                <Text style={styles.text}>Hình ảnh:</Text>
                {imageFile ? (
                    <Image source={{ uri: imageFile.uri }} style={styles.img} />
                ) : imageUri ? (
                    <Image source={{ uri: `${URL}/${imageUri}` }} style={styles.img} />
                ) : null}

                <TouchableOpacity style={styles.chooseImageBtn} onPress={handleChooseImage}>
                    <Text style={styles.chooseImageText}>Chọn ảnh</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveBtn, { marginTop: 20 }]} onPress={handleSave}>
                    <Text style={styles.saveText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default BookEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    appbar: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        elevation: 5,
    },
    textTitle: {
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    form: {
        padding: 15,
    },
    text: {
        fontFamily: 'Arial',
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    img: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#EEE',
        resizeMode: 'cover',
    },
    input: {
        marginTop: 10,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#CCC',
        fontSize: 16,
        fontFamily: 'Arial',
        marginBottom: 20,
        backgroundColor: '#FFF',
    },
    saveBtn: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 40,
    },
    saveText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Arial',
    },
    chooseImageBtn: {
        backgroundColor: '#FFC107',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    chooseImageText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Arial',
    },
});
