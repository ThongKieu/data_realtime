import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const YourComponent = () => {
  const [rowModesModel, setRowModesModel] = useState({});

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "work_content", headerName: "Yêu Cầu Công Việc", width: 200, editable: true },
  ];

  const workDataDN = [
    { id: 1, work_content: "Task 1" },
    { id: 2, work_content: "Task 2" },
    { id: 3, work_content: "Task 3" },
    // ...
  ];

  const handleCellEditStop = (params, event) => {
    if (params.reason === "tab" || params.reason === "enter") {
      // Bấm Tab hoặc Enter, gửi dữ liệu lên máy chủ và tắt sự kiện chỉnh sửa ô
      const data = {
        ac: "1",
        id: params.id,
        work_content: params.props.value,
      };
      processRowUpdateDN(data);
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: "view" },
      });
    }
  };

  const processRowUpdateDN = async (data) => {
    try {
      const res = await fetch("api/web/update/work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log("Sửa thông tin lịch chưa phân", data);
        socketD.emit("addWorkTo_Server", data);
      } else {
        console.error("Lỗi khi gửi dữ liệu:", res.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={workDataDN}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onCellEditStop={handleCellEditStop}
        hideFooterPagination={true}
        slotProps={{
          className: "text-center",
        }}
      />
    </div>
  );
};

export default YourComponent;
