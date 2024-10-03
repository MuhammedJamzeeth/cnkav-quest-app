// import React, {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import {
//     FaChevronLeft,
//     FaMicrophone,
//     FaVideo,
//     FaMessage,
//     FaSquareUpRight,
//     FaCircleDot,
//     FaFaceSmile,
//     FaObjectGroup,
//     FaBarsStaggered,
//     FaUsers,
//     FaCheckDouble,
//     FaRightFromBracket,
//     FaLink,
// } from "react-icons/fa6";
// import {FiPlus} from "react-icons/fi";
// import {IoMdMic} from "react-icons/io";
// import {TiUser} from "react-icons/ti";
//
// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
//
// import QuestStatusModal from "./QuestStatusModal";
// import useZoomHandler from "../../hooks/useZoomHandler.js";
// import axiosInstance from "../../api/axiosInstance.js";
//
// const QuestMeeting = () => {
//     // const [selectedOrder, setSelectedOrder] = useState(null);
//     //
//     // const [isQuestStatusModal, setQuestStatusModal] = useState(false);
//     //
//     // const toggleModal = (type) => {
//     //   if (type === "closed") {
//     //     // setisLoginModal(false);
//     //     setQuestStatusModal(false);
//     //     setModal(false);
//     //   }
//     //
//     //   //
//     //
//     //   if (type === "quests-status") {
//     //     setQuestStatusModal(true);
//     //     setModal(false);
//     //   }
//     // };
//
//     const [meetingNumber, setMeetingNumber] = useState('');
//     const [role, setRole] = useState(0); // Default to participant
//     const [userName, setUserName] = useState('Guest User');
//     const [password, setPassword] = useState('');
//     const [sdkKey, setSdkKey] = useState('');
//     const [leaveUrl, setLeaveUrl] = useState('https://yourapp.com/leave');
//
//     const [signature, setSignature] = useState(null);
//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent form from reloading the page
//
//         // Fetch the signature using the provided meeting information
//         try {
//             const response = await axiosInstance.post('http://localhost:8000/generate_signature/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({meeting_number: meetingNumber, role: role}),
//             });
//             const data = await response.json();
//             setSignature(data.signature);
//         } catch (error) {
//             console.error('Error fetching signature:', error);
//         }
//     };
//
//     let lang = 'en-US';
//
//     useEffect(() => {
//         // Initialize the Zoom Client
//         const rootElement = document.getElementById("ZoomEmbeddedApp");
//         const zmClient = ZoomMtgEmbedded.createClient();
//
//         const tmpPort = window.location.port === "" ? "" : ":" + window.location.port;
//         const avLibUrl =
//             window.location.protocol + "//" + window.location.hostname + tmpPort + "/lib";
//
//         // Initialize the Zoom SDK Embedded client
//         zmClient
//             .init({
//                 debug: true,
//                 zoomAppRoot: rootElement,
//                 assetPath: avLibUrl, // Path to assets like audio, video files
//                 language: lang,
//             })
//             .then(() => {
//                 console.log("Zoom initialization success");
//             })
//             .catch((error) => {
//                 console.error("Zoom initialization error", error);
//             });
//
//         // Join the Zoom meeting
//         zmClient
//             .join({
//                 sdkKey,
//                 signature,
//                 meetingNumber,
//                 userName,
//                 password,
//             })
//             .then(() => {
//                 console.log("Zoom meeting join success");
//             })
//             .catch((error) => {
//                 console.error("Zoom meeting join error", error);
//             });
//     }, [sdkKey, meetingNumber, userName, password, signature, lang]);
//
//     return (
//         // <>
//         //     <div className="container mx-auto pt-8 w-full h-full">
//         //         <h1 className="text-4xl font-bold mb-6 mt-40">
//         //             <button
//         //                 className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}
//         //             >
//         //                 <Link
//         //                     to="/dashboard/quests-dashboard"
//         //                     className="flex items-center gap-2"
//         //                 >
//         //                     <FaChevronLeft/>
//         //                     Exit Meeting
//         //                 </Link>
//         //             </button>
//         //         </h1>
//         //
//         //         <section className="bg-black shadow-md rounded-lg  w-full">
//         //             <div className="text-md py-2 px-2 gap-4 flex items-center border-none">
//         //                 <span>Quest Meeting Title</span>
//         //                 <button className="bg-blue-700 py-1 px-4 text-[12px] rounded-full">
//         //                     Weekly meeting
//         //                 </button>
//         //             </div>
//         //
//         //             {/* <nav class="bg-[#242526] p-1 h-12"> */}
//         //             <nav class=" p-1 h-12">
//         //                 <div class="">
//         //                     <div class=" ">
//         //                         <div className=" flex gap-4 items-center w-full justify-between">
//         //                             <div
//         //                                 class=" flex justify-center md:gap-4 gap-2 group-hover:rounded-lg transition-all ease-in-out duration-300 text-[12px]">
//         //                                 {/* Quest Meeting Title */}
//         //                                 <span
//         //                                     className="flex items-center hover:bg-gray-700 gap-2 bg-gray-600 py-2 px-4 rounded-full transition-all ease-in-out duration-300">
//         //               <FaUsers/>
//         //               32
//         //             </span>
//         //                                 <div
//         //                                     className=" md:w-[130px] w-[70px] px-4 flex justify-center items-center rounded-full py-5 md:text-[12px] text-[8px] bg-blue-700">
//         //                                     <button className="absolute flex items-center gap-2 border-none">
//         //                                         <FiPlus className="md:w-4 md:h-4"/> Add People
//         //                                     </button>
//         //                                 </div>
//         //                                 <div className=" ">
//         //                                     <Link
//         //                                         to="#"
//         //                                         onClick={() => {
//         //                                             toggleModal("quests-status");
//         //                                         }}
//         //                                     >
//         //                                         <button
//         //                                             type="button"
//         //                                             className="flex rounded-full py-3 border-none text-sm px-6 items-center bg-blue-700"
//         //                                         >
//         //                                             Confirm Quest
//         //                                         </button>
//         //                                     </Link>
//         //                                 </div>
//         //                             </div>
//         //                             {/* <div class="   mt-2  w-full transition-all duration-100 ease-in-out "></div> */}
//         //                             <div
//         //                                 className=" max-sm:hidden flex items-center gap-5 py-2 bg-gray-600 px-6 rounded-full">
//         //                                 <div class="hover:text-blue-700  cursor-pointer">
//         //                                     <div class=" rounded-full  transition-all ease-in-out duration-300">
//         //                                         <FaCheckDouble/>
//         //                                     </div>
//         //                                     {/* <div class="  group-hover:cursor-pointer w-full transition-all duration-100 ease-in-out"></div> */}
//         //                                 </div>
//         //                                 <div class="hover:text-blue-700 cursor-pointer">
//         //                                     <div
//         //                                         class=" group-hover:rounded-lg transition-all ease-in-out duration-300">
//         //                                         <FaLink/>
//         //                                     </div>
//         //                                     {/* <div class="  group-hover:cursor-pointer w-full transition-all duration-100 ease-in-out "></div> */}
//         //                                 </div>
//         //                                 <div class="hover:text-blue-700 cursor-pointer">
//         //                                     <div
//         //                                         class=" group-hover:rounded-lg transition-all ease-in-out duration-300">
//         //                                         <FaRightFromBracket/>
//         //                                     </div>
//         //                                     {/* <div class="  group-hover:cursor-pointer w-full transition-all duration-100 ease-in-out"></div> */}
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </nav>
//         //         </section>
//         //         <section className="container">
//         //             <div className=" w-full h-full flex flex-col">
//         //                 <div className="py-2">
//         //                     <img
//         //                         src="https://plus.unsplash.com/premium_photo-1661304663630-1792d13bd308?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FsbCUyMGdpcmx8ZW58MHx8MHx8fDA%3D"
//         //                         alt=""
//         //                         className="rounded-xl w-full h-fit"
//         //                     />
//         //                 </div>
//         //                 <div className="flex gap-4">
//         //                     <div className="py-2">
//         //                         <img
//         //                             src="https://media.istockphoto.com/id/1345980073/photo/mature-woman-on-a-video-call-on-the-laptop-at-home-webcam-point-of-view.jpg?s=612x612&w=0&k=20&c=_eEMeTCegh_-XbgLqJO6mFrPg2K_5urG01SAjP6kJmI="
//         //                             alt=""
//         //                             className="rounded-xl"
//         //                         />
//         //                     </div>
//         //                     <div className="py-2">
//         //                         <img
//         //                             src="https://media.istockphoto.com/id/1345980073/photo/mature-woman-on-a-video-call-on-the-laptop-at-home-webcam-point-of-view.jpg?s=612x612&w=0&k=20&c=_eEMeTCegh_-XbgLqJO6mFrPg2K_5urG01SAjP6kJmI="
//         //                             alt=""
//         //                             className="rounded-xl"
//         //                         />
//         //                     </div>
//         //                     <div className="relative">
//         //                         <div className="py-2  relative w-full rounded-xl justify-center items-center h-full">
//         //                             <img
//         //                                 src="https://media.istockphoto.com/id/1345980073/photo/mature-woman-on-a-video-call-on-the-laptop-at-home-webcam-point-of-view.jpg?s=612x612&w=0&k=20&c=_eEMeTCegh_-XbgLqJO6mFrPg2K_5urG01SAjP6kJmI="
//         //                                 alt=""
//         //                                 className="rounded-xl"
//         //                             />
//         //                             <div className="absolute top-0 flex justify-center items-center w-full h-full">
//         //                                 <FiPlus className="w-10 h-10 cursor-pointer text-red-500 "/>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </div>
//         //         </section>
//         //         <section className="bg-black shadow-md pt-4 rounded-lg w-full">
//         //             {/* <nav class="bg-[#242526]"> */}
//         //             <nav class="">
//         //                 <div
//         //                     className="grid grid-cols-3 max-sm:grid-cols-1 justify-center items-center gap-4 md:px-32 ">
//         //                     {/* start div */}
//         //                     <div className=" w-full flex md:justify-end justify-center gap-4">
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaFaceSmile/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer w-full transition-all duration-100 ease-in-out "></div> */}
//         //                         </div>
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaMicrophone/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out "></div> */}
//         //                         </div>
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaVideo/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out"></div> */}
//         //                         </div>
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaObjectGroup/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out "></div> */}
//         //                         </div>
//         //                     </div>
//         //                     {/* center div */}
//         //                     <div className=" flex justify-center w-full">
//         //                         <div className="bg-blue-700 px-8 border-none py-4 rounded-full text-sm">
//         //                             <button type="button">End Meeting</button>
//         //                         </div>
//         //                     </div>
//         //                     {/* end div */}
//         //                     <div className=" w-full flex md:justify-start justify-center gap-4">
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaMessage/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out"></div> */}
//         //                         </div>
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaSquareUpRight/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out"></div> */}
//         //                         </div>
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaCircleDot/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out"></div> */}
//         //                         </div>
//         //                         <div class="bg-gray-600 py-2 px-2 rounded-full">
//         //                             <div
//         //                                 class=" hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-300">
//         //                                 <FaBarsStaggered/>
//         //                             </div>
//         //                             {/* <div class="absolute  group-hover:cursor-pointer  w-full transition-all duration-100 ease-in-out"></div> */}
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </nav>
//         //         </section>
//         //     </div>
//         //     <QuestStatusModal
//         //         // id={updateQuest}
//         //         isModal={isQuestStatusModal}
//         //         toggleModal={toggleModal}
//         //         // handleSubmit={updateQuestStatus}
//         //     />
//         // </>
//         <div id="ZoomEmbeddedApp" style={{height: "100vh", width: "100%"}}></div>
//
//     );
// };
//
// export default QuestMeeting;
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';  // Axios for making requests to the backend
//
// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
// import axiosInstance from "../../api/axiosInstance.js";
//
// const ZoomVideoComponent = () => {
//
//     const client = ZoomMtgEmbedded.createClient();
//
//     const authEndpoint = ""; // http://localhost:8000
//     const sdkKey = "FVpUA86LSUGIbFA8tyZ7EQ";
//     const passWord = "8ACguV";
//     const role = 0;
//     const userName = "React";
//     const userEmail = "";
//     const registrantToken = "";
//     const zakToken = "";
//     const leaveUrl = "http://localhost:4000";
//
//     const [signature, setSignature] = useState(null);
//     const [meetingNumber, setMeetingNumber] = useState("89913541829");
//
//     // Fetch JWT from FastAPI backend
//     const fetchSignature = async () => {
//         try {
//             const response = await axiosInstance.post('/zoom/generate_signature/', {
//                 meetingNumber: meetingNumber,
//                 role: role,
//             });
//             console.log(response.data.signature)
//             return response.data.signature;
//         } catch (error) {
//             console.error('Error fetching signature from backend:', error);
//             return null;
//         }
//     };
//
//     const fetchMeetingId = async () => {
//         try {
//             const response = await axiosInstance.get('/zoom/meetings/');
//             console.log('Fetched Meetings:', response.data);
//             if (response.data.meetings && response.data.meetings.length > 0) {
//                 const firstMeeting = response.data.meetings[0]; // Get the first meeting
//                 setMeetingNumber(firstMeeting.id); // Store the meeting number
//                 console.log('Using Meeting Number:', firstMeeting.id);
//             } else {
//                 console.error('No meetings found');
//             }
//         } catch (error) {
//             console.error('Error fetching meeting id from backend:', error);
//         }
//     };
//
//     const startMeeting = async (signature) => {
//         if (!signature) {
//             console.error('Invalid signature');
//             return;
//         }
//
//         const meetingSDKElement = document.getElementById("meetingSDKElement");
//
//         try {
//             await client.init({
//                 zoomAppRoot: meetingSDKElement,
//                 language: "en-US",
//                 patchJsMedia: true,
//                 leaveOnPageUnload: true,
//             })
//             await client.join({
//                 signature: signature,
//                 sdkKey: sdkKey,
//                 meetingNumber: meetingNumber,
//                 password: passWord,
//                 userName: userName,
//                 userEmail: userEmail,
//                 tk: registrantToken,
//                 zak: zakToken,
//             })
//             console.log("joined successfully");
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     useEffect(() => {
//         const initiateMeeting = async () => {
//             // await fetchMeetingId()
//
//             const signature = await fetchSignature();
//             if (signature) {
//                 setSignature(signature);
//                 startMeeting(signature);
//             }
//         };
//         initiateMeeting();
//     }, []); // Run only on component mount
//
//     return (
//         <div>
//             <div id="meetingSDKElement">
//                 {/* Zoom Meeting SDK Component View Rendered Here */}
//             </div>
//         </div>
//     );
// };
//
// export default ZoomVideoComponent;
import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import React, {useState} from "react";

const Basics = () => {
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected(); // Store the user's connection status
    const [appId, setAppId] = useState("");  // Replace with your Agora App ID
    const [channel, setChannel] = useState("");  // The channel name you want to join
    const [token, setToken] = useState("");  // If using secured mode, input the token

    useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);

    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const {localMicrophoneTrack} = useLocalMicrophoneTrack(micOn);
    const {localCameraTrack} = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);

    const remoteUsers = useRemoteUsers();

    return (
        <>
            <div className="room mt-28">
                {isConnected ? (
                    <div className="user-list">
                        <div className="user">
                            <LocalUser
                                audioTrack={localMicrophoneTrack}
                                cameraOn={cameraOn}
                                micOn={micOn}
                                videoTrack={localCameraTrack}
                                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                            >
                                <samp className="user-name">You</samp>
                            </LocalUser>
                        </div>
                        {remoteUsers.map((user) => (
                            <div className="user" key={user.uid}>
                                <RemoteUser
                                    cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                    user={user}>
                                    <samp className="user-name">{user.uid}</samp>
                                </RemoteUser>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="join-room">
                        <input
                            onChange={e => setAppId(e.target.value)}
                            placeholder="<Your app ID>"
                            value={appId}
                        />
                        <input
                            onChange={e => setChannel(e.target.value)}
                            placeholder="<Your channel Name>"
                            value={channel}
                        />
                        <input
                            onChange={e => setToken(e.target.value)}
                            placeholder="<Your token (optional)>"
                            value={token}
                        />

                        <button
                            className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
                            disabled={!appId || !channel}
                            onClick={() => setCalling(true)}
                        >
                            <span>Join Channel</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Basics;