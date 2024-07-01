import { Card, Typography } from "@material-tailwind/react";
import {
    formatCurrencyVND,
    formatNumberToVNDk,
    processSeriImages,
} from "../ColumnRightDialog";
import React, { useEffect, useState } from "react";

const TemplateAC1 = ({ params, processedDataKS, handleBaoGiaClick }) => {
    const data = [
        {
            id: "noi_dung",
            headContent: " Nội Dung Công Việc:",
            value_quote: params?.work_content,
        },
        {
            id: "dia_chi",
            headContent: "Địa chỉ:",
            value_quote: params?.street,
        },
        {
            id: "quan",
            headContent: " Quận:",
            value_quote: params?.district,
        },
        {
            id: "sdt",
            headContent: " Số điện thoại:",
            value_quote: params?.phone_number,
        },
        {
            id: "noi_dung_ks",
            headContent: " Nội Dung Khảo Sát:",
            value_quote: params?.real_note,
        },
        {
            id: "chi",
            headContent: "Dự Chi:",
            value_quote: formatNumberToVNDk(params?.spending_total),
        },
        {
            id: "thu",
            headContent: "Dự Thu:",
            value_quote: formatNumberToVNDk(params?.income_total),
        },
    ];
    return (
        <>
            {data && params && (
                <>
                    <div className="p-4 mb-2 bg-white rounded-lg shadow-md">
                        {data.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center mb-2"
                                >
                                    <h2 className="pr-2 text-lg font-semibold">
                                        {item.headContent}
                                    </h2>
                                    <span>{item.value_quote}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mb-2">
                        <h2 className="text-lg font-semibold">
                            Hình Ảnh Khảo Sát Thực Tế:
                        </h2>
                        {params.bill_imag == null ||
                        processedDataKS == false ? (
                            <p className="flex items-center justify-center w-32 h-32 border border-green-500">
                                Not Image
                            </p>
                        ) : (
                            <span className="flex justify-between">
                                {Array.isArray(processedDataKS) &&
                                    processedDataKS.map((item, index) => (
                                        <img
                                            key={index}
                                            src={item}
                                            alt={`hinhKS_${index}`}
                                            className="w-40 h-40"
                                            onClick={() =>
                                                handleBaoGiaClick(
                                                    `hinhKS_${
                                                        params.street
                                                            ? params.street
                                                            : params.district
                                                    }`,
                                                    item
                                                )
                                            }
                                        />
                                    ))}
                            </span>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
const TemplateAC2 = ({ params, dataQuote, handleBaoGiaClick }) => {
    const [resultQuote, setResultQuote] = useState([]);
    useEffect(() => {
        if (dataQuote) {
            setResultQuote(dataQuote);
        }
    }, [dataQuote]);
    const imageQuote = processSeriImages(resultQuote[0]?.quote_image);
    const TABLE_HEAD = [
        "STT",
        "Nội Dung",
        "ĐVT",
        "SL",
        "Giá",
        "Thành Tiền",
        "Ghi Chú",
        "VAT",
    ];
    return (
        <>
            <Card className="grid grid-cols-3 p-0 border border-gray-600 rounded-sm">
                <div className="col-span-1 p-2 md:col-span-3 lg:col-span-1">
                    <div className="p-2 border border-green-500">
                        <p className="text-center underline">
                            Thông Tin Khách Hàng
                        </p>
                        <div id="info_cus">
                            <p>
                                <span>
                                    <strong>Tên: </strong>
                                </span>
                                <span>{params.name_cus}</span>
                            </p>
                            <p>
                                <span>
                                    <strong>SĐT: </strong>
                                </span>
                                <span>{params.phone_number}</span>
                            </p>
                            <p>
                                <span>
                                    <strong>Địa Chỉ: </strong>
                                </span>
                                <span>
                                    {params.street} - {params.district}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 pl-0 lg:pl-0 lg:col-span-2 md:col-span-3 md:pl-2">
                    <div className="p-2 border border-green-500">
                        <p className="text-center underline">Báo Giá</p>
                        <Card className="w-full h-full overflow-scroll">
                            <table className="w-full text-left table-auto min-w-max">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head, index) => (
                                            <th
                                                key={index}
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
                                    {resultQuote.map((item, index) => {
                                        const isLast =
                                            index === resultQuote.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                                        const quoteInfoItem = JSON.parse(
                                            item.quote_info
                                        );
                                        const totalWithoutVAT =
                                            quoteInfoItem.reduce(
                                                (acc, quoteItem) =>
                                                    acc +
                                                    quoteItem.price *
                                                        quoteItem.quality,
                                                0
                                            );
                                        const totalVAT = quoteInfoItem.reduce(
                                            (acc, quoteItem) =>
                                                acc +
                                                (quoteItem.price *
                                                    quoteItem.quality *
                                                    (quoteItem.vat || 0)) /
                                                    100,
                                            0
                                        );
                                        const totalWithVAT =
                                            totalWithoutVAT + totalVAT;
                                        return (
                                            <React.Fragment key={index}>
                                                {Array.isArray(quoteInfoItem) &&
                                                    quoteInfoItem.map(
                                                        (quoteItem, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {index +
                                                                                1}
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-[200px]`}
                                                                        style={{
                                                                            wordBreak:
                                                                                "break-word",
                                                                            whiteSpace:
                                                                                "normal",
                                                                            overflowWrap:
                                                                                "break-word",
                                                                            maxWidth:
                                                                                "400px",
                                                                        }}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                quoteItem.content
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                quoteItem.unit
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                quoteItem.quality
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {formatCurrencyVND(
                                                                                quoteItem.price
                                                                            )}
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                        >
                                                                            {formatCurrencyVND(
                                                                                quoteItem.total
                                                                            )}
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                        >
                                                                            {
                                                                                quoteItem.note
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        className={`${classes} w-1/7`}
                                                                    >
                                                                        <p
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                        >
                                                                            {
                                                                                quoteItem.vat
                                                                            }%
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                <tr className="text-white rounded bg-blue-gray-300">
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <p>Tổng chưa VAT:</p>
                                                    </td>
                                                    <td colSpan="7">
                                                        {/* Hiển thị tổng giá trị không VAT */}

                                                        {formatCurrencyVND(
                                                            totalWithoutVAT
                                                        )}
                                                    </td>
                                                </tr>
                                                {item.vat > 0 && (
                                                    <React.Fragment>
                                                        <tr className="text-white bg-blue-gray-300 ">
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <p>Tổng VAT:</p>
                                                            </td>
                                                            <td colSpan="7">
                                                                {totalVAT >
                                                                    0 && (
                                                                    <p>
                                                                        {formatCurrencyVND(
                                                                            totalVAT
                                                                        )}
                                                                    </p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr className="text-white bg-blue-gray-300 ">
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>

                                                            <td></td>
                                                            <td>
                                                                <p>
                                                                    {" "}
                                                                    Tổng cộng:
                                                                </p>
                                                            </td>
                                                            <td colSpan="7">
                                                                {/* Hiển thị tổng giá trị sau khi tính VAT */}
                                                                <p>
                                                                    {" "}
                                                                    {formatCurrencyVND(
                                                                        totalWithVAT
                                                                    )}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </Card>
            <div className="mb-2">
                <h2 className="text-lg font-semibold">
                    Hình Ảnh Khảo Sát Thực Tế:
                </h2>
                {imageQuote == null || imageQuote == false ? (
                    <p className="flex items-center justify-center w-32 h-32 border border-green-500">
                        Not Image
                    </p>
                ) : (
                    <span className="flex justify-between">
                        {Array.isArray(imageQuote) &&
                            imageQuote.map((item, index) => (
                                <img
                                    key={index}
                                    src={item}
                                    alt={`hinhKS_${index}`}
                                    className="w-40 h-40"
                                    onClick={() =>
                                        handleBaoGiaClick(
                                            `hinhKS_${
                                                params.street
                                                    ? params.street
                                                    : params.district
                                            }`,
                                            item
                                        )
                                    }
                                />
                            ))}
                    </span>
                )}
            </div>
        </>
    );
};
export { TemplateAC1, TemplateAC2 };
