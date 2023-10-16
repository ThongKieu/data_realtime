import React from "react";
import {
    Button,
    Card,
    DialogBody,
    Input,
    Radio,
} from "@material-tailwind/react"; // Thay thế 'your-ui-library' bằng thư viện UI của bạn
import WorkForm from "./WorkForm";
import DynamicTwoInput from "./DynamicInput";
import { Divider } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";
const SpendingDialog = ({
    openSpending_total,
    handleOpenSpending_total,
    isAllowed,
    handleRadioChangeAllow,
    handleChange,
    vatCard,
    handleFileChangeVt,
    previewImgVt,
    handleFileChangePt,
    previewImgPt,
    cardExpires,
    dataBtnChi,
    params,
    handleDataFromChild
}) => {
    return (

            <DialogBody divider>
                <div className="flex justify-center w-full mb-4">
                    <Card className="flex flex-row w-[50%] border justify-between px-10">
                        <Radio
                            id="HT"
                            name="status_work"
                            label="Hoàn Thành"
                            value="0"
                            checked={!isAllowed} // Đảo ngược trạng thái, checked là true khi isAllowed là false
                            onChange={handleRadioChangeAllow}
                            className="w-1 h-1 p-1"
                        />
                        <Radio
                            id="MLT"
                            name="status_work"
                            label="Mai Làm Tiếp"
                            value="1"
                            checked={isAllowed} // checked là true khi isAllowed là true
                            onChange={handleRadioChangeAllow}
                            className="w-1 h-1 p-1"
                        />
                    </Card>
                </div>
                <WorkForm
                    cardExpires={cardExpires}
                    handleChange={handleChange}
                    vatCard={vatCard}
                    disabledAllowed={isAllowed}
                >
                    <div className="flex justify-between w-full my-2 text-sm">
                        <DynamicTwoInput
                            disabledAllowed={isAllowed}
                            sendDataToParent={handleDataFromChild}
                        />
                    </div>
                    <div className="flex justify-center gap-4 align-middle ">
                        <div className="w-full ">
                            <div className="flex justify-center w-full">
                                {vatCard ? (
                                    <Card className="justify-center px-2 border border-green-500 rounded-none">
                                        {params.row.bill_image}
                                    </Card>
                                ) : (
                                    <Button
                                        className="justify-center px-2 pt-1 text-center text-black bg-white border border-green-500 rounded-none"
                                        disabled={isAllowed}
                                    >
                                        <input
                                            id="image_Vt"
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleFileChangeVt}
                                            multiple
                                            className="w-full text-[10px] cursor-pointer text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:outline-none focus:shadow-none"
                                            disabled={isAllowed}
                                        />
                                        {previewImgVt ? (
                                            <i className="text-[10px]">
                                                (Hình Vật Tư)
                                            </i>
                                        ) : (
                                            <div className="flex flex-row">
                                                {previewImgVt.map(
                                                    (preview, index) => (
                                                        <img
                                                            key={index}
                                                            src={preview}
                                                            alt={`Preview ${index}`}
                                                            style={{
                                                                width: "100px",
                                                                height: "auto",
                                                                margin: "5px",
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </Button>
                                )}
                                {vatCard ? (
                                    <Card className="justify-center px-2 border border-green-500 rounded-none">
                                        {params.row.bill_image}
                                    </Card>
                                ) : (
                                    <Button
                                        className="justify-center px-2 pt-1 text-center text-black bg-white border border-green-500 rounded-none"
                                        disabled={isAllowed}
                                    >
                                        <input
                                            id="image_Pt"
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleFileChangePt}
                                            multiple
                                            className="w-full text-[10px] file:cursor-pointer text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:outline-none focus:shadow-none"
                                            disabled={isAllowed}
                                        />
                                        <i className="text-[10px]">
                                            (Hình Phiếu Thu)
                                        </i>
                                        <div className="flex flex-row flex-wrap justify-center">
                                            {previewImgPt.map(
                                                (preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt={`Preview ${index}`}
                                                        style={{
                                                            width: "100px",
                                                            height: "auto",
                                                            margin: "5px",
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </Button>
                                )}
                                <div className="p-1 ">
                                    <Input
                                        label="Số Phiếu Thu"
                                        id="seri_number"
                                        name="seri_number"
                                        value={cardExpires.seri_number}
                                        defaultValue="k pt"
                                        onChange={handleChange}
                                        // disabled="{disabledAllowed || isAllowedBH}"
                                        className="mr-1 w-[100%] shadow-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider className="pt-2" />
                    <div className="flex flex-row-reverse pt-2">
                        {dataBtnChi.map((result) => (
                            <Button
                                key={result.id}
                                id={result.id}
                                size="sm"
                                className={`p-3 py-2 mx-4 ` + result.className}
                                variant="outlined"
                                onClick={result.handleSubmit}
                            >
                                {result.content}
                            </Button>
                        ))}
                    </div>
                </WorkForm>
            </DialogBody>

    );
};

export default SpendingDialog;
