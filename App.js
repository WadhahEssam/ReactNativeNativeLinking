/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  Alert,
  NativeEventEmitter,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
import {
  ActionBar,
  Button,
  Carousel,
  View,
  Spacings,
  PageCarousel,
  Colors,
  Card,
  TextField,
} from 'react-native-ui-lib';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CalendarModule from './NativeModules/CalanderModule';

const App = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    console.log("working");
    DeviceEventEmitter.addListener('CalenderEvent', (event) => {
      console.log({event});
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ActionBar
          keepRelative
          actions={[
            {
              label: 'حذف',
              onPress: () => Alert.alert('delete'),
              red30: true,
            },
            {
              label: 'تجربة',
              onPress: () => Alert.alert('replace photo'),
            },
            {label: 'تعديل', onPress: () => Alert.alert('edit')},
          ]}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 40,
            }}>
            <TextField
              flex={1}
              hideUnderline={false}
              title={'Title'}
              value={title}
              onChangeText={(value) => {
                setTitle(value);
              }}
              helperText={'Helper Text'}
              editable
              maxLength={20}
            />
            <TextField
              hideUnderline={false}
              title={'Location'}
              helperText={'Helper Text'}
              editable
              value={location}
              onChangeText={(value) => {
                setLocation(value);
              }}
              maxLength={20}
            />
          </View>
          <View flex={1} style={{marginTop: 20, paddingHorizontal: 40}}>
            <Button
              disabled={title === '' || location === ''}
              backgroundColor="#30B650"
              label="Create Event"
              labelStyle={{fontWeight: '600'}}
              style={{marginBottom: 10}}
              enableShadow
              onPress={async () => {
                // CalendarModule.createCalenderEvent({
                //   title,
                //   location,
                //   callback: (result) => {
                //     console.log({result});
                //   },
                // });
                const result = await CalendarModule.createCalenderEventPromise({
                  title,
                  location,
                });
                console.log({result});
              }}
            />
          </View>
          <View flex={1} style={{marginTop: 20, paddingHorizontal: 40}}>
            <Button
              backgroundColor="#30B650"
              label="Get Constants"
              labelStyle={{fontWeight: '600'}}
              style={{marginBottom: 10}}
              enableShadow
              onPress={() => {
                const constants = CalendarModule.getConstants();
                console.log({constants});
              }}
            />
          </View>
          <View marginTop={20}>
            <Carousel
              key={4}
              autoplay={true}
              onChangePage={() => {
                console.log('page changed');
              }}
              containerPaddingVertical={10}
              pageWidth={300}
              itemSpacings={Spacings.s3}
              containerMarginHorizontal={Spacings.s2}
              initialPage={2}
              containerStyle={{height: 160}}
              pageControlPosition={Carousel.pageControlPositions.UNDER}
              pageControlProps={{
                onPagePress: () => {
                  console.log('page pressed');
                },
                limitShownPages: false,
              }}
              // showCounter
              allowAccessibleLayout>
              {[...Array(4)].map((item, index) => (
                <Card
                  height={120}
                  flex
                  selected={false}
                  onPress={() => {
                    console.log('card is pressed');
                  }}
                  activeOpacity={1}
                  selectionOptions={{
                    color: Colors.grey10,
                    indicatorSize: 25,
                    borderWidth: 3,
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>يا هلا و مرحب</Text>
                  </View>
                </Card>
              ))}
            </Carousel>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
});

export default App;
