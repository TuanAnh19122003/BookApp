import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../redux/features/book/bookSlices';

const BookScreen = ({ navigation, router }) => {
const dispatch = useDispatch();
    const { books, loading } = useSelector(state => state.book);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Book', { id: item.id })}
        >
            <View>
                <Text>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            {loading ? <Text>Loading...</Text> : null}
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default BookScreen

const styles = StyleSheet.create({})