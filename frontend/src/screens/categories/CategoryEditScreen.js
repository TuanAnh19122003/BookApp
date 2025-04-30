import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@react-native-vector-icons/ionicons';
import axiosInstance from '../../util/axiosConfig';
import { editCategory } from '../../redux/features/category/CategoryAction';


const CategoryEditScreen = ({ navigation, route }) => {
    const id = parseInt(route.params.id);
    const [name, setName] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosInstance.get(`/categories/${id}`);
                setName(response.data.name);
            } catch (error) {
                console.error('Lỗi khi lấy category:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const handleBack = () => {
        navigation.goBack()
    }

    const handleSave = async () => {
        try {
            await dispatch(editCategory(id, { name }));
            navigation.goBack();
        } catch (error) {
            console.error('Lỗi khi cập nhật category:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name='arrow-back' size={30} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chỉnh sửa thể loại</Text>
                <View style={{ width: 30 }}></View>
            </View>
            <View style={styles.form}>
                <Text style={styles.text}>Tên thể loại: </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập tên thể loại"
                />
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CategoryEditScreen

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
    form: {
        marginTop: 25,
        padding: 15,
    },
    text: {
        fontFamily: 'times new roman',
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#CCC',
        fontSize: 16,
        fontFamily: 'times new roman',
        marginBottom: 20,
    },
    saveBtn: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'times new roman',
    },
})