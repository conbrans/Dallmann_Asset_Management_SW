/**
 * function to hide the values in FAQ and make them visible if the coloum is
 * clicked
 */
window.onload = function () {
	var acc = document.getElementsByClassName("toggle-title");
	var panel = document.getElementsByClassName('toggle-inner');

	for (var i = 0; i < acc.length; i++) {
		acc[i].onclick = function () {
			var setClasses = !this.classList.contains('active');
			setClass(acc, 'active', 'remove');
			setClass(panel, 'show', 'remove');

			if (setClasses) {
				this.classList.toggle("active");
				this.nextElementSibling.classList.toggle("show");
			}
		};
	}

	function setClass(els, className, fnName) {
		for (var i = 0; i < els.length; i++) {
			els[i].classList[fnName](className);
		}
	}
};



