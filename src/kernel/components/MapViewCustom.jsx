import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

//18.85041450530231, -99.20076150087849

export default function MapViewCustom(props) {

  const { latitude, longitude, title, description } = props

  const [location, setLocation] = useState(null);

  let subscription;

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permiso de ubicación denegado');
      return;
    }

    subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (loc) => {
        setLocation(loc.coords);
        console.log(loc.coords)
      }
    );
  };


  useEffect(() => {
    startTracking();
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {
        location && (
          <MapView style={styles.map} initialRegion={{
            latitude: location.latitude || 18.85041450530231,
            longitude: location.longitude || -99.20076150087849,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
            zoomControlEnabled='true'
          >
            <Marker coordinate={{
              latitude: location.latitude || 18.85041450530231,
              longitude: location.longitude || -99.20076150087849,
            }}
              title={title}
              description={description}
            ></Marker>
          </MapView>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  map: {
    width: '90%',
    height: 320,
  },
});