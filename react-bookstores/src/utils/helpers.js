export function isEmpty(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

export const isJSON = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const isCreateURL = (source) => {
	try {
		URL.createObjectURL(source);
	} catch (e) {
		return false;
	}
	return true;
};

export const getToken = () => {
	const user = localStorage.getItem('USER');
	return isJSON(user) && JSON.parse(user).token;
};

export const formatDate = (date) => {
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + ' ' + monthNames[monthIndex] + ', ' + year;
}

export const createURL = (string) => {
	if(isCreateURL(string))
	return isCreateURL(string) ? URL.createObjectURL(string) : '';
};