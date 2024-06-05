import { getFormattedTIME } from "@/Data/UrlAPI/UrlApi";
import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    Select,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import { ARRAY_ACTION } from "@/Data/Table/Data";
const HistoryDialog = ({
    dataFormParent,
    icon: Icon,
    userAuth,
    infoWorker,
    content,
}) => {
    const classTableHistory =
        "px-6 py-3 leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300";
    const [openHis, setOpenHis] = useState(false);
    const [jsonParse, setJsonParse] = useState([]);

    useEffect(() => {
        setJsonParse((prevJsonParse) => {
            let iJson = dataFormParent.work_note || null;
            const safeParse = (str) => {
                try {
                    return JSON.parse(str);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    return null;
                }
            };

            if (
                typeof iJson === "string" &&
                (iJson.startsWith("{") || iJson.startsWith("["))
            ) {
                iJson = safeParse(iJson);
            } else if (
                typeof iJson === "string" ||
                iJson === null ||
                iJson === "undefined"
            ) {
                iJson = [
                    { id_auth: 1, action: iJson, time: getFormattedTIME() },
                ];
            }

            let parsedData = dataFormParent.his_work
                ? safeParse(dataFormParent.his_work)
                : null;

            if (iJson && parsedData) {
                return [...parsedData, ...iJson];
            } else if (iJson) {
                return iJson;
            } else {
                return parsedData || [];
            }
        });
    }, [dataFormParent]);

    const handleOpenHis = () => setOpenHis(!openHis);

    return (
        <>
                {Icon ? (
                    <Button
                        className="p-1 border rounded-md"
                        color="gray"
                        variant="outlined"
                        onClick={handleOpenHis}
                    >
                        {" "}
                        {Icon}
                    </Button>
                ) : (
                    <Button
                        className="p-2 border rounded-md"
                        color="green"
                        variant="outlined"
                        onClick={handleOpenHis}
                    >
                        {" "}
                        {content}
                    </Button>
                )}

            <Dialog open={openHis} handler={handleOpenHis}>
                <DialogBody>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className={classTableHistory}>
                                    Người Xử Lý
                                </th>
                                <th className={classTableHistory}>Action</th>
                                <th className={classTableHistory}>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonParse.length > 0 ? (
                                jsonParse.map((itemJson, index) => {
                                    const correspondingAuth = userAuth?.find(
                                        (user) => user.id === itemJson.id_auth
                                    );
                                    const correspondingWorker =
                                        infoWorker?.value === itemJson.id_worker
                                            ? infoWorker?.label
                                            : "Unknown";
                                    const workerFullName = correspondingAuth
                                        ? correspondingAuth.name
                                        : `(${infoWorker?.label})- ${correspondingWorker}`;

                                    const checkAc = ARRAY_ACTION?.find(
                                        (item) => item.id === itemJson.action
                                    );

                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 border border-b border-gray-500">
                                                {workerFullName}
                                            </td>
                                            <td className="px-6 py-4 border border-b border-gray-500">
                                                {checkAc
                                                    ? checkAc.value
                                                    : itemJson.action}
                                                {itemJson.work_note
                                                    ? " - " + itemJson.work_note
                                                    : ""}
                                            </td>
                                            <td className="px-6 py-4 border border-b border-gray-500">
                                                {itemJson.time.toString()}
                                                {/* Hiển thị giá trị thời gian */}
                                                {itemJson.lat &&
                                                    itemJson.log && (
                                                        <button
                                                            onClick={() =>
                                                                handleButtonClick(
                                                                    itemJson.lat,
                                                                    itemJson.log
                                                                )
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="size-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-4 text-center border border-b border-gray-500"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="outlined"
                        className="px-5 py-2"
                        color="red"
                        onClick={handleOpenHis}
                    >
                        Xác nhận
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default HistoryDialog;
