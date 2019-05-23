
// TODO: JSdoc?

//save response in map array

let resultList = []; //array of objects

window.onload=function(){

  // document.getElementById("siteSearch").on("keydown", async function(e) {
  //   debugger
  //   e.stopPropagation();
  //   e.preventDefault();
  //   await fetchRepositories();
  // });

  // document.addEventListener('afterkeydown', fetchRepositories);

  document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await handleSubmit(e);
  });

  
}


async function handleSubmit(e) {
  debugger
  // e.preventDefault();
  const inputValue = document.getElementById('siteSearch').value
  const apiRoot = 'https://api.github.com/search/repositories?q=';

  const fetchOptions = {
    headers: {
      Accept: "application/vnd.github.mercy-preview+json",
    }
  };

  try {
    const resp = await fetch(apiRoot + inputValue, fetchOptions);
    const response = resp.json();
  
    // console.log(response);
    let date = new Date();
    date = date.toISOString().substring(0, 10);

    const searchObject = { searchTerm: inputValue, date: date};

    resultList.push(searchObject);
    console.log(resultList);
    debugger

    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('id',inputValue);
    var title = document.createElement("span"); 
    var timestamp = document.createElement("span");
    var removeButton = document.createElement("button"); 


    title.appendChild(document.createTextNode(inputValue));
    li.appendChild(title);
    timestamp.appendChild(document.createTextNode(date));
    li.appendChild(timestamp);
    removeButton.appendChild(document.createTextNode("X"));
    li.appendChild(removeButton);

    ul.appendChild(li);

    removeButton.addEventListener('click', async function(e) {
      e.preventDefault();
      // await handleSubmit(e);
      console.log("ta bort")
    });

    }
    catch (err) {
      console.log("Got API error for endpoint", err);
    }
};



// async function handleSubmit(e)  {
//   const date = new Date();
//   const inputValue = document.getElementById('site-search').value
//   const searchObject = { searchTerm: inputValue, date: date};

//   resultList.push(searchObject);
//   console.log(resultList);
// }

function clearResultList() {
  debugger
  resultList = [];
  location.reload();
}