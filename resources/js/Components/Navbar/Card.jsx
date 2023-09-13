/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

function CardMain() {
    const DataTitle = [
        {
            id: 1,
            title: 'Mới',
            count: 0,
            typographyColor: 'text-center  text-blue-600 text-sm',
            cardBorderColor: 'm-1  border border-solid shadow-blue-400  border-blue-600 justify-center  w-24 rounded',
        },
        {
            id: 2,
            title: 'Chưa Phân',
            count: 0,
            typographyColor: 'text-center  text-yellow-600 text-sm',
            cardBorderColor: 'm-1  border border-solid shadow-yellow-400  w-96 border-yellow-600 justify-center  w-24 rounded',

        }, {
            id: 3,
            title: 'Đã Phân',
            count: 0,
            typographyColor: 'text-center  text-green-600 text-sm',
            cardBorderColor: 'm-1 border border-solid shadow-green-400  w-96 border-green-600 justify-center  w-24 rounded',

        },
        {
            id: 4,
            title: 'Hủy',
            count: 10000,
            typographyColor: 'text-center  text-red-600 text-sm',
            cardBorderColor: 'm-1 border border-solid shadow-red-400  w-96 border-red-600 justify-center  w-24 rounded',
        }
    ]
    return (
        <div className="flex items-center justify-between ">
            {DataTitle.map((result, key) => {
                return (
                    <Card key={key} className={result.cardBorderColor} >
                        <CardBody className="flex items-center justify-between p-1 ">
                            <Typography className={result.typographyColor} variant="paragraph" color="blue-gray">
                                {result.title}
                            </Typography>
                            <Typography className={result.typographyColor} variant="paragraph" color="blue-gray">
                             {result.count}
                            </Typography>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}

export default CardMain
