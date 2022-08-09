import React from "react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";

function GlobalNav() {
  //   const history = useHistory();

  const logoutSubmit = (e: any) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("auth_name");
        // swal("ログアウトしました", res.data.message, "success");
        // history.push("/");
        window.location.reload();
      }
    });
  };

  let AuthButtons: ReactElement | null = null;

  if (!window.localStorage.getItem("auth_token")) {
    AuthButtons = (
      <>
        <li>
          <Link to="/register">
            <span>新規登録</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span>ログイン</span>
          </Link>
        </li>
      </>
    );
  } else {
    AuthButtons = (
      <li>
        <div onClick={logoutSubmit}>
          <span className="text-white">ログアウト</span>
        </div>
      </li>
    );
  }

  return (
    <ul>
      <li>
        <Link to="/">
          <span>車検一覧</span>
        </Link>
      </li>
      <li>
        <Link to="/alert">
          <span>通知設定</span>
        </Link>
      </li>
      {AuthButtons}
    </ul>
  );
}

export default GlobalNav;
