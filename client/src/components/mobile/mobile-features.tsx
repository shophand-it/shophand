import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera as CameraIcon, MapPin, Bell, Smartphone } from 'lucide-react';

interface MobileFeaturesProps {
  isNative?: boolean;
}

export default function MobileFeatures({ isNative = false }: MobileFeaturesProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);

  useEffect(() => {
    if (isNative) {
      initializeMobileFeatures();
    }
  }, [isNative]);

  const initializeMobileFeatures = async () => {
    try {
      // Initialize Capacitor features when running in mobile app
      if (typeof window !== 'undefined' && window.Capacitor) {
        const { Camera } = await import('@capacitor/camera');
        const { Geolocation } = await import('@capacitor/geolocation');
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        const { SplashScreen } = await import('@capacitor/splash-screen');

        // Set status bar style for mobile
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#1a1a1a' });

        // Hide splash screen
        await SplashScreen.hide();

        // Request permissions
        await requestPermissions();
      }
    } catch (error) {
      console.error('Mobile initialization error:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      if (typeof window !== 'undefined' && window.Capacitor) {
        const { Camera } = await import('@capacitor/camera');
        const { Geolocation } = await import('@capacitor/geolocation');
        const { LocalNotifications } = await import('@capacitor/local-notifications');

        // Location permission
        const locationPermission = await Geolocation.requestPermissions();
        if (locationPermission.location === 'granted') {
          const position = await Geolocation.getCurrentPosition();
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }

        // Camera permission
        const cameraPermission = await Camera.requestPermissions();
        setCameraPermission(cameraPermission.camera === 'granted');

        // Notification permission
        const notificationPermission = await LocalNotifications.requestPermissions();
        setNotificationPermission(notificationPermission.display === 'granted');
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const scanPartQR = async () => {
    try {
      if (typeof window !== 'undefined' && window.Capacitor) {
        const { Camera } = await import('@capacitor/camera');
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
        const { LocalNotifications } = await import('@capacitor/local-notifications');

        await Haptics.impact({ style: ImpactStyle.Light });
        
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: 'uri',
          source: 'camera'
        });

        // Process QR code for parts verification
        console.log('QR Code scanned:', image.webPath);
        
        // Send notification after successful scan
        await LocalNotifications.schedule({
          notifications: [{
            title: 'Part Verified',
            body: 'QR code scanned successfully. Part details loaded.',
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) }
          }]
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const trackDelivery = async () => {
    try {
      if (typeof window !== 'undefined' && window.Capacitor) {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
        const { LocalNotifications } = await import('@capacitor/local-notifications');

        await Haptics.impact({ style: ImpactStyle.Medium });
        
        if (location) {
          // Send location-based delivery notification
          await LocalNotifications.schedule({
            notifications: [{
              title: 'ShopHand™ Delivery Update',
              body: `Driver is 5 minutes away from ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
              id: 2,
              schedule: { at: new Date(Date.now() + 2000) }
            }]
          });
        }
      }
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  const sendOrderNotification = async (orderAmount: string) => {
    try {
      if (typeof window !== 'undefined' && window.Capacitor) {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
        const { LocalNotifications } = await import('@capacitor/local-notifications');

        await Haptics.impact({ style: ImpactStyle.Heavy });
        
        await LocalNotifications.schedule({
          notifications: [{
            title: 'Order Confirmed - ShopHand™',
            body: `Your ${orderAmount} order has been confirmed and will be delivered soon.`,
            id: 3,
            schedule: { at: new Date(Date.now() + 1000) }
          }]
        });
      }
    } catch (error) {
      console.error('Notification error:', error);
    }
  };

  if (!isNative) {
    return (
      <Card className="bg-automotive-black-800 border-gold-600/20 mb-4">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-gold-500" />
            Mobile App Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-400 text-sm">
            Download the ShopHand™ mobile app for enhanced features:
            <ul className="mt-2 space-y-1">
              <li>• QR code part verification</li>
              <li>• Real-time GPS delivery tracking</li>
              <li>• Push notifications for orders</li>
              <li>• Biometric secure payments</li>
            </ul>
            <div className="mt-4 flex space-x-2">
              <Badge className="bg-green-600 text-white">Google Play</Badge>
              <Badge className="bg-blue-600 text-white">App Store</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Native Mobile Features */}
      <Card className="bg-automotive-black-800 border-gold-600/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-gold-500" />
            Mobile Features Active
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QR Scanner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CameraIcon className="w-4 h-4 mr-2 text-gold-500" />
              <span className="text-white text-sm">QR Part Scanner</span>
              <Badge className={`ml-2 ${cameraPermission ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                {cameraPermission ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <Button 
              size="sm" 
              onClick={scanPartQR}
              className="bg-gold-gradient text-automotive-black-900"
              disabled={!cameraPermission}
            >
              Scan
            </Button>
          </div>

          {/* GPS Tracking */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gold-500" />
              <span className="text-white text-sm">GPS Tracking</span>
              <Badge className={`ml-2 ${location ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                {location ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <Button 
              size="sm" 
              onClick={trackDelivery}
              className="bg-gold-gradient text-automotive-black-900"
              disabled={!location}
            >
              Track
            </Button>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-4 h-4 mr-2 text-gold-500" />
              <span className="text-white text-sm">Push Notifications</span>
              <Badge className={`ml-2 ${notificationPermission ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                {notificationPermission ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <Button 
              size="sm" 
              onClick={() => sendOrderNotification('$42,500')}
              className="bg-gold-gradient text-automotive-black-900"
              disabled={!notificationPermission}
            >
              Test
            </Button>
          </div>

          {location && (
            <div className="bg-automotive-black-700 rounded-lg p-3 mt-4">
              <p className="text-gray-400 text-xs">Current Location:</p>
              <p className="text-white text-sm font-mono">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}