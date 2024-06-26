import { Card, Typography } from "@material-tailwind/react";
function TableDataTV ({tableHead,tableRows}) {
    return(
    <Card className="w-full h-full overflow-scroll">
        <table className="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    {tableHead.map((head) => (
                        <th
                            key={head}
                            className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {head}
                            </Typography>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableRows.map(({ name, job, date }, index) => {
                    const isLast = index === tableRows.length - 1;
                    const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
                    return (
                        <tr key={name}>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {name}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {job}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {date}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    Edit
                                </Typography>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </Card>)
};

export default {TableDataTV};
