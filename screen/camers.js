import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {ArViewerView} from 'react-native-ar-viewer';
import {Platform} from 'react-native';

const CameraScreen = () => {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}>
        <ArViewerView
          style={{flex: 1}}
          model={Platform.OS === 'android' ? 'dice.glb' : 'dice.usdz'}
          lightEstimation
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          disableInstantPlacement
          onStarted={() => console.log('started')}
          onEnded={() => console.log('ended')}
          onModelPlaced={() => console.log('model displayed')}
          onModelRemoved={() => console.log('model not visible anymore')}
          planeOrientation="both"
        />
      </RNCamera>
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={{padding: 16}}>
          <Text style={{fontSize: 20, marginBottom: 10, color: 'black'}}>
            SNAP
          </Text>
        </TouchableOpacity>
      </View>
    </View> 
  
  );
};

export default CameraScreen;
