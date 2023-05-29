function isInViewport(element) {
	const rect = element.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
		(window.innerHeight || document.documentElement.clientHeight) &&
			(rect.right <= window.innerWidth || document.documentElement.clientWidth)
	);
}


/**
 * https://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return null;
  }
