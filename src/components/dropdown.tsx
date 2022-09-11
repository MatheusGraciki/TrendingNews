import React, { useEffect, useState } from "react";
import { Image, Text, FlatList, StyleSheet, ListRenderItemInfo} from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { Articles, forbiddenAccess, serviceAPI } from '../services/api-service';
import { TopNews } from '../services/api-service';



const local_data = [
    {
        value: 'br',
        lable: 'Brazil',
        image: {
            uri: 'https://img.icons8.com/fluency/48/000000/brazil.png',
        },
    },
    {
        value: 'us',
        lable: 'United States',
        image: {
            "uri": 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '3',
        lable: 'Country 3',
        image: {
            "uri": 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '4',
        lable: 'Country 4',
        image: {
            "uri": 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '5',
        lable: 'Country 5',
        image: {
            "uri": 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
];


export default function SelectCountryScreen() {
    const [country, setCountry] = useState('br');
    const [news, setNews] = useState<TopNews[]>([]);
    const [content, setContent] = useState('');


    async function getArticles() {
        try{
            const res = await serviceAPI.getArticles(country);

            if(!res) {
                return;
            }


            setNews(res);

        } catch(err) {

            if (err instanceof forbiddenAccess) {
                console.log('error');
            }
            console.error(err);
        }


    }

    useEffect(() => {
        getArticles();
    }, []);


    console.log('aqui ', news.map((item: TopNews) => {
        return item.content;
    }));

    function renderItem({ item }: ListRenderItemInfo<TopNews>) {
        return (
            <>
                <Text style={{ marginTop: 20, borderBottomColor: "#fff", borderBottomWidth: 1}}>{item.content}</Text>
                <Image source={{ uri: item.urlToImage}} style={{ width: 200, height: 100}}/>
            </>
        );
    }


    return (
        <>
            <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={country}
                data={local_data}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder="Select country"
                searchPlaceholder="Search..."
                onChange={e => {
                    setCountry(e.value);
                    getArticles();
                }}
            />

            <FlatList
                data={news}
                renderItem={renderItem}
            />


        </>

    );
}


const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 150,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
