import store from "@/store";

export function checkLogin() {
  return !!store.state.loginInfo;
}
