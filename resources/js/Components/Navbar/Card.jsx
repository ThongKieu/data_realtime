/* eslint-disable react/prop-types */
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";

function CardMain() {
    const [WorkDataCountOrder, setWorkDataCountOrder] = useState(0);
    const [WorkDataCountOrderDaPhan, setWorkDataCountOrderDaPhan] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch("api/web/works");
            const jsonData = await response.json();
            setWorkDataCountOrder(jsonData.dem_lich);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataOrderDone = async () => {
        try {
            const response = await fetch("api/web/works_done");
            const jsonData = await response.json();
            setWorkDataCountOrderDaPhan(jsonData.dem_lich_done);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
    fetchDataOrderDone();
    const DataTitle = [
        {
            id: 1,
            title: "Tổng Lịch",
            count: WorkDataCountOrder + WorkDataCountOrderDaPhan,
            typographyColor: "text-center  text-blue-600 text-sm",
            cardBorderColor:
                "m-1  border border-solid shadow-blue-400  border-blue-600 justify-center  w-24 rounded",
        },
        {
            id: 2,
            title: "Chưa Phân",
            count: WorkDataCountOrder,
            typographyColor: "text-center  text-yellow-600 text-sm",
            cardBorderColor:
                "m-1  border border-solid shadow-yellow-400  w-96 border-yellow-600 justify-center  w-24 rounded",
        },
        {
            id: 3,
            title: "Đã Phân",
            count: WorkDataCountOrderDaPhan,
            typographyColor: "text-center  text-green-600 text-sm",
            cardBorderColor:
                "m-1 border border-solid shadow-green-400  w-96 border-green-600 justify-center  w-24 rounded",
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
