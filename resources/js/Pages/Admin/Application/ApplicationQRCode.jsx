import { useState, useRef, useCallback } from "react";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayoutAdmin";
import { Head } from "@inertiajs/react";
import {
    Button,
    Card,
    CardHeader,
    Input,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import QRCode from "react-qr-code";
import { toPng, toJpeg, toSvg } from "html-to-image";
import useWindowSize from "@/Core/Resize";
import { Box } from "@mui/material";
function ApplicationQRCode() {
    const [inputData, setInputData] = useState("");
    const [selectedImg, setSelectedImg] = useState("SVG");
    const [selectedSize, setSelectedSize] = useState("720");
    const [qrData, setQrData] = useState("https://thoviet.com.vn");
    const { width, height } = useWindowSize(10);
    const handleGenerateQRCode = () => {
        // Sử dụng dữ liệu từ input để cập nhật trạng thái của component
        setQrData(inputData);
    };
    const handleDownloadQR = () => {
        const qrContainer = document.getElementById("qr-container");
        if (!qrData) {
            console.error("No QR code data available.");
            return;
        }
        if (!qrContainer) {
            console.error("QR container element not found.");
            return;
        }
        let imageType;
        let toImageFunction;

        switch (selectedImg) {
            case "PNG":
                imageType = "png";
                toImageFunction = toPng;
                break;
            case "SVG":
                imageType = "svg";
                toImageFunction = toSvg;
                break;
            case "JPG":
                imageType = "jpeg";
                toImageFunction = toJpeg;
                break;
            default:
                console.error("Invalid image type selected.");
                return;
        }

        toImageFunction(qrContainer)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-qrcode." + selectedImg.toLowerCase(); // Use selectedImg state for the image format
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error("Error downloading QR code:", err);
            });
    };
    return (
        <Authenticated>
            <Head title="Tạo QR Code" />
            <Box
                sx={{
                    height: { height },
                    width: 1,
                }}
                className="p-2"
            >
                <Card className={`h-[${height}px]`}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="p-2 text-center border rounded-lg bg-cyan-400 border-deep-orange-300"
                    >
                        <Typography className="text-lg font-extrabold text-white">
                            Tạo QR Code
                        </Typography>
                    </CardHeader>
                    <div className="grid grid-cols-5 gap-1">
                        <Card className="col-span-1 m-2 border rounded-xl border-cyan-300">
                            <CardHeader floated={false} shadow={false}>
                                <Typography className="text-lg font-extrabold text-center">
                                    Chọn thông tin cần tạo QR code
                                </Typography>
                                <div className="p-1 ">
                                    <Input
                                        label="Thêm Link Cần Tạo QR"
                                        value={inputData}
                                        onChange={(e) =>
                                            setInputData(e.target.value)
                                        }
                                        className="shadow-none"
                                    />
                                    <Button
                                        className="m-1"
                                        onClick={handleGenerateQRCode}
                                    >
                                        Tạo
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card className="col-span-4 m-2 border rounded-xl border-cyan-300">
                            {qrData && (
                                <Card>
                                    <div className="flex flex-row p-2 ">
                                        <div
                                            className={`w-[${selectedSize}]px h-[${selectedSize}]px`}
                                        >
                                            <QRCode
                                                id="qr-container"
                                                className={`w-[${selectedSize}]px h-[${selectedSize}]px`}
                                                value={qrData}
                                                size={Number(selectedSize)}
                                                level="M"
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                            />
                                        </div>
                                        <div className="w-full p-2 ">
                                            <Select
                                                label="Chọn loại cần xuất"
                                                value={selectedImg}
                                                onChange={(val) =>
                                                    setSelectedImg(val)
                                                }
                                            >
                                                <Option value="PNG">PNG</Option>
                                                <Option value="SVG">SVG</Option>
                                                <Option value="JPG">JPG</Option>
                                            </Select>
                                            <div className="py-3">
                                                <Select
                                                    label="Kích Thước"
                                                    value={selectedSize}
                                                    onChange={(val) =>
                                                        setSelectedSize(val)
                                                    }
                                                >
                                                    <Option value="1080">
                                                        1080 x 1080
                                                    </Option>
                                                    <Option value="720">
                                                        720 x 720
                                                    </Option>
                                                    <Option value="512">
                                                        512 x 512
                                                    </Option>
                                                </Select>
                                            </div>
                                            <div>
                                                {selectedSize == "" ||
                                                selectedImg == "" ? (
                                                    <Button
                                                        onClick={
                                                            handleDownloadQR
                                                        }
                                                        disabled
                                                    >
                                                        Tải Xuống
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={
                                                            handleDownloadQR
                                                        }
                                                    >
                                                        Tải Xuống
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </Card>
                    </div>
                </Card>
            </Box>
        </Authenticated>
    );
}

export default ApplicationQRCode;
