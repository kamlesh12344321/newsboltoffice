// Libraries import
import React, {useRef, useState} from 'react';

// Local import
import ReelsComponent from './ReelsComponent';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ZText from '../../../components/common/ZText';
import {styles} from '../../../themes';
import {FlashList} from '@shopify/flash-list';
import {moderateScale} from '../../../common/constants';
import Comment from '../../../components/models/Comment';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const onPressCategory = itm => setSelectedCategory(itm);

  const RenderCategory = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressCategory(index)}
        style={
          selectedCategory !== index
            ? localStyles.categoryContainer
            : localStyles.selectedCategoryContainer
        }>
        <ZText
          type={'b16'}
          // color={selectedCategory !== index ? 'white' : 'black'}
        >
          {index}
        </ZText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flex}>
      <ReelsComponent />
      {/* <View style={localStyles.root}>
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({item, index}) => (
            <RenderCategory title={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={10}
        />
      </View> */}
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    ...styles.pv10,
    ...styles.ml10,
  },
  categoryContainer: {
    ...styles.ph15,
    ...styles.pv10,
    ...styles.mr10,
    borderWidth: moderateScale(1),
    borderColor: 'white',
    borderRadius: moderateScale(16),
  },
  selectedCategoryContainer: {
    ...styles.ph15,
    ...styles.pv10,
    ...styles.mr10,
    borderWidth: moderateScale(1),
    borderColor: 'black',
    backgroundColor: 'black',
    borderRadius: moderateScale(16),
  },
});
