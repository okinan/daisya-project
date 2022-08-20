import MaterialTable from "@material-table/core";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectAdmin } from "../../features/auth/authSlice";


function SyakenTable() {

  //Reduxから取得
  const admin = useAppSelector(selectAdmin);

  //テーブルに表示したいデータ
  const [tableData, setTableData] = useState([
    {
      docId: "999999",
      carName: "ラパン",
      carNum: "沖縄 30 Y58-04",
      carComDay: "2022-06-18",
    }
  ]);

  //テーブルの列名を指定
  const columns = [
    {
      title: "ドキュメントID",
      field: "docId",
      sorting: false,
      hidden: true,
    },
    {
      title: "車種",
      field: "carName",
      sorting: false,
      headerStyle: { whiteSpace: "nowrap" },
      cellStyle: { whiteSpace: "nowrap" },
      validate: (rowData: any) => {
        if (rowData.carName === undefined || rowData.carName === "") {
          return "車種を入力してください"
        } 
      }
    },
    {
      title: "ナンバー",
      field: "carNum",
      sorting: false,
      headerStyle: { whiteSpace: "nowrap" },
      cellStyle: { whiteSpace: "nowrap" },
      validate: (rowData: any) => {
        if (rowData.carNum === undefined || rowData.carNum === "") {
          return "ナンバーを入力してください"
        } 
      }
    },
    {
      title: "車検満了日",
      field: "carComDay",
      type: "date",
      validate: (rowData: any) => {
        console.log(rowData.carComDay);
        if (rowData.carComDay === undefined || rowData.carComDay === "") {
          return "車検満了日を入力してください"
        } 
      },
      editComponent: (props: any) => (
        <TextField
          type="date"
          error={props.error}
          helperText={props.helperText}
          defaultValue={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          variant="standard"
        />
      ),
    },
  ];

  const editFunc:any = (adminFlg: boolean) => {
    if(adminFlg){
      return (
        {
          onRowAdd: (newRow: any) =>
            new Promise<void>((resolve, reject) => {
              setTableData([...tableData, newRow]);
              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow: any, oldRow: any) =>
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
        }
      );
    }
    return {};
  }

  const localFunc: any = () => {
    return (
      {
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
      }
    )
  }

  const optionFunc: any = () => {
    return (
      {
        sorting: true,
        paging: false,
        addRowPosition: "first",
        searchFieldAlignment: "left",
        actionsColumnIndex: 4,
        showTitle: false,
        rowStyle: (rowData: any, index: number) => ({
          backgroundColor: index % 2 === 0 ? "#fdfcfb" : "#fff",
        }),
        headerStyle: { background: "#fff6e6" },
      }
    )
  }

  return (
    <>
      <MaterialTable
        columns={columns as any}
        data={tableData}
        editable={editFunc(admin)}
        localization={localFunc()}
        options={optionFunc()}
        title="車検一覧"
      />
    </>
  );
}

export default SyakenTable;
