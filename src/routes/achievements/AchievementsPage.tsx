import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import React from 'react';
import { View, Image, Alert, TouchableOpacity } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const AchievementsList = () => {
	const navigation : any = useNavigation();


    return(
        
        <View style={format.box}>
            <View style={format.topBar}>
                <Text style={format.text}>
                    Achievements
                </Text>

            </View>
            <TouchableOpacity>
              <View style={format.row}>
                    <Image
                        style={format.logos}
                        source={require('@/assets/freshman.png')}
                    />
                    
                </View>
            </TouchableOpacity>
            <Divider style={format.line}/>
            <TouchableOpacity>
              <View style={format.row}>
                    <Image
                        style={format.logos}
                        source={require('@/assets/test.png')}
                    />
                  
                </View>
            </TouchableOpacity>
            <Divider style={format.line}/>
        </View>





    )
}
const format = StyleSheet.create({
    box:{
        flex: 1,
        flexDirection: 'column',
        
    },
    row:{
        height: 150,
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        //backgroundColor:'cornflowerblue',
        

    },
    topBar:{
        paddingBottom:20,
        paddingHorizontal: 20,
        paddingTop:20,
        width:'100%',
        backgroundColor: ThemeColors.primary,
    },
    logos: {
        resizeMode:'contain',
		height: 100,
		width: 200,
        
    },
    line:{
      //  marginBottom:20,
        height:1,
       // backgroundColor:'white'
       

    },
    text:{
        fontSize: 24,
		fontWeight: 'bold',
		color: ThemeColors.secondary,


    }

})
export default AchievementsList;