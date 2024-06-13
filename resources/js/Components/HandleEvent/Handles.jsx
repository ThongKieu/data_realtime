export const copyTextToClipboard = (text) => {
    const {
        work_content,
        street,
        phone_number,
        name_cus,
        district,
        work_note,
    } = text;

    // Kiểm tra nếu tất cả các trường đều không rỗng hoặc undefined
    if (
        work_content ||
        street ||
        phone_number ||
        name_cus ||
        district ||
        work_note
    ) {
        const data = `${work_content || ""} ${street || ""} ${
            phone_number || ""
        } ${name_cus || ""} ${district || ""} ${work_note || ""}`;

        const textarea = document.createElement("textarea");
        textarea.value = data;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        console.log("Sao Chép:", data);
    } else {
        console.log("Không có dữ liệu để sao chép.");
    }
};
export const handleBaoGiaClick = (data, url) => {
    if (data || data != undefined || data != "" || data != null) {
        const dataToSend = JSON.stringify(data);
        const newTab = window.open(
            `${url}?data=${encodeURIComponent(dataToSend)}`,
            "_blank"
        );
        if (newTab) {
            newTab.focus();
        } else {
            alert(
                "Trình duyệt của bạn đã chặn cửa sổ popup. Vui lòng cho phép hiển thị popup."
            );
        }
    }
};
