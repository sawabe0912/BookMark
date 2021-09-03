const addBtn = document.getElementById("addBtn");
const inputContainer = document.getElementById("inputContainer");
const xBtn = document.getElementById("xBtn");
const form = document.getElementById("bookmarkForm");
const websiteName = document.getElementById("websiteName");
const websiteUrl = document.getElementById("websiteUrl");
const mostTop = document.getElementById("mostTop");
const h3 = document.getElementById("h3");
const saveBtn = document.getElementById("saveBtn");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const webContainer = document.getElementById("webContainer");


let bookmarks = [];
addBtn.addEventListener("click", getWebsite);
xBtn.addEventListener("click", closeForm);
form.addEventListener("submit", updateBookmark);


window.addEventListener("click", checkWhereclick);

    


function getWebsite(){
   inputContainer.hidden = false;
   websiteName.focus();
   inputContainer.style.zIndex = 1;
   addBtn.hidden = true;
   document.body.style.backgroundColor = "black";
}

function closeForm (){
   inputContainer.hidden = true;
   document.body.style.backgroundColor = "#DFDBE5";
   addBtn.hidden = false;
}

function updateBookmark(e){
    e.preventDefault();
    document.body.style.backgroundColor = "#DFDBE5";
    addBtn.hidden = false;
    const nameValue = websiteName.value;
    let urlValue = websiteUrl.value;
    if(!urlValue.includes("http://", "https://")){
    	urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
      return false;
    }
    const bookmark = {
      name: nameValue,
      url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    form.reset();
    inputContainer.hidden = true;
}

function validate(nameValue, urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  
  return true;
}

function buildBookmarks() {
  // Remove all bookmark elements
  webContainer.textContent = "";
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement('div');
    item.classList.add("itemFrame");
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
   
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    favicon.style.marginRight = "10px";

    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    link.style.color = "white";
    link.style.textDecoration = "none";
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    webContainer.appendChild(item);
  });
}


function deleteBookmark(url){
   bookmarks.forEach((bookmark, i) => {
   if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks(){
	//to get the bookmarks from localStorage if possible
	if(localStorage.getItem("bookmarks")){
		bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
	} else {
		bookmarks = [ {
			name : "Google",
			url : "google.com",
		},
	  ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function checkWhereclick(e){
	if(e.target !== inputContainer && e.target !== addBtn && e.target !== form && e.target !== mostTop && e.target !== h3 && e.target !== saveBtn && e.target !== label1 && e.target !== websiteName && e.target !== websiteUrl && e.target !== label2){
		closeForm();
	}
	
}
form.addEventListener('submit', updateBookmark);
fetchBookmarks();

