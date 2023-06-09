// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER = "session/UPDATE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, month, day, year) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			month,
			day,
			year
		})
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {

		return ["Please enter a valid birth date"];
		// return ["An error occurred. Please try again."];
	}
};


export const updateUserThunk = (user) => async(dispatch) => {
	const {id, username, email, password, month, day, year, about, profile_pic} = user
	const form_data = new FormData()
	// form_data.append('test', 'working')
	// form_data.get(te)
	form_data.append('profile_pic', profile_pic)
	const response = await fetch(`/api/users/${user.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id,
			username,
			email,
			password,
			month,
			day,
			year,
			about,
		})
	})
	//make another fetch request to add the image and only pass in form data as the body
	if (form_data.get('profile_pic')) {
		const imageResponse = await fetch(`/api/users/${user.id}/image`, {
			method: "PUT",
			body: form_data
		})
		if (imageResponse.ok && response.ok) {
			const userAndImageRes = await imageResponse.json()
			dispatch(updateUser(userAndImageRes))
			return null
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	}

	// if (response.ok) {
	// 	const data = await response.json();
	// 	dispatch(updateUser(data));
	// 	return null;
	// } else if (response.status < 500) {
	// 	const data = await response.json();
	// 	if (data.errors) {
	// 		return data.errors;
	// 	}
	// } else {
	// 	return ["An error occurred. Please try again."];
	// }

}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_USER:
			return { user: action.payload};
		default:
			return state;
	}
}
