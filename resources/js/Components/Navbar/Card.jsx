/* eslint-disable react/prop-types */
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import newSocket from "@/Utils/Socket";
import { host } from "@/Utils/UrlApi";
function CardMain({ data_Work, data_Work_Assign }) {
    // const [socketCard, setSocketCard] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [dataWork, setDataWork] = useState([]);
    const [dataWork_Assign, setDataWork_Assign] = useState([]);
    const [workDataCountDelete, setWorkDataCountDelete] = useState(0);
    useEffect(() => {
        getNumberOfWork(data_Work);
        getNumberOfWork_Assign(data_Work_Assign);
        if (!hasLoaded) {
            // setSocketCard(socket_Card);
            fetchDelete();
            getNumberOfWork(data_Work);
            getNumberOfWork_Assign(data_Work_Assign);
            newSocket.on("sendAddWorkTo_Client", (data) => {
                fetchDelete(data);
                getNumberOfWork(data_Work);
                getNumberOfWork_Assign(data_Work_Assign);
            });
            setHasLoaded(true);
        }
        // lắng nghe server
        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [hasLoaded,newSocket, data_Work, data_Work_Assign]);
    const getNumberOfWork = async (data_Work) => {
        if (data_Work) {
            const totalWork =
                Array.isArray(data_Work) &&
                data_Work.reduce(
                    (total, item) => total + item.kind_worker.numberOfWork,
                    0
                );
            setDataWork(totalWork);
        }
    };
    const getNumberOfWork_Assign = async (data_Work_Assign) => {
        if (data_Work_Assign) {
            const totalWork_Assign =
                Array.isArray(data_Work_Assign) &&
                data_Work_Assign.reduce(
                    (total, item) => total + item.kind_worker.numberOfWork,
                    0
                );
                setDataWork_Assign(totalWork_Assign);
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
            count:
            dataWork_Assign +
                dataWork +
                workDataCountDelete,
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
