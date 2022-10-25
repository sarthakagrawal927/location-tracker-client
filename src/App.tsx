import { LatLngTuple } from 'leaflet';
import { MapContainer, Polyline, TileLayer, Marker, Tooltip } from 'react-leaflet';
import './App.css';
import { useState, useEffect } from 'react';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet';
import { io } from 'socket.io-client'

const initPoints: LatLngTuple = [27.2716, 80.9637]

const polyline = [
  initPoints,
]

const limeOptions = { color: 'lime' }
const limeOptions2 = { color: 'red' }
const limeOptions3 = { color: 'blue' }

function App() {
  const [polylines, setPolylines] = useState(polyline)
  const [polylines2, setPolylines2] = useState(polyline)
  const [polylines3, setPolylines3] = useState(polyline)

  const addNewPosition = () => {
    setPolylines(polylines =>
      [...polylines, [polylines[polylines.length - 1][0] + Math.random() / 1000, polylines[polylines.length - 1][1] + Math.random() / 1000] as LatLngTuple]
    )
    setPolylines2(polylines =>
      [...polylines, [polylines[polylines.length - 1][0] + Math.random() / 1000, polylines[polylines.length - 1][1] + Math.random() / 1000] as LatLngTuple]
    )
    setPolylines3(polylines =>
      [...polylines, [polylines[polylines.length - 1][0] + Math.random() / 1000, polylines[polylines.length - 1][1] + Math.random() / 1000] as LatLngTuple]
    )
  }

  const [show, setShow] = useState({ show1: true, show2: true, show3: true })

  useEffect(() => {
    const socket = io('http://localhost:8080')
    socket.on('connect', () => console.log(socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 8080)
    })
    socket.on('message', (data: any) => {
      addNewPosition()
    })
  }, [])

  const fetchUsers = async () => {
    const { users } = await (await fetch('http://localhost:8080/users')).json()
    return users;
  }

  return (
    <div style={{ display: "flex", flexDirection: 'row' }}>
      <div>
        <h1>
          People
        </h1>
        <div onClick={() => setShow({ ...show, show1: !show.show1 })}>p1</div>
        <div onClick={() => setShow({ ...show, show2: !show.show2 })}>p2</div>
        <div onClick={() => setShow({ ...show, show3: !show.show3 })}>p3</div>
      </div>
      <div className="App" style={{ height: "90vh" }}>
        <MapContainer center={initPoints} zoom={13} scrollWheelZoom={false} style={{ height: "90vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {show.show1 && <>
            <Marker icon={new Icon({ iconUrl: markerIconPng, iconSize: [15, 27], iconAnchor: [7, 27] })}
              position={polylines[polylines.length - 1]}>
              <Tooltip>p1</Tooltip>
            </Marker>
            <Polyline pathOptions={limeOptions} positions={polylines} />
          </>
          }
          {show.show2 && <Polyline pathOptions={limeOptions2} positions={polylines2} />}
          {show.show3 && <Polyline pathOptions={limeOptions3} positions={polylines3} />}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
