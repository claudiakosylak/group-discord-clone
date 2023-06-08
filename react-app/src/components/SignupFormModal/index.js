import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory, Redirect } from "react-router-dom";


function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [year, setYear] = useState("");
	const [errors, setErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [hasErrors, setHasErrors] = useState(false)
	const sessionUser = useSelector((state) => state.session.user);


	useEffect(() => {
		// If you want the validation to appear the moment errors occur, just take out the if (hasSubmitted == true) {} but keep lines 26 - 33
		if (hasSubmitted === true) {
			const errors = {}

			if (username.length > 30) errors.username = "Please enter a username below 30 characters"
			if (password.length > 30) errors.password = "Please enter a password below 30 characters"
			if (email.length > 30) errors.email = "Please enter an email below 30 characters"


			setErrors(errors)
		}


	}, [username, password, email, hasSubmitted])


	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true)
		let monthObj = {
			"January": 1,
			"February": 2,
			"March": 3,
			"April": 4,
			"May": 5,
			"June": 6,
			"July": 7,
			"August": 8,
			"September": 9,
			"October": 10,
			"November": 11,
			"December": 12,
		}



		if (Object.values(errors).length) {
			// console.log("OBJECT . VALUES OF ERRORS IN HANDLE SUB", Object.values(errors))
			setHasErrors(true)
		} else {
			const data = await dispatch(signUp(username, email, password, month, day, year));
			if (data) {
				setErrors(data);
			} else {
				setHasSubmitted(false)

			}
		}


	};


	let daysOptionArr = []
	for (let i = 1; i < 32; i++) {
		daysOptionArr.push(i)
	}

	let yearOptionArr = []
	for (let i = 1900; i < 2023; i++) {
		yearOptionArr.push(i)
	}



	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
					{errors.email ? <p style={{color:"darkred"}}>{errors.email}</p> : ""}
					{errors.username ? <p style={{color:"darkred"}}>{errors.username}</p> : ""}
					{errors.password ? <p style={{color:"darkred"}}>{errors.password}</p> : ""}
				<ul>
					{(hasSubmitted && errors.length) && (errors.map((error, idx) => (
						<li key={idx} style={{color:"darkred"}}>{error}</li>
					)))}

				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				<label>
					Month
					<select
						// type="select"
						value={month}
						onChange={(e) => setMonth(e.target.value)}
						required
					>
					<option value="" disabled>
						Month
					</option>
					<option value="January">
						January
					</option>
					<option value="February">
						February
					</option>
					<option value="March">
						March
					</option>
					<option value="April">
						April
					</option>
					<option value="May">
						May
					</option>
					<option value="June">
						June
					</option>
					<option value="July">
						July
					</option>
					<option value="August">
						August
					</option>
					<option value="September">
						September
					</option>
					<option value="October">
						October
					</option>
					<option value="November">
						November
					</option>
					<option value="December">
						December
					</option>
					</select>

				</label>
				<label>
					Day
					<select
						// type="select"
						value={day}
						onChange={(e) => setDay(e.target.value)}
						required
					>
					<option value="" disabled>Day</option>
					{daysOptionArr.map(day => (
						<option key={day} value={day}>{day}</option>
					))}
					</select>
				</label>
				<label>
					Year
					<select
						// type="select"
						value={year}
						onChange={(e) => setYear(e.target.value)}
						required
					>
					<option value="" disabled>Year</option>
					{yearOptionArr.map(year => (
						<option key={year} value={year}>{year}</option>
					))}
					</select>
				</label>

				<button type="submit" disabled={month === "" || day === "" || year === ""}>Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
