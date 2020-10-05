var tabIndex = 0;
var activeTab = nil;

function addTab() {
	const tabIndexElement = document.getElementById("index");
	if (!tabIndexElement || tabIndexElement === undefined) return;

	const containerElement = document.getElementsByClassName("globaltabs__container");
	const tabContentElement = containerElement[0];
	if (!tabContentElement || tabContentElement === undefined) return;

	tabIndex++;
	const tabId = "tab" + tabIndex;
	
	const newTabElement = document.createElement("div");
	newTabElement.className = "globaltabs__tab";
	newTabElement.id = tabId;

	const linkCloseTab = document.createElement("a");
	linkCloseTab.className = "globaltabs__tab-close";
	linkCloseTab.id = tabId + "_close";
	linkCloseTab.href = "#";
	linkCloseTab.text = "Close";
	linkCloseTab.addEventListener("click",(e)=>{
		e.preventDefault();
		closeTab(tabId);
	});

	newTabElement.appendChild(linkCloseTab);

	const linkToggleTab = document.createElement("a");
	linkToggleTab.className = "globaltabs__tab-toggle";
	linkToggleTab.id = tabId + "_toggle";
	linkToggleTab.href = "#";
	linkToggleTab.text = "Tab " + tabIndex;
	linkToggleTab.addEventListener("click",(e)=>{
		e.preventDefault();
		toggleTab(tabId);
	});
	newTabElement.appendChild(linkToggleTab);

	tabIndexElement.appendChild(newTabElement);

	const newContentElement = document.createElement("div");
	newContentElement.className = "globaltabs__content";
	newContentElement.id = "globaltabs_tab" + tabIndex + "-content";
	// <div class="globaltabs__content" id="tab1-content">
	newContentElement.innerHTML = "<h1>Hello, tab number " + tabIndex + "</h1>";
	tabContentElement.appendChild(newContentElement);
}

function closeTab(tabId) {

	const tabsElement = document.getElementById("globaltabs");
	if (!tabsElement || tabsElement === undefined) return;
	const tabsClasses = tabsElement.classList;
	const isGlobalActive = tabsClasses.contains("active");

	const indexElement = document.getElementById("index");
	const isLastTab = indexElement.childElementCount == 1;
	const containerElement = document.getElementById("content");
	const contentElement = document.getElementById("globaltabs_" + tabId + "-content");
	const tabElement = document.getElementById(tabId);
	const tabSibling = tabElement.previousSibling;

	indexElement.removeChild(tabElement);
	containerElement.removeChild(contentElement);

	if (isGlobalActive) {
		if (isLastTab) {
			tabsClasses.remove("active");
			return
		} 
		
		if (activeTab == tabId)
			toggleTab(tabSibling.id);
	}
}

function toggleTab(tabId) {

	const classActive = "active";

	// Global element
	const tabsElement = document.getElementById("globaltabs");
	if (!tabsElement || tabsElement === undefined) return;
	const tabsClasses = tabsElement.classList;

	// Selected tab
	const tabElement = document.getElementById(tabId);
	if (!tabElement ||tabElement === undefined) return;
	const tabClasses = tabElement.classList;

	// Tabs elements
	const allTabsElements = document.getElementsByClassName("globaltabs__tab");
	const allButSelectedTabElements = Array.from(allTabsElements).filter((e)=>e.id !== tabId);

	// Content elements
	const allTabsContentElements = document.getElementsByClassName("globaltabs__content");
	const allButSelectedContentElements = Array.from(allTabsContentElements).filter((e)=>e.id !== tabId + "-content");

	// Selected element
	const tabElementContent = document.getElementById("globaltabs_" + tabId + "-content");
	if (!tabElementContent ||tabElementContent === undefined) return;
	const contentClasses = tabElementContent.classList;

	let isGlobalActive = tabsClasses.contains(classActive);
	let isCurrentActive = contentClasses.contains(classActive);

	if (isGlobalActive) {
		if (!isCurrentActive) {
			allButSelectedContentElements.map((e)=>e.classList.remove(classActive));
			allButSelectedTabElements.map((e)=>e.classList.remove(classActive));
			contentClasses.add(classActive);
			tabClasses.add(classActive);
			activeTab = tabId;
		} else {
			tabsClasses.toggle(classActive);
			tabClasses.remove(classActive);
			activeTab = nil;
		}
	} else {
		tabsClasses.toggle(classActive);

		if (!isCurrentActive) {
			allButSelectedContentElements.map((e)=>e.classList.remove(classActive));
			allButSelectedTabElements.map((e)=>e.classList.remove(classActive));
			contentClasses.add(classActive);
			tabClasses.add(classActive);
			activeTab = tabId;
		} else {
			tabClasses.toggle(classActive);
			activeTab = nil;
		}
	}
}