/* eslint-disable react/prop-types */
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import newSocket from "@/Utils/Socket";
import { host } from "@/Utils/UrlApi";
function CardMain() {
    const [socketCard, setSocketCard] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [dataWork, setData_Work] = useState(0);
    const [dataWork_Assign, setDataWork_Assign] = useState(0);
    const [workDataCountDelete, setWorkDataCountDelete] = useState(0);
    useEffect(() => {
        if (!hasLoaded) {
            setSocketCard(newSocket, { secure: true });
            fetchDelete();
            getNumberOfWork();
            getNumberOfWork_Assign();
            newSocket.on("sendAddWorkTo_Client", (data) => {
                fetchDelete();
                getNumberOfWork();
                getNumberOfWork_Assign();
            });
            setHasLoaded(true);
        }
        // lắng nghe server
        return () => {
            if (socketCard) {
                socketCard.disconnect();
            }
        };
    }, [hasLoaded, socketCard]);
    const getNumberOfWork = async () => {
        try {
            const response = await fetch(host + "api/web/works");
            const jsonData = await response.json();
            const totalNumberOfWork = jsonData.reduce((total, item) => {
                return total + (item.kind_worker?.numberOfWork || 0);
            }, 0);
            setData_Work(totalNumberOfWork);
            if (socketCard) {
                socketCard.emit("addWorkTo_Server", totalNumberOfWork);
            }
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };
    const getNumberOfWork_Assign = async () => {
        try {
            const response = await fetch(host + "api/web/work-assignment");
            const jsonData = await response.json();
            const totalNumberOfWork = jsonData.reduce((total, item) => {
                return total + (item.kind_worker?.numberOfWork || 0);
            }, 0);
            setDataWork_Assign(totalNumberOfWork);
            if (socketCard) {
                socketCard.emit("addWorkTo_Server", totalNumberOfWork);
            }
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };
    const fetchDelete = async () => {
        try {
            const response = await fetch(host + "api/web/cancle/works");
            const jsonData = await response.json();
            setWorkDataCountDelete(jsonData.num_can);
            if (socketCard) {
                socketCard.emit("addWorkTo_Server", jsonData.num_can);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const DataTitle = [
        {
            id: 1,
            title: "Tổng Lịch",
            count: dataWork_Assign + dataWork + workDataCountDelete,
            typographyColor: "text-center text-blue-600 text-sm",
            cardBorderColor:
                "m-1  border border-solid cursor-auto shadow-blue-400  border-blue-600 justify-center w-28 rounded",
        },
        {
            id: 2,
            title: "Chưa Phân",
            count: dataWork,
            typographyColor: "text-center  text-yellow-600 text-sm",
            cardBorderColor:
                "m-1  border border-solid cursor-auto shadow-yellow-400  w-96 border-yellow-600 justify-center  w-28 rounded",
        },
        {
            id: 3,
            title: "Đã Phân",
            count: dataWork_Assign,
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
