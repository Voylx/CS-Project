export default function CheckLogin() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location = "/home";
  }
}
//check is alaredy login warp to homepage
