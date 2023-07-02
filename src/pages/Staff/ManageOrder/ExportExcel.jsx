import React from "react";
import * as XLSX from "xlsx";

const ExportExcel = ({ data }) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, "Thong_Ke_Doanh_Thu.xlsx");
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
    >
      Xuất excel
    </button>
  );
};

export default ExportExcel;
