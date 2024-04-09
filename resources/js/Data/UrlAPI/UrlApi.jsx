const url_API = "api/web/works";
const url_API_District = "api/web/district";

const sendPhanThoRequest = async (
    params,
    selectPhanTho,
    auth,
    socketD,
    copyTextToClipboard,
    handleOpenTho,
    selectedDate
) => {
    const id_worker = selectPhanTho.shift();
    const id_phu = selectPhanTho.map((item) => item.value);

    const data = {
        id_cus: params.row.id,
        id_worker: id_worker.value,
        id_phu: id_phu,
        work_note: params.row.work_note,
        auth_id: auth.user.id,
    };

    try {
        const response = await fetch(
            `api/web/work-assignment`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            socketD.emit("addWorkTo_Server", selectedDate);
            socketD.emit("sendWorkWebToServer", id_worker.value);
            copyTextToClipboard(params.row);
            handleOpenTho();

            try {
                const response = await fetch("api/app/worker/send-fcm", {
                    method: "POST",
                    body: JSON.stringify({
                        idWorker: id_worker.value,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (error) {
                console.log("lỗi", error);
            }
        }
    } catch (error) {
        console.log("lỗi", error);
    }
};

const sendDoiThoRequest = async (
    params,
    selectPhanTho,
    auth,
    socketD,
    copyTextToClipboard,
    handleOpenTho,
    reasonMessage
) => {
    const id_worker = selectPhanTho.shift();
    const id_phu = selectPhanTho.map((item) => item.value);

    const data = {
        id_work_as: params.id,
        id_cus: params.row.id_cus,
        real_note: `${params.row.real_note} + ${
            reasonMessage !== "undefined"
                ? reasonMessage
                : "Chưa nhập thông tin"
        }`,
        id_worker: id_worker.value,
        id_phu: id_phu,
        auth_id: auth.user.id,
    };
    console.log(params, data);
    try {
        const response = await fetch("api/web/work-assignment/returnWork", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            socketD.emit("addWorkTo_Server", "Đổi Thợ");
            copyTextToClipboard(params.row);
            handleOpenTho();
        }
    } catch (error) {
        console.log("lỗi", error);
    }
};
const getFirstName = (fullName) => {
    const parts = fullName.split(" ");
    return parts.length >= 2 ? parts.slice(1).join(" ") : parts.length >= 3 ? parts.slice(2).join(" ") : parts.length >= 1 ? parts.slice(0).join(" "): "";
};
const getFormattedToday = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours > 0 ? `${hours} giờ ` : '';
    const formattedMinutes = minutes > 0 ? `${minutes} phút ` : '';
    const formattedSeconds = `${remainingSeconds} giây`;

    return formattedHours + formattedMinutes + formattedSeconds;
};
export {
    getFormattedToday,
    getFirstName,
    sendPhanThoRequest,
    sendDoiThoRequest,formatTime,
    url_API,
    url_API_District,
};
