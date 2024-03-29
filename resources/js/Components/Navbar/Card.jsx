/* eslint-disable react/prop-types */
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import newSocket from "@/Utils/Socket";
import { host } from "@/Utils/UrlApi";
function CardMain() {
    const [workDataCountOrder, setWorkDataCountOrder] = useState(0);
    const [workDataCountOrderDaPhan, setWorkDataCountOrderDaPhan] = useState(0);
    const [socketDelete, setSocketDelete] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        if (!hasLoaded) {
            setSocketDelete(newSocket, { secure: true });
            fetchDelete();
            fetchData();
            fetchDataOrderDone();
            newSocket.on("sendAddWorkTo_Client", (data) => {
                fetchDelete(data);
                fetchData(data);
                fetchDataOrderDone(data);
            });
            setHasLoaded(true);
        }
        // lắng nghe server
        return () => {
            if (socketDelete) {
                socketDelete.disconnect();
            }
        };
    }, [hasLoaded, socketDelete]);
    const fetchData = async () => {
        try {
            const response = await fetch(host+"api/web/works");
            const jsonData = await response.json();
            setWorkDataCountOrder(jsonData.dem_lich);
            if (socketDelete) {
                socketDelete.emit("addWorkTo_Server", jsonData.num_can);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataOrderDone = async () => {
        try {
            const response = await fetch(host+"api/web/works_done");
            const jsonData = await response.json();
            setWorkDataCountOrderDaPhan(jsonData.dem_lich_done);
            if (socketDelete) {
                socketDelete.emit("addWorkTo_Server", jsonData.num_can);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [workDataCountDelete, setWorkDataCountDelete] = useState(0);
    const fetchDelete = async () => {
        try {
            const response = await fetch(host+"api/web/cancle/works");
            const jsonData = await response.json();
            setWorkDataCountDelete(jsonData.num_can);
            if (socketDelete) {
                socketDelete.emit("addWorkTo_Server", jsonData.num_can);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const DataTitle = [
        {
            id: 1,
            title: "Tổng Lịch",
            count:
                workDataCountOrder +
                workDataCountOrderDaPhan +
                workDataCountDelete,
            typographyColor: "text-center text-blue-600 text-sm",
            cardBorderColor:
                "m-1  border border-solid cursor-auto shadow-blue-400  border-blue-600 justify-center w-28 rounded",
        },
        {
            id: 2,
            title: "Chưa Phân",
            count: workDataCountOrder,
            typographyColor: "text-center  text-yellow-600 text-sm",
            cardBorderColor:
                "m-1  border border-solid cursor-auto shadow-yellow-400  w-96 border-yellow-600 justify-center  w-28 rounded",
        },
        {
            id: 3,
            title: "Đã Phân",
            count: workDataCountOrderDaPhan,
            typographyColor: "text-center  text-green-600 text-sm",
            cardBorderColor:
                "m-1 border border-solid cursor-auto shadow-green-400  w-96 border-green-600 justify-center  w-28 rounded",
        },
    ];

    return (
        <div className="flex items-center justify-between ">
            {DataTitle.map((result, key) => {
                return (
                    <Card key={key} className={result.cardBorderColor}>
                        <CardBody className="flex items-center justify-between p-1 ">
                            <Typography
                                className={result.typographyColor}
                                variant="paragraph"
                                color="blue-gray"
                            >
                                {result.title}
                            </Typography>
                            <Typography
                                className={result.typographyColor}
                                variant="paragraph"
                                color="blue-gray"
                            >
                                {result.count}
                            </Typography>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
}

export default CardMain;
