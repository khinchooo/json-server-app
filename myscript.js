const apiUrl = "http://localhost:3000/sites";
const jsonHeaders = {"Content-type": "application/json"};
// create data
function createData() {
  const newSiteName = document.getElementById("siteName").value;
  const newSiteURL = document.getElementById("siteURL").value;
  if (!newSiteName.trim() || !newSiteURL.trim()) return;

  fetch(apiUrl, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ name: newSiteName, url: newSiteURL })
  })
    .then(()=>{
      document.getElementById("siteName").value = "";
      document.getElementById("siteURL").value = "";
    })
    .catch((err)=> console.error(err));
}

// read data
function readData() {
  const list = document.getElementById("dataList");
  list.innerHTML = "";
  fetch(apiUrl)
    .then((res)=>res.json())
    .then((sites)=> {
      for (let i = 0; i < sites.length; i++) {
        list.innerHTML += `<li><a href="${sites[i].url}">${sites[i].id} ${sites[i].name}</a></li>`;
      }
    })
    .catch((err)=> console.error(err));
}
function updateData() {
  const updateId = document.getElementById("updateId").value;
  const updateName = document.getElementById("updateName").value;
  const updateURL = document.getElementById("updateURL").value;
  if (!updateId.trim() || !updateName.trim() || !updateURL.trim()) return;

  fetch(`${apiUrl}/${updateId}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify({ name: updateName, url: updateURL })
  }).then(()=>{
    document.getElementById("updateId").value = "";
    document.getElementById("updateName").value = "";
    document.getElementById("updateURL").value = "";
  })
  .catch((err)=> console.error(err));
}
function deleteData() {
  const deleteId = document.getElementById("deleteId").value;
  fetch(`${apiUrl}/${deleteId}`, { method: "DELETE" })
    .then(()=>{
      document.getElementById("deleteId").value = "";
    })
    .catch((err)=> console.error(err));
}