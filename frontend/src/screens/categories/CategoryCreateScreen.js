import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/features/category/CategoryAction';

const CategoryCreateScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const hanldeBack = () => {
        navigation.goBack()
    }
    const handleSave = () => {
        if (name.trim() === '') return;

        const newCategory = { name };
        dispatch(createCategory(newCategory));
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <TouchableOpacity onPress={hanldeBack}>
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
                    <Text style={styles.saveText}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CategoryCreateScreen

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
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#CCC',
        fontSize: 16,
        fontFamily: 'times new roman',
        marginBottom: 20,
    },
    saveBtn: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: 'times new roman',
        fontSize: 16,
    },
})