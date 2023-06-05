import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadProfilePicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [about, setAbout] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log('This is our form dat in the 'formData)
        formData.append("profile_pic", profilePic);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    return (
		<div>
            <div>
                <h1>Sign Up</h1>
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
                            required
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

export default UploadProfilePicture;
