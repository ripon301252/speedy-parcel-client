import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import L from "leaflet";





const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef();

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (!district) {
      toast("No service found in this area");
      return;
    }
    const coord = [district.latitude, district.longitude];
    mapRef.current.flyTo(coord, 10, { duration: 2 });
    e.target.reset();
  };

  return (
    <div className="max-w-6xl mx-auto py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold ">
          We are available in 68 Districts
        </h1>
        <p className=" mt-2 text-sm md:text-base">
          Search your district to check service coverage
        </p>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-12">
        <form
          onSubmit={handleSearch}
          className="w-full max-w-md relative group"
        >
          <input
            list="districts"
            name="location"
            placeholder="Search your district..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Search
          </button>

          <datalist id="districts">
            {serviceCenters.map((c) => (
              <option value={c.district} key={c.id} />
            ))}
          </datalist>
        </form>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-lg border z-0">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[300px] md:h-[500px] w-full z-0 leaflet-container"
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={center._id || index} position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-green-600">
                    {center.district}
                  </p>
                  <p className="mt-1">
                    <span className="font-bold text-orange-500">Service Area: </span>
                    <span className="text-sm text-green-800">{center.covered_area.join(", ")}</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;