// Get the admin dashboard button
const adminDashboardButton = document.getElementById('admin-dashboard-btn');

const token=localStorage.getItem('token');

const decodeToken=parseJwt(token);
function parseJwt (token) {
  if(!token){
      return null;
  }
  console.log("token in parsejwt",token);
  // var base64Url = token;
  var base64Url = token.split('.')[1];
  console.log("base64url:",base64Url);
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
document.getElementById('logout').addEventListener('click',()=>{
  window.location.href='./login.html';
})
console.log("decode token :",decodeToken)
// Check if the user is an admin
if ((decodeToken.role) !== 'admin') {
  // Disable the admin dashboard button
  adminDashboardButton.disabled = true;
  adminDashboardButton.style.cursor = 'not-allowed';
  adminDashboardButton.title = 'Only admins can access this page';
} else {
  // Enable the admin dashboard button and add a click event listener
  adminDashboardButton.disabled = false;
  adminDashboardButton.style.cursor = 'pointer';
  adminDashboardButton.addEventListener('click', () => {
    window.location.href = 'admindashboard.html';
  });
}