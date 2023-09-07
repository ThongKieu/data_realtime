import React, { useState } from "react";

const CustomTable = ({ data, onChange, onSubmit }) => {
  // ... (phần code của bảng)

  return (
    <form onSubmit={onSubmit}>
      <table>
        {/* ... (phần code của bảng) */}
      </table>
      <button type="submit">Lưu thay đổi</button>
    </form>
  );
};

const data = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

function TableOrder() {
  const [tableData, setTableData] = useState(data);

  const handleTableChange = (id, field, value) => {
    const updatedData = tableData.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setTableData(updatedData);
  };

  const handleTableSubmit = async (e) => {
    e.preventDefault();

    // Gửi dữ liệu đã thay đổi lên máy chủ bằng fetch API
    try {
      const response = await fetch("URL_MÁY_CHỦ/API", {
        method: "POST", // Hoặc "PUT" nếu bạn muốn cập nhật dữ liệu
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableData), // Chuyển dữ liệu đã thay đổi thành JSON
      });

      if (response.ok) {
        // Xử lý phản hồi từ máy chủ nếu cần
        alert("Dữ liệu đã được cập nhật thành công!");
      } else {
        alert("Đã xảy ra lỗi khi cập nhật dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    }
  };

  return (
    <div className="App">
      <h1>Custom Table Example</h1>
      <CustomTable data={tableData} onChange={handleTableChange} onSubmit={handleTableSubmit} />
    </div>
  );
}

export default TableOrder;

// export default TableOrder;
