import React from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart({lat, long}) {
    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
            <Marker coordinates={[Number(lat), Number(long)]}>
                <circle r={8} fill="#F53" />
            </Marker>
        </ComposableMap>
    )
}
