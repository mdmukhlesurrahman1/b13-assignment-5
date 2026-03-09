let currentTab = "all";

const cardsSection = document.getElementById("cards");
const count = document.getElementById("count");
const loading = document.getElementById("loading");
const allIssue = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// modal get element by id
const showIssue = document.getElementById("show_issue");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalAuthor = document.getElementById("modal-author");
const modalDate = document.getElementById("modal-date");
const modalLabels = document.getElementById("modal-labels");
const modalDescription = document.getElementById("modal-description");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");

// Switch Tab Create
function switchTab(tab) {
    const tabs = ["all", "open", "closed"]
    currentTab = tab;
    // Button Style
    for (const t of tabs) {
        const tabName = document.getElementById(t);
        if (t === tab) {
            tabName.classList.add('btn-active');
        }
        else {
            tabName.classList.remove('btn-active');
        }
    }
    getData(allIssue);
};

// show loading
function showLoading() {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    cardsSection.innerHTML = "";
};
// hide loading
function hideLoading() {
    loading.classList.remove("flex");
    loading.classList.add("hidden");
};
// date formatter
function dateFormat(apiDate) {
    const formattedDate = new Date(apiDate).toLocaleDateString('en-BD', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return (formattedDate);
};
// label design
const labelDesign = (arr) => {
    const htmlElements = arr.map((el) => `<span class="badge badge-soft badge-warning rounded-full flex items-center border-warning text-xs uppercase">${el}</span>`);
    // console.log(htmlElements);
    return htmlElements.join(" ");
};


// get data function
async function getData(src) {
    showLoading();
    const res = await fetch(src);
    const data = await res.json();
    const allIssue = data.data;
    // for open
    const openIssue = allIssue.filter(issue => issue.status === "open");
    const closedIssue = allIssue.filter(issue => issue.status === "closed");
    if (currentTab === "open") {
        displayData(openIssue);
    }
    else if (currentTab === "closed") {
        displayData(closedIssue);
    }
    else {
        displayData(allIssue);
    }
    hideLoading();
};

// display data function
function displayData(allData) {
    count.innerHTML = `${allData.length} Issues`;

    allData.forEach(element => {
        // create div and set style
        const card = document.createElement("div");
        if (element.status === "open") {
            card.className = "card shadow-lg bg-base-100 border-t-3 border-[#00A96E]";
        }
        else {
            card.className = "card shadow-lg bg-base-100 border-t-3 border-[#A855F7]";
        }
        // set html code
        card.innerHTML = `
                
                <div class="p-4 space-y-2 h-full cursor-pointer" onclick="showIssueModal(${element.id})">
                    <div class="flex justify-between items-center">
                        <img src="assets/${element.status}.png" alt="">
                        <div class="badge badge-soft badge-error rounded-full font-bold uppercase">
                        ${element.priority}</div>
                    </div>
                    <h2 class="font-bold">${element.title}</h2>
                    <p class="text-gray-500 text-xs line-clamp-2">${element.description}</p>
                    <div class="flex flex-wrap gap-1">${labelDesign(element.labels)}</div>
                </div>
                <hr class="border-base-300">
                <div class="p-4 space-y-2">
                    <p class="text-gray-500 text-sm "># ${element.id} by ${element.author}</p>
                    <p class="text-gray-500 text-sm ">${dateFormat(element.createdAt)}</p>
                </div>

        `;
        cardsSection.append(card);

    });
};

// modal showing....
async function showIssueModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;
    modalTitle.innerText = issue.title;
    // conditional Status
    if (issue.status === "open") {
        modalStatus.innerText = "Opened";
        modalStatus.className = "badge bg-[#00A96E] rounded-full font-bold text-base-100";
        modalAuthor.innerText = `• Opened by ${issue.author}`;
    }
    else {
        modalStatus.innerText = "Closed";
        modalStatus.className = "badge bg-[#A855F7] rounded-full font-bold text-base-100";
        modalAuthor.innerText = `• Closed by ${issue.author}`;
    }
    modalDate.innerText = `• ${dateFormat(issue.createdAt)}`;
    // labels Add
    modalLabels.innerHTML = '';
    const labels = issue.labels;
    for (let lbl of labels) {
        const label = document.createElement('div');
        label.className = "badge badge-warning border-warning badge-soft rounded-full uppercase";
        label.innerText = lbl;
        modalLabels.append(label);
    }
    modalDescription.innerText = issue.description;
    modalAssignee.innerText = issue.assignee ? issue.assignee : "Not Found";
    modalPriority.innerText = issue.priority;
    if(issue.priority === "high"){
        modalPriority.className = "badge badge-error rounded-full font-bold text-base-100 uppercase";
    }
    else if(issue.priority === "medium"){
        modalPriority.className = "badge badge-warning rounded-full font-bold text-base-100 uppercase";
    }
    else{
        modalPriority.className = "badge bg-gray-500 rounded-full font-bold text-base-100 uppercase";
    }
    showIssue.showModal();
};

// search option code
function search() {
    const inputValue = document.getElementById('search').value;
    const searchValue = inputValue.toLowerCase().trim();
    if(!searchValue){
        return;
    }
    const searchIssue = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    getData(searchIssue);
}

getData(allIssue);
switchTab(currentTab);