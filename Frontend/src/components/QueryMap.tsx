// src/components/QueryMap.tsx
import React, { useState } from 'react'
import { MapContainer, TileLayer, Polygon, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import QueryOptions from './QueryOptions'

// Fix default icon issue in Leaflet + React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

const mapStyle = { height: '100%', width: '100%' }

const ClickHandler = ({ setLat, setLng }: { setLat: any; setLng: any }) => {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    },
  })
  return null
}

const QueryMap = (): JSX.Element => {
  const [latitude, setLatitude] = useState(50.286756)
  const [longitude, setLongitude] = useState(21.443653)

  const map_rect_size = 0.0015
  const path: [number, number][] = [
    [latitude - map_rect_size, longitude - map_rect_size - 0.0025],
    [latitude + map_rect_size, longitude - map_rect_size - 0.0025],
    [latitude + map_rect_size, longitude + map_rect_size + 0.0025],
    [latitude - map_rect_size, longitude + map_rect_size + 0.0025],
  ]

  return (
    <div className="flex-col m-2 flex w-full grow">
      <div className="h-2/4 flex w-full">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
          style={mapStyle}
        >
          <ClickHandler setLat={setLatitude} setLng={setLongitude} />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">ESRI</a>'
          />
          <Polygon positions={path} pathOptions={{ color: '#9FFF54', fillOpacity: 0.4 }} />
          <Marker position={[latitude, longitude]} />
        </MapContainer>
      </div>
      <QueryOptions
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
      />
    </div>
  )
}

export default QueryMap
