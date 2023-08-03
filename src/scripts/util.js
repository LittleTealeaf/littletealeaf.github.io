const throwErr = (err) => {
	throw err
}

function querySelector(query, root = document) {
	const element = root?.querySelector(query);
	if (element == null) {
		throw new Error(`Could not find ${query}`);
	}
	return element;
}
