import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [year, setYear] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (password === confirmPassword) {
	// 		const data = await dispatch(signUp(username, email, password));
	// 		if (data) {
	// 			setErrors(data);
	// 		} else {
	// 			closeModal();
	// 		}
	// 	} else {
	// 		setErrors([
	// 			"Confirm Password field must be the same as the Password field",
	// 		]);
	// 	}
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

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

		const dateOfBirth = `${year}-${monthObj[month]}-${day}`
		const data = await dispatch(signUp(username, email, password, dateOfBirth));
		if (data) {
			setErrors(data);
		} else {
			closeModal();
		}

	};


	let daysOptionArr = []
	for (let i = 1; i < 32; i++) {
		daysOptionArr.push(i)
	}

	let yearOptionArr = []
	for (let i = 1900; i < 2024; i++) {
		yearOptionArr.push(i)
	}

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
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
				{/* <label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label> */}
				<label>
					Month
					<select
						// type="select"
						value={month}
						onChange={(e) => setMonth(e.target.value)}
						required
					>
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
					{yearOptionArr.map(year => (
						<option key={year} value={year}>{year}</option>
					))}
					</select>
				</label>

				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
