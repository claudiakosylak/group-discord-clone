import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from "../../store/session";

function UpdateUser() {

    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)
    const currentUser = useSelector(state => state.session.user)
    console.log(currentUser)

    const fullDateOfBirth = currentUser?.date_of_birth.split(" ")
    console.log("THIS IS THE FULL DATE OF BIRTH", fullDateOfBirth)

    let monthObj = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        June: "June",
        July: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December",
    }


    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [username, setUsername] = useState(currentUser?.username);
    const [email, setEmail] = useState(currentUser?.email);
    const [password, setPassword] = useState(currentUser?.password);
    const [month, setMonth] = useState(monthObj[fullDateOfBirth[2]]);
    const [day, setDay] = useState(fullDateOfBirth[1][0] !== 0 ? fullDateOfBirth[1]: fullDateOfBirth[1].slice(1));
    const [year, setYear] = useState(fullDateOfBirth[3]);
    const [about, setAbout] = useState(currentUser?.about);
    const [profilePic, setProfilePic] = useState(currentUser?.profilePic);

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const user = useSelector(state => state.session.user)


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const user = {
        //     id: userId,
        //     username,
        //     email,
        //     password,
        //     month,
        //     day,
        //     year,
        //     about,
        //     profilePic
        // }
        // const formData = new FormData();

        user.username = username
        // formData.append("username", username)
        user.email = email
        // formData.append("email", email)
        if (password) {
            user.password = password
            // formData.append("password", password)
        }
        user.month = month
        // formData.append("month", month)
        user.day = day
        // formData.append("day", day)
        user.year = year
        // formData.append("year", year)
        if (about) {
            user.about = about
            // formData.append("about", about)
        }
        console.log(profilePic)
        if (profilePic) {
            user.profile_pic = profilePic
            // formData.append("profile_pic", profilePic)
        }
        console.log('USER DOT PROF_PIC ------------------>', user.profile_pic)
        // console.log("THIS IS THE FORM DATA", formData)
        console.log("THIS IS THE USER IN THE COMPONENT", user)
        const data = await dispatch(updateUserThunk(user));
        console.log("THIS IS THE DATA IN THE HANDLE SUBMIT", data)
        // const formData = new FormData();
        // console.log('This is our form data in the handle submit ', formData)
        // formData.append("profile_pic", profilePic);




        // // aws uploads can be a bit slow—displaying
        // // some sort of loading message is a good idea
        // setImageLoading(true);

        // const res = await fetch(`/api/users/${userId}`, {
        //     method: "PUT",
        //     body: {
        //         // id: userId,
        //         username,
        //         email,
        //         password,
        //         month,
        //         day,
        //         year,
        //         about,
        //         profile_pic: profilePic
        //     },
        // });
        // console.log("THIS IS RES", res)
        // if (res.ok) {
        //     await res.json();
        //     setImageLoading(false);
        //     history.push(`/users/${userId}`);
        // }
        // else {
        //     setImageLoading(false);
        //     // a real app would probably use more advanced
        //     // error handling
        //     console.log("error");
        // }

    }

    let daysOptionArr = []
	for (let i = 1; i < 32; i++) {
		daysOptionArr.push(i)
	}

    // let daysOptionArrRes = ["01", "02", "03", "04", "05", "06", "07", "08", "09"]

	let yearOptionArr = []
	for (let i = 1900; i < 2023; i++) {
		yearOptionArr.push(i)
	}

    return (
		<div>
            <div>
                <h1>Update User</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <ul>
                        {(hasSubmitted && errors.length) && (errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
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

                        />
                    </label>
                    <label>
                        Month
                        <select
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
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            required
                        >
                        <option value="" disabled>Day</option>
                        {/* {daysOptionArrRes.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))} */}
                        {daysOptionArr.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                        </select>
                    </label>
                    <label>
                        Year
                        <select
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
                    <label>
                        About
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        Profile Picture
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </label>

                    <button type="submit" disabled={month === "" || day === "" || year === ""}>Update User Info</button>
                </form>
            </div>
		</div>
	);
}

export default UpdateUser;
