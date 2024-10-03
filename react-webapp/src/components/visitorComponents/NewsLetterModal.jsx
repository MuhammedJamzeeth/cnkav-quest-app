import React, {useState} from "react";
import {
    googleLogo,
    facebookLogo,
    appleLogo,
    cnkavLogo,
    signupbg,
} from "../../images";
import {helloHand} from "../../images";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import {ClipLoader} from "react-spinners";

export default function Component({isModal, toggleModal}) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const emaiHandler = (e) => {
        setEmail(e.target.value);
    };

    const newsletterHandler = (email) => {
        axios
            .get(`https://backend.cnkav.com/auth/news-letter?email=${email}`)
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "Verification email has been sent to you!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/dashboard");
                    }
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem sending the email.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        try {
            setLoading(true)
            const response = await axios.post("https://backend.cnkav.com/newsletter", {email})
            if (response.status === 409) {
                Swal.fire({
                    title: "Error!",
                    text: "Email already exists!",
                    icon: "error",
                    confirmButtonText: "OK",
                })
                return;

            }
            console.log(response.status)
            toggleModal("closed")
            Swal.fire({
                title: "Success!",
                text: "Verification email has been sent to you!",
                icon: "success",
                confirmButtonText: "OK",
            })

            setEmail("")
        } catch (e) {
            Swal.fire({
                title: "Error!",
                text: e.response.data.detail || "There was a problem sending the email",
                icon: "error",
                confirmButtonText: "Try Again",
            });
            console.error('Error adding newsletter email:', e);
        } finally {
            setLoading(false)
        }

        // newsletterHandler(email);
    };

    return (
        <div>
            <Modal show={isModal} onClose={() => toggleModal("closed")}>
                <div className="space-y-5 bg-black px-0 md:px-8 py-8 rounded-md">
                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleModal("closed")}
                            className="bg-black text-white text-2xl pr-6  font-bold"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <img src={cnkavLogo} alt="Logo" className="h-24 w-24"/>
                    </div>
                    <form onSubmit={handleSubmit} className="px-4 md:px-10 py-2">
                        <div className="mb-4">
                            <label className="block text-white text-sm mb-2" htmlFor="email">
                                News Letter Sign Up
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                className="w-full p-3 border border-gray-700 rounded-lg bg-white text-[#575757]"
                                placeholder="Enter Email"
                                onChange={emaiHandler}
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-lg font-bold flex items-center justify-center mb-2 transition"
                                style={{
                                    backgroundColor: "transparent",
                                    border: "2px solid transparent",
                                    borderImage: "linear-gradient(120deg, red, yellow) 1",
                                }}
                            >
                                {loading ? <ClipLoader color={"#ffffff"} size={24}/> : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <div className="py-6">
                        <p className="mt-6 text-center text-sm text-white">
                            By signing up, you agree to Cnkav <br/>
                            <a href="/terms-of-services" className="text-white underline">
                                Terms and Conditions
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}