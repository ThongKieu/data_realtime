import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GoogleMapReact from 'google-map-react';
import { Tooltip } from '@material-tailwind/react';


function MapWorker({ auth }) {
  const defaultProps = {
    center: {
      lat: 10.8199936,
      lng: 106.7122688
    },
    icon: 'assets/avatar/avata1.png',
    zoom: 15
  };
  const AnyReactComponent = ({ text, icon }) => <div>
    <Tooltip
      content={text}
    >
      <img src={icon} alt="" srcset="" className='inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md border border-blue-500 p-0.56 bg-white ' /></Tooltip>
  </div>;

  let arLocal = [{
    lat: 10.8199936,
    lng: 106.7122688,
    icon: 'assets/avatar/avata1.png',
    text: 'ThongKieu'
  },
  {
    lat: 10.8215373,
    lng: 106.6890941,
    icon: 'assets/avatar/avata2.png',
    text: 'Manh'
  },
  {
    lat: 10.8225242,
    lng: 106.6939575,
    icon: 'assets/avatar/avata3.png',
    text: 'ThongKieu2'
  }];
  return (
    <AuthenticatedLayout children={auth.user} user={auth.user}>
      <Head title="Trang Chủ" />
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBzAoR7KxrtAYO4WBp5z0YTpTjyKs-Ug8E" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          defaultIcon={defaultProps.icon}
        >
          {arLocal.map((i) => (
            <AnyReactComponent
              lat={i.lat}
              lng={i.lng}
              text={i.text}
              icon={'http://192.168.1.3/' + i.icon} />
          ))}
        </GoogleMapReact>
      </div>
    </AuthenticatedLayout>
  );
}

export default MapWorker;