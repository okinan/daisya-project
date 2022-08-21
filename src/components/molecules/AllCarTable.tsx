import MaterialTable from "@material-table/core";
import { TextField } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectAdmin, selectUid } from "../../features/auth/authSlice";
import { selectAllCar, selectSyakenCar } from "../../features/car/carSlice";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";


function AllCarTable() {

  //Reduxから取得
  const uid = useAppSelector(selectUid);
  const admin = useAppSelector(selectAdmin);
  const allCar = useAppSelector(selectAllCar);

  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt: Date) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  //テーブルの列名を指定
  const columns = [
    {
      title: "ドキュメントID",
      field: "id",
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
    // {
    //   title: "残数",
    //   field: "deadLine",
    //   sorting: false,
    //   headerStyle: { whiteSpace: "nowrap" },
    //   cellStyle: { whiteSpace: "nowrap" },
    //   editable: "never",
    //   width: "10%"
    // },
  ];

  //データ追加
  const insertCar = async(newRow: any) => {

    try{
      const carCollectionRef = collection(db, 'companyCar');

      await addDoc(carCollectionRef, {
        carName: newRow.carName,
        carNum: newRow.carNum,
        carComDay: Timestamp.fromDate(new Date(newRow.carComDay)),
        registerDate: serverTimestamp(),
        registerUid: uid,
        updateDate: serverTimestamp(),
        updateUid: uid,
      })
    } catch(err){
      console.log(err);
      alert("追加失敗!管理者に連絡してください。");
    }
    
  }

  //データ更新
  const updateCar = async(newRow: any, id: string) => {

    try{
      const companyCarDocmentRef = doc(db, 'companyCar', id);

      await updateDoc(companyCarDocmentRef, {
        carName: newRow.carName,
        carNum: newRow.carNum,
        carComDay: Timestamp.fromDate(new Date(newRow.carComDay)),
        updateDate: serverTimestamp(),
        updateUid: uid,
      })
    } catch(err){
      console.log(err);
      alert("更新失敗!管理者に連絡してください。");
    }

  }

  //データ削除
  const deleteCar = async(id: string) => {

    try{
      const companyCarDocmentRef = doc(db, 'companyCar', id);

      await deleteDoc(companyCarDocmentRef);
    } catch(err){
      console.log(err);
      alert("削除失敗!管理者に連絡してください。");
    }

  }

  const editFunc:any = (adminFlg: boolean) => {
    if(adminFlg){
      return (
        {
          // 追加処理
          onRowAdd: async(newRow: any) =>{
            insertCar(newRow);
          },
          // 更新処理
          onRowUpdate: async(newRow: any, oldRow: any) =>{
            updateCar(newRow, oldRow.id);
          },
          // 削除処理
          onRowDelete: async(selectedRow: any) =>{
            deleteCar(selectedRow.id);
          },
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
        data={allCar}
        editable={editFunc(admin)}
        localization={localFunc()}
        options={optionFunc()}
        title="車検一覧"
      />
    </>
  );
}

export default AllCarTable;
