function toggleTheme() {
	const bodyElement = document.body;
	if (!bodyElement || bodyElement === undefined) return;
	const bodyClasses = bodyElement.classList;
	bodyClasses.toggle("dark");
}
