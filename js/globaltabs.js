function addTab() {
	const tabIndexElement = document.getElementById("index");
	if (!tabIndexElement || tabIndexElement === undefined) return;

	const containerElement = document.getElementsByClassName("globaltabs__container");
	const tabContentElement = containerElement[0];
	if (!tabContentElement || tabContentElement === undefined) return;


	const tabIndex = (tabIndexElement.childElementCount + 1);
	const tabId = "tab" + tabIndex;
	
	const newTabElement = document.createElement("div");
	newTabElement.className = "globaltabs__tab";
	newTabElement.id = tabId;
	newTabElement.innerHTML = "<a href=\"#\" class=\"globaltabs__tab-close\" onClick=\"closeTab('"+tabId+"')\">Close</a><a href=\"#\" class=\"globaltabs__tab-toggle\" onClick=\"toggleTab('"+tabId+"')\">Tab " + tabIndex + "</a>";
	tabIndexElement.appendChild(newTabElement);

	const newContentElement = document.createElement("div");
	newContentElement.className = "globaltabs__content";
	newContentElement.id = "tab" + tabIndex + "-content";
	// <div class="globaltabs__content" id="tab1-content">
	newContentElement.innerHTML = "<h1>Hello, tab number " + tabIndex + "</h1>";
	tabContentElement.appendChild(newContentElement);
}

function closeTab(tabId) {
	const indexElement = document.getElementById("index");
	const tabCount = indexElement.childElementCount;
	const containerElement = document.getElementById("content");
	const contentElement = document.getElementById(tabId + "-content");
	const tabElement = document.getElementById(tabId);

	if (tabCount == 1) {
		toggleTab(tabId);					
	}

	indexElement.removeChild(tabElement);
	containerElement.removeChild(contentElement);

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
	const tabElementContent = document.getElementById(tabId + "-content");
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
		} else {
			tabsClasses.toggle(classActive);
			tabClasses.remove(classActive);
		}
	} else {
		tabsClasses.toggle(classActive);

		if (!isCurrentActive) {
			allButSelectedContentElements.map((e)=>e.classList.remove(classActive));
			allButSelectedTabElements.map((e)=>e.classList.remove(classActive));
			contentClasses.add(classActive);
			tabClasses.add(classActive);
		} else {
			tabClasses.toggle(classActive);
		}
	}
}