import { Icon, LatLngTuple } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet';
import { User } from "../helpers/types";

type MapContainerOpProps = {
    user: User,
}

const INIT_POINTS: LatLngTuple = [26.8467, 80.9462]

const MapContainerOP = (props: MapContainerOpProps) => {
    const [polylines, setPolylines] = useState<LatLngTuple[]>([])

    const addNewPosition = (x: number, y: number) => {
        setPolylines(polylines =>
            [...polylines, [x, y] as LatLngTuple]
        )
    }

    useEffect(() => {
        window.addEventListener('newPosition', (event) =>
            addNewPosition(event.detail.lat, event.detail.lng)
        )
    }, [])

    return (
        <div className="App" style={{ height: "90vh" }}>
            <MapContainer center={INIT_POINTS} zoom={10} scrollWheelZoom={true} style={{ height: "90vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {polylines.length > 0 && <Marker icon={new Icon({ iconUrl: markerIconPng, iconSize: [15, 27], iconAnchor: [7, 27] })}
                    position={polylines[polylines.length - 1]}>
                    <Tooltip>{props.user.username}</Tooltip>
                </Marker>}
                <Polyline pathOptions={{ color: 'lime' }} positions={polylines} />
            </MapContainer>
        </div>
    );
};

export default MapContainerOP;

