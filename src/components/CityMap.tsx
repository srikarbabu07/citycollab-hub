
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CityMapProps {
  className?: string;
}

const CityMap: React.FC<CityMapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = React.useState<string>('');

  useEffect(() => {
    // This would normally come from environment variables
    // For this demo, we'll use a placeholder - users need to provide their own token
    if (!mapContainer.current) return;
    if (!mapToken) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [78.9629, 20.5937], // India
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Disable scroll zoom for smoother experience
    map.current.scrollZoom.disable();

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
    });

    // Rotation animation settings
    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    // Spin globe function
    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Event listeners for interaction
    map.current.on('mousedown', () => {
      userInteracting = true;
    });
    
    map.current.on('dragstart', () => {
      userInteracting = true;
    });
    
    map.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });
    
    map.current.on('touchend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.current.on('moveend', () => {
      spinGlobe();
    });

    // Start the globe spinning
    spinGlobe();

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  return (
    <div className={`relative w-full h-full min-h-[300px] ${className || ''}`}>
      {!mapToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-2">Enter your Mapbox token to view the map</p>
          <input 
            type="text" 
            placeholder="Enter Mapbox token"
            className="px-3 py-2 border rounded-md w-full max-w-md text-sm"
            onChange={(e) => setMapToken(e.target.value)}
          />
          <p className="mt-2 text-xs text-gray-400">
            Get a token from <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">mapbox.com</a>
          </p>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
        </>
      )}
    </div>
  );
};

export default CityMap;
