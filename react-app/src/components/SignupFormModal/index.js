import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { Redirect, NavLink } from "react-router-dom";
import backgroundImage from "./discord-login-background.png"

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
		const errors = {}
		// if (!month.length || !day.length || !year.length) errors.dateOfBirth = "Date of birth is required"

		// if (month === "Month" || day === "Day" || year === "Year") errors.dateOfBirth = "Valid date of birth required"
		if (username.length > 30) errors.username = "Please enter a username below 30 characters"
		if (password.length > 30) errors.password = "Please enter a password below 30 characters"
		if (email.length > 30) errors.email = "Please enter an email below 30 characters"


		setErrors(errors)
		// console.log("ERROR OBJ IN THE USEEFFECT", errors)

	}, [month, day, year, username, password, email])


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
		// const errors = {}

		// if (username.length > 30) errors.username = "Please enter a username below 30 characters"
		// if (password.length > 30) errors.password = "Please enter a password below 30 characters"
		// if (email.length > 30) errors.email = "Please enter an email below 30 characters"


		// setErrors(errors)

		if (Object.values(errors).length) {
			// console.log("OBJECT . VALUES OF ERRORS IN HANDLE SUB", Object.values(errors))
			setHasErrors(true)
		} else {
			const data = await dispatch(signUp(username, email, password, month, day, year));
			if (data) {
				setErrors(data);
				console.log("THESE ARE THE ERRORS", errors)
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
		<div className="signup-page-container">
			<img className="signup-background-image" src={backgroundImage} />
			<div className={hasSubmitted && errors.length ? "signup-form-container-wtf" : "signup-form-container"}>
				<form className="signup-form" onSubmit={handleSubmit}>
					<h1 className="signup-form-header">Create an account</h1>

					<ul className="wtf-validation">
						{(hasSubmitted && errors.length) && (errors.map((error, idx) => (
							<li key={idx} style={{ color: "red" }}>{error}</li>
						)))}

					</ul>
					<label className="signup-form-label">
						<p>Email {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}</p>
						<input
							className="signup-form-input"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className="signup-form-label">
					<p>Username {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}</p>
						<input
							className="signup-form-input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<label className="signup-form-label">
					<p>Password {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}</p>
						<input
							className="signup-form-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<div className="birthday-container">
						<label className="signup-form-label">
							Month
							<select
								// type="select"
								className="signup-select"
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
						<label className="signup-form-label">
							Day
							<select
								className="signup-select"
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
						<label className="signup-form-label">
							Year
							<select
								className="signup-select"
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
					</div>

					<button className="signup-form-button" type="submit" disabled={username.length > 30 || password.length > 30 || email.length > 30 || month === "" || day === "" || year === ""}>Sign Up</button>
				</form>
				<NavLink id="reroute-login-link" to='/login'>Already have an Account?</NavLink>
			</div>
		</div>
	);
}

export default SignupFormModal;
