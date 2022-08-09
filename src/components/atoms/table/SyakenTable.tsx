import MaterialTable, { MaterialTableProps } from "@material-table/core";
import { Icons } from "@material-table/core";
import { useState } from "react";
import { TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export interface TableProps<RowData extends object>
  extends MaterialTableProps<RowData> {}

function SyakenTable(props: any) {
  //テーブルに表示したいデータ
  const [tableData, setTableData] = useState([
    {
      COMID: "1",
      CARID: "1",
      CARNAME: "ラパン",
      CARNUM: "沖縄30 Y58-04",
      CARCOMDAY: "2022-06-18",
    },
    {
      COMID: "1",
      CARID: "2",
      CARNAME: "レクサス",
      CARNUM: "沖縄30 Y58-04",
      CARCOMDAY: "2022-06-19",
    },
    {
      COMID: "1",
      CARID: "3",
      CARNAME: "プリウス",
      CARNUM: "沖縄30 Y58-04",
      CARCOMDAY: "2022-06-20",
    },
    {
      COMID: "1",
      CARID: "4",
      CARNAME: "BMW",
      CARNUM: "沖縄30 Y58-04",
      CARCOMDAY: "2022-06-21",
    },
  ]);

  //テーブルの列名を指定
  const columns = [
    {
      title: "会社ID",
      field: "COMID",
      sorting: false,
      hidden: true,
    },
    { title: "車両ID", field: "CARID", sorting: false, hidden: true },
    {
      title: "車種",
      field: "CARNAME",
      sorting: false,
      headerStyle: { whiteSpace: "nowrap" },
      cellStyle: { whiteSpace: "nowrap" },
    },
    {
      title: "ナンバー",
      field: "CARNUM",
      sorting: false,
      headerStyle: { whiteSpace: "nowrap" },
      cellStyle: { whiteSpace: "nowrap" },
    },
    {
      title: "車検満了日",
      field: "CARCOMDAY",
      type: "date",
      editComponent: (props: any) => (
        <TextField
          type="date"
          defaultValue={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  return (
    <>
      <MaterialTable
        columns={columns as any}
        data={tableData}
        editable={{
          onRowAdd: (newRow) =>
            new Promise<void>((resolve, reject) => {
              setTableData([...tableData, newRow]);
              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow: any) =>
            new Promise<void>((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow: any) =>
            new Promise<void>((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
        }}
        localization={{
          error: "エラー",
          header: {
            actions: "編集",
          },
          body: {
            emptyDataSourceMessage: "対象のデータが存在しません。",
            filterRow: {
              filterPlaceHolder: "",
              filterTooltip: "フィルター",
            },
            editRow: {
              saveTooltip: "保存",
              cancelTooltip: "キャンセル",
              deleteText: "この行を削除しますか？",
            },
            addTooltip: "追加",
            deleteTooltip: "削除",
            editTooltip: "編集",
          },
          toolbar: {
            searchTooltip: "検索",
            searchPlaceholder: "検索",
            searchAriaLabel: "検索",
            clearSearchAriaLabel: "クリア",
          },
        }}
        options={{
          sorting: true,
          paging: false,
          addRowPosition: "first",
          searchFieldAlignment: "left",
          actionsColumnIndex: 4,
          showTitle: false,
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 === 0 ? "#fdfcfb" : "#fff",
          }),
          headerStyle: { background: "#fff6e6" },
        }}
        title="車検一覧"
      />
    </>
  );
}

export default SyakenTable;
