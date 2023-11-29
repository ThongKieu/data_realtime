
export const url_API = "api/web/works";
export const url_API_District = "api/web/district";
// apiUtils.js

export const sendPhanThoRequest = async (params, selectPhanTho, auth, socketD,handleCopyToClipboard,handleOpenTho) => {
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


