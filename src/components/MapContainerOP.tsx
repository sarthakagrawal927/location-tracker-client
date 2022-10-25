import { Icon, LatLngTuple } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet';
import { User } from "../helpers/types";

const initPoints: LatLngTuple = [27.2716, 80.9637]
const polyline = [
    initPoints,
]

type MapContainerOpProps = {
    user: User,
}

const MapContainerOP = (props: MapContainerOpProps) => {
    const [polylines, setPolylines] = useState(polyline)

    const addNewPosition = (x: number, y: number) => {
        setPolylines(polylines =>
            [...polylines, [x, y] as LatLngTuple]
        )
    }

    useEffect(() => { // TODO
        window.addEventListener('newPosition', ({ detail }: any) => { addNewPosition(detail.lat, detail.lng) })
    }, [])

    return (
        <div className="App" style={{ height: "90vh" }}>
            <MapContainer center={initPoints} zoom={13} scrollWheelZoom={false} style={{ height: "90vh" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={new Icon({ iconUrl: markerIconPng, iconSize: [15, 27], iconAnchor: [7, 27] })}
                    position={polylines[polylines.length - 1]}>
                    <Tooltip>{props.user.username}</Tooltip>
                </Marker>
                <Polyline pathOptions={{ color: 'lime' }} positions={polylines} />
            </MapContainer>
        </div>
    );
};

export default MapContainerOP;

