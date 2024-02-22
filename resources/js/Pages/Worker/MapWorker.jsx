import React, { useEffect,useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";
import { Tooltip } from "@material-tailwind/react";
import { host } from "@/Utils/UrlApi";

function MapWorker({ auth }) {
    const defaultProps = {
        center: {
            lat: 10.8199936,
            lng: 106.7122688,
        },
        icon: "assets/avatar/avata1.png",
        zoom: 15,
    };
    const AnyReactComponent = ({ text, icon }) => (
        <>
            <Tooltip content={text}>
                <img
                    src={icon}
                    alt={text}
                    className="inline-block relative object-cover object-center w-9 h-9 rounded-md border border-blue-500 p-0.56 bg-white "
                />
            </Tooltip>
        </>
    );

    let arLocal = [
        {
            lat: 10.8199936,
            lng: 106.7122688,
            icon: "assets/avatar/avata1.png",
            text: "ThongKieu",
        },
        {
            lat: 10.8215373,
            lng: 106.6890941,
            icon: "assets/avatar/avata2.png",
            text: "Manh",
        },
        {
            lat: 10.8225242,
            lng: 106.6939575,
            icon: "assets/avatar/avata3.png",
            text: "ThongKieu2",
        },
    ];
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 100,
    });
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight - 100,
            });
        };
        window.addEventListener("resize", handleResize);
    }, []);
    var heightScreenTV = screenSize.height;
    console.log(heightScreenTV);
    return (
        <AuthenticatedLayout children={auth.user} user={auth.user}>
            <Head title="Vị Trí Thợ" />
            <div style={{ height: `${heightScreenTV}px`, width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        // key: "AIzaSyBzAoR7KxrtAYO4WBp5z0YTpTjyKs-Ug8E",
                        key:"AIzaSyC5iIi-ZChi0PZ12auf77C_ZO_ooTHtAjA",
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    defaultIcon={defaultProps.icon}
                >
                    {arLocal.map((i, index) => (
                        <AnyReactComponent
                            key={index}
                            lat={i.lat}
                            lng={i.lng}
                            text={i.text}
                            icon={host + i.icon}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </AuthenticatedLayout>
    );
}

export default MapWorker;
