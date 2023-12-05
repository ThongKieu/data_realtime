import React, { useEffect, useState } from "react";
import { Typography, Card } from "@material-tailwind/react";
import { host } from "@/Utils/UrlApi";
function SmsBrandZalo() {
    useEffect(() => {
        fetchDataSMSBrand();
    }, []);
    const [smsBrand, setSmsBrand] = useState(0);
    const fetchDataSMSBrand = async () => {
        try {
            const response = await fetch(host + "api/getSmsBrand");
            const jsonData = await response.json();

            if (response.ok) {
                setSmsBrand(jsonData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Typography
            className={`p-0 font-bold text-center text-white rounded rounded-bl-none rounded-br-none ${smsBrand.balance > 200 ? 'bg-blue-500': 'bg-red-500'} `}
        >
            <p className="font-bold">SMS Brand: {smsBrand.balance}</p>
        </Typography>
    );
}

export default SmsBrandZalo;
