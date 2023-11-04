import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const dataSource = [
    {
        id: 1,
        classCard: "green",
        source: "App",
        countOrder: 150,
    },
    {
        id: 2,
        classCard: "yellow",
        source: "Web",
        countOrder: 70,
    },
    {
        id: 3,
        classCard: "blue",
        source: "Tổng Đài",
        countOrder: 150,
    },
    {
        id: 4,
        classCard: "orange",
        source: "Thợ Gửi Về",
        countOrder: 70,
    },
];

function CardOrderSource({props}) {
    return (
        <>
            {dataSource.map((item) => (
                <Card
                    key={item.id}
                    className={`flex flex-col m-2 rounded-none text-center border border-${item.classCard}-500`}
                >
                    <Typography className={`p-0 font-bold text-center text-white rounded-none rounded-bl-none rounded-br-none bg-blue-gray-300`}>
                        <p className="font-bold ">{item.source}</p>
                    </Typography>
                    <p>{item.countOrder} Lịch</p>
                </Card>
            ))}
            {props}
        </>
    );
}

export default CardOrderSource;
