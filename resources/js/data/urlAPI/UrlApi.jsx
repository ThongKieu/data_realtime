export const url_API = "api/web/works";
export const url_API_District = "api/web/district";
// apiUtils.js

export const sendPhanThoRequest = async (
    params,
    selectPhanTho,
    auth,
    socketD,
    handleCopyToClipboard,
    handleOpenTho
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
        const response = await fetch("api/web/work-assignment", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            socketD.emit("addWorkTo_Server", "Phan Tho");
            handleCopyToClipboard(params.row);
            handleOpenTho();
        }
    } catch (error) {
        console.log("lỗi", error);
    }
};
export const sendDoiThoRequest = async (
    params,
    selectPhanTho,
    auth,
    socketD,
    handleCopyToClipboard,
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
            handleCopyToClipboard(params.row);
            handleOpenTho();
        }
    } catch (error) {
        console.log("lỗi", error);
    }
};
