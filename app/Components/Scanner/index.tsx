import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef } from "react";

interface QRScannerProps {
  onCodeScanned: (data: string) => void;
  resetDelay?: number;
  showOverlay?: boolean;
  cameraStyle?: object;
  facing?: "front" | "back";
}

export default function QRScanner({
  onCodeScanned,
  resetDelay = 500,
  showOverlay = true,
  cameraStyle = {},
  facing = "back",
}: QRScannerProps) {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      
      // Pass the scanned data to the parent component
      onCodeScanned(data);
      
      // Reset the lock after the delay
      setTimeout(() => {
        qrLock.current = false;
      }, resetDelay);
    }
  };

  if (!isPermissionGranted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Text style={styles.subtitle}>
          Please allow camera access to scan QR codes
        </Text>
        <Pressable 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera Access</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={[StyleSheet.absoluteFillObject, cameraStyle]}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
      />
      {showOverlay && <Overlay />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#0E7AFE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});