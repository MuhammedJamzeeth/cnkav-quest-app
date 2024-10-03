import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {cnkavLogo} from "../../images";
import {Modal} from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";
import qs from "qs";
import {ClipLoader} from "react-spinners";
// import {ClipLoader} from "react-spinners";

export default function Step8({isModal, toggleModal}) {
    const navigate = useNavigate();
    const [finalfeedback, setFinalFeedBack] = useState("");
    const [loading, setLoading] = useState(false);

    const feedbackHandler = (e) => {
        setFinalFeedBack(e.target.value);
    };
    const location = useLocation();
    const {
        email,
        fullname,
        gender,
        maritalStatus,
        employmentStatus,
        productInterest,
        locations,
        religions,
        investmentAmount,
        similarProduct,
        hardestPart,
        lastEncounter,
        motivator,
        previousActions,
    } = location.state || {};

    console.log("first", location.state);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            name: fullname,
            email: email,
            gender: gender,
            marital: maritalStatus,
            employed: employmentStatus,
            product: productInterest,
            where_you_from: locations,
            religion: religions,
            capital: investmentAmount,
            similar_product: similarProduct,
            hardest_product: hardestPart,
            survey: lastEncounter,
            motivator: motivator,
            previously: previousActions,
            current_solution: finalfeedback,
        };

        console.log("formData", formData);

        axios
            .post("https://backend.cnkav.com/contact", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "Verification email has been sent to you!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        toggleModal("closed");
                    }
                });
            })
            .catch((error) => {
                console.error("Error details:", error.response);
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem sending the email.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="w-full h-full flex justify-center items-center text-center">
            <Modal show={isModal} onClose={() => toggleModal("closed")}>
                <div className=" bg-black flex flex-col justify-end items-end px-4 md:px-12">
                    <button
                        onClick={() => toggleModal("closed")}
                        className="text-white text-2xl font-bold mt-4"
                    >
                        &times;
                    </button>
                </div>
                <div className=" bg-black flex flex-col items-center justify-center py-4 pb-8">
                    <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid"/>
                    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="finalFeedback"
                                    className="block text-sm font-medium mb-2"
                                >
                                    What don’t you love about the current solution and what would
                                    your suggestion be to make the product better?
                                </label>
                                <input
                                    type="text"
                                    id="finalFeedback"
                                    value={finalfeedback}
                                    name="finalFeedback"
                                    onChange={feedbackHandler}
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                    placeholder="Enter your feedback"
                                />
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
                                    style={{
                                        border: "2px solid transparent",
                                        borderImage: "linear-gradient(120deg, red, yellow)",
                                        borderImageSlice: 1,
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ClipLoader color={"#ffffff"} size={24}/>
                                    ) : (
                                        "Confirm"
                                    )}
                                </button>
                            </div>
                        </form>
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

// const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//         ...location.state,
//         finalFeedback: e.target.finalFeedback.value,
//     };

//     // Perform final actions with formData (e.g., submit to an API)
//     console.log("Final Form Data:", formData);
//     alert("Verification email has been sent to you!");
//     navigate("/questModals");
// };
