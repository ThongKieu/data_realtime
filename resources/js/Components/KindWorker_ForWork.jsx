import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@material-tailwind/react";
import Box from "@mui/material/Box";
const KindWorker_ForWork = ({ kindWorker, column }) => {
    const rows = kindWorker.data?.map((work) => ({
        id: work.id,
        id_cus: work.id_cus,
        id_worker: work.id_worker,
        id_phu: work.id_phu,
        real_note: work.real_note,
        spending_total: work.spending_total,
        income_total: work.income_total,
        bill_imag: work.bill_imag,
        seri_imag: work.seri_imag,
        status_work: work.status_work,
        check_in: work.check_in,
        seri_number: work.seri_number,
        work_content: work.work_content,
        date_book: work.date_book,
        street: work.street,
        district: work.district,
        phone_number: work.phone_number,
        image_work_path: work.image_work_path,
        kind_work: work.kind_work,
        name_cus: work.name_cus,
        worker_full_name: work.worker_full_name,
        worker_code: work.worker_code,
        worker_address: work.worker_address,
        worker_phone_company: work.worker_phone_company,
        status_admin_check: work.status_admin_check,
        flag_check: work.flag_check,
        warranties: work.warranties,
    }));
    return (

            <Box
            sx={{
                height: rows == "" ? 40 : 1,
                width: "100%",
            }}
        >
            <Typography
                id={kindWorker.kind_worker.nameKind}
                className="w-full p-1 font-bold text-center bg-blue-400 rounded-none shadow-lg text-medium"
            >
                {kindWorker.kind_worker.nameKind} (Số lịch:
                {kindWorker.kind_worker.numberOfWork})
            </Typography>

            <DataGrid
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    ".MuiDataGrid-withBorderColor": {
                        borderRight: "1px solid #e0e0e0",
                    },
                }}
                width={100}
                rows={rows}
                columns={column}
                hideFooterPagination={false}
                rowHeight={40}
                disableRowSelectionOnClick
                slots={{
                    columnHeaders: () => null,
                }}
            />
        </Box>
    );
};

export default KindWorker_ForWork;
