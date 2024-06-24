import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { host } from "@/Utils/UrlApi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const TestLocation = () => {
    const TABLE_HEAD = ["Address", "Lat", "Lng", "Time"];
    const [data, setData] = useState(null);
    const [changeInput, setChangeInput] = useState();
    const fetchData = async (id_Worker) => {
        if (id_Worker) {
            const requestBody = {
                idWorker: id_Worker,
            };
            try {
                const response = await fetch(host + "api/web/getLocation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        useEffect(() => {
            fetchData();
        }, []);
        return (
            <AuthenticatedLayout>
                <Head title="Test Location" />
                <Card className="flex flex-row m-2">
                    <Input
                        type="text"
                        name=""
                        onChange={(e) => setChangeInput(e.target.value)}
                        className="pr-2 border-none"
                        labelProps={{ className: "hidden " }}
                    />
                    <Button onClick={handleLocal_Worker}>Tìm</Button>
                </Card>
                <Card className="w-full h-full overflow-scroll">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="black"
                                            style={{ fontWeight: "bold" }}
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map(
                                    (
                                        { id, address, lat, lng, time },
                                        index
                                    ) => {
                                        const isLast =
                                            index === data.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={id}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {address}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {lat}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {lng}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {time}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </tbody>
                    </table>
                </Card>
            </AuthenticatedLayout>
        );
    };
};
export default TestLocation;
