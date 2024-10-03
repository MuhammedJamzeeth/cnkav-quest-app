import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {QueryClient, QueryClientProvider} from 'react-query';
import AgoraRTC, {AgoraRTCProvider} from "agora-rtc-react";

const queryClient = new QueryClient();

// In video call, set mode to "rtc"
const client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <AgoraRTCProvider client={client}>
            <App/>
        </AgoraRTCProvider>
    </QueryClientProvider>
);
