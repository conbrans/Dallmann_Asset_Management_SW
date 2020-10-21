/**
 * autocompletion for the mail input, takes the first letter
 * of the first name and transform it to lowercase
 */
function setEmail() {
	let firstLetter = (document.getElementById("firstname").value)
		.charAt(0).toLowerCase();
	let lastName = (document.getElementById("surname").value)
		.toLowerCase();

	document.getElementById("email").value = firstLetter + "."
		+ lastName + "@dallmann-bau.de";
}

/**
 * triggered with a click on the password input and
 * writes a standard password in the field
 */
function setDefaultPassword() {
	document.getElementById("password").value = "123456";
}

/**
 * preselect the rights on the tab "Rechte" after which "Rolle"
 * is choosen in the dropdown menu
 */
function selectPermission() {
	var length = document.getElementsByName("adminPermission")
		.length;
	for (let i = 0; i < length; i++) {
		document.getElementsByName("adminPermission")
			[i].checked = false;
		document.getElementsByName("workshopPermission")
			[i].checked = false;
		document.getElementsByName("foremanPermission")
			[i].checked = false;
		document.getElementsByName("accountingPermission")
			[i].checked = false;
	}

	let role = document.getElementById("role").value;
	let permission = role.toString() + "Inherited";
	document.getElementById(permission).checked = true;
}

/**
 * function to delete checked radio buttons
 * @param radioname declares the radio buttons which should be cleared
 */
function removeCheckedRadio(radioname) {
	for (let i = 0; i < document.getElementsByName(radioname).length; i++) {
		document.getElementsByName(radioname)[i].checked = false;
	}
}