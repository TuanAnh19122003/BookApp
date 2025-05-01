import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../redux/features/book/bookAction';
import { getAllCategories } from '../../redux/features/category/CategoryAction';
import { launchImageLibrary } from 'react-native-image-picker';

const BookCreateScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { categories } = useSelector(state => state.category);
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    const handleSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.7,
            },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    console.error('ImagePicker Error:', response.errorMessage);
                    return;
                }
                const selectedAsset = response.assets[0];
                setImage(selectedAsset);
            }
        );
    };

    const handleSave = async () => {
        if (title.trim() === '' || author.trim() === '') return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('categoryId', selectedCategory);

        if (image) {
            formData.append('image', {
                uri: image.uri,
                name: image.fileName || 'photo.jpg',
                type: image.type,
            });
        }

        await dispatch(createBook(formData));
        navigation.goBack();
    };

    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name='arrow-back' size={30} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Thêm sách</Text>
                <View style={{ width: 30 }}></View>
            </View>
            <ScrollView style={styles.form}>
                <Text style={styles.text}>Ảnh bìa:</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                    {image ? (
                        <Image source={{ uri: image.uri }} resizeMode='cover' style={styles.previewImg} />
                    ) : (
                        <Text style={styles.placeholderText}>Chọn ảnh</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.text}>Tên sách: </Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nhập tên sách"
                />
                <Text style={styles.text}>Tác giả: </Text>
                <TextInput
                    style={styles.input}
                    value={author}
                    onChangeText={setAuthor}
                    placeholder="Nhập tác giả"
                />
                <Text style={styles.text}>Thể loại:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    >
                        <Picker.Item label="Chọn thể loại" value="" />
                        {categories.map(cat => (
                            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.text}>Mô tả: </Text>
                <TextInput
                    style={[styles.input, styles.textarea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Nhập mô tả"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                />
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Thêm</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default BookCreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
        marginTop: 20,
        padding: 15,
    },
    text: {
        fontFamily: 'Arial',
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
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
    imagePicker: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FAFAFA',
    },
    previewImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
    placeholderText: {
        color: '#888',
        fontSize: 16,
    },
    textarea: {
        height: 120,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#FFF',
    },
    saveBtn: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 40,
    },
    saveText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
