import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
    ArrowLongUpIcon,ArrowLongDownIcon
} from "@heroicons/react/24/outline";
function CardOrder({imgSrc,ClassCard,titleTop,titleMid,titleBot,classSpanIcon,classIconBot,classSpanText,IconChild}) {
    return (
        <Card className={`p-4 py-5 text-black border rounded border-${ClassCard}-500`}>
            <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-col justify-center">
                    <span>{titleTop}</span>
                    <span>{titleMid} Lịch</span>
                </div>
                <span className={`p-2 border border-${classSpanIcon}-500 bg-${classSpanIcon}-500 text-white rounded-[50%]`}>
                    <img className="w-7 h-7" src={`${imgSrc}`} alt="" />
                    {/* {IconChild} */}
                </span>
            </div>
            <Typography className="flex flex-row items-center pt-2">
                {titleBot > 15 ?(<ArrowLongUpIcon className={`w-3 h-3 text-${classIconBot}-500`} />):(<ArrowLongDownIcon className={`w-3 h-3 text-${classIconBot}-500`} />)}
                <span className={`px-1 text-${classSpanText}-500`}>{titleBot} %</span>
                <span>Tháng Trước</span>
            </Typography>
        </Card>
    );
}

export default CardOrder;
