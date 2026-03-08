const cardsSection = document.getElementById("cards");
const count = document.getElementById("count");
const loading = document.getElementById("loading");
const allIssue = "https://phi-lab-server.vercel.app/api/v1/lab/issues";


// modal get element by id
const showIssue = document.getElementById("show_issue");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalTagline = document.getElementById("modal-tagline");
const modalLabels = document.getElementById("modal-labels");
const modalDescription = document.getElementById("modal-description");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");



let currentTab = "all";

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
    console.log(currentTab);

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
    displayData(data.data);
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

getData(allIssue);
switchTab(currentTab);

// modal showing....
async function showIssueModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;
    modalTitle.innerText = issue.title;
    if (issue.status === "open") {
        modalStatus.innerText = "Opened";
        modalStatus.className = "badge bg-[#00A96E] rounded-full font-bold text-base-100";
        modalTagline.innerText = `• Opened by ${issue.author} • ${dateFormat(issue.createdAt)}`;
    }
    else {
        modalStatus.innerText = "Closed";
        modalStatus.className = "badge bg-[#A855F7] rounded-full font-bold text-base-100";
        modalTagline.innerText = `• Closed by ${issue.author} • ${dateFormat(issue.createdAt)}`;
    }


    modalDescription.innerText = issue.description;
    modalAssignee.innerText = issue.assignee;
    modalPriority.innerText = issue.priority;

    showIssue.showModal();
}