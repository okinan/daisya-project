import MaterialTable from "@material-table/core";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAdmin, selectUid } from "../../features/auth/authSlice";
import { selectSyakenCar } from "../../features/car/carSlice";
import { addDoc, collection, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { async } from "@firebase/util";


function SyakenTable() {

  const dispatch = useAppDispatch();

  //Reduxから取得
  const uid = useAppSelector(selectUid);
  const admin = useAppSelector(selectAdmin);
  const syakenCar = useAppSelector(selectSyakenCar);

  //テーブルに表示したいデータ
  // const [tableData, setTableData] = useState(syakenCar);



  // 日付をYYYY-MM-DDの書式で返すメソッド
  // function formatDate(dt: Date) {
  //   var y = dt.getFullYear();
  //   var m = ('00' + (dt.getMonth()+1)).slice(-2);
  //   var d = ('00' + dt.getDate()).slice(-2);
  //   return (y + '-' + m + '-' + d);
  // }
  // console.log("テストだよ");
  // console.log(test);

  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt: Date) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  const sysDate = new Date();
  const test = formatDate(sysDate);

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
          // {...props}
          // defaultValue={props.value.format('YYYY-MM-DD')}
          // value={props.value}
          // defaultValue={(e:any)=>{
          //   console.log(props.value);
          //   return props.value;
          // }}
          onChange={(e) => props.onChange(e.target.value)}
          variant="standard"
        />
      ),
    },
  ];

  //データ追加
  const insertCar = async(newRow: any) => {

    const carCollectionRef = collection(db, 'companyCar');

    const documentRef = await addDoc(carCollectionRef, {
      carName: newRow.carName,
      carNum: newRow.carNum,
      carComDay: Timestamp.fromDate(new Date(newRow.carComDay)),
      registerDate: serverTimestamp(),
      registerUid: uid,
      updateDate: serverTimestamp(),
      updateUid: uid,
    })
    
  }

  const updateCar = async(newRow: any, id: string) => {

    // const newCarData = newRow;
    // const docId = id;

    // //更新対象を設定する
    // const carName:string = newRow.carName;
    // const carComDay:Date = newRow.carName;

    //データ更新
    const carCollectionRef = collection(db, 'companyCar');
    const documentRef = await addDoc(carCollectionRef, {
      carName: newRow.carName,
      carNum: newRow.carNum,
      carComDay: newRow.carComDay,
      registerDate: serverTimestamp(),
      registerUid: uid,
      updateDate: serverTimestamp(),
      updateUid: uid,
    })
    
    //tableにも登録する？
    // newCarData['id'] = documentRef.id;
    // dispatch(insertSyakenCar(newCarData));
    
    // console.log(documentRef.id);
    // const newData = newRow;
    // newData['docId'] = 'XXXXXX';
    // console.log(newData);
  }

  //動作確認用
  const syakenCarData = [
    {
      id: "999999",
      carName: "追加用",
      carNum: "沖縄 30 Y58-04",
      carComDay: "2022-06-18",
    }
  ]

  const editFunc:any = (adminFlg: boolean) => {
    if(adminFlg){
      return (
        {
          // 追加処理
          onRowAdd: async(newRow: any) =>{
            console.log("insert前");
            insertCar(newRow);
            console.log("insert後");
          },
          // 更新処理
          onRowUpdate: async(newRow: any, oldRow: any) =>{
            console.log("update前");
            updateCar(newRow, oldRow.id);
            console.log("update後");
          },
          // // 新規追加処理
          // onRowAdd: (newRow: any) =>
          //   new Promise<void>((resolve, reject) => {

          //     // const newCarData = newRow;
          //     console.log("insertCar前");
          //     insertCar(newRow);
          //     // console.log("dispatch起動");
          //     // console.log(newRow.carName);
          //     // dispatch(insertSyakenCar(syakenCarData[0]));

          //     // const carCollectionRef = collection(db, 'companyCar');
          //     // const documentRef = addDoc(carCollectionRef, {
          //     //   carName: newCarData.carName,
          //     //   carNum: newCarData.carNum,
          //     //   carComDay: newCarData.carComDay,
          //     //   registerDate: serverTimestamp,
          //     //   registerUid: uid,
          //     //   updateDate: serverTimestamp,
          //     //   updateUid: uid,
          //     // })
              
          //     // console.log(documentRef);

          //     // setTableData([...tableData, newRow]);
          //     setTimeout(() => resolve(), 500);
          //   }),
          // onRowUpdate: (newRow: any, oldRow: any) =>
          //   new Promise<void>((resolve, reject) => {
          //     // const updatedData = [...tableData];
          //     // updatedData[oldRow.tableData.id] = newRow;
          //     // setTableData(updatedData);
          //     setTimeout(() => resolve(), 500);
          //   }),
          onRowDelete: (selectedRow: any) =>
            new Promise<void>((resolve, reject) => {
              // const updatedData = [...tableData];
              // updatedData.splice(selectedRow.tableData.id, 1);
              // setTableData(updatedData);
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
        data={syakenCar}
        editable={editFunc(admin)}
        localization={localFunc()}
        options={optionFunc()}
        title="車検一覧"
      />
    </>
  );
}

export default SyakenTable;
