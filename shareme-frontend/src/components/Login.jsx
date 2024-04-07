import { useGoogleLogin } from "@react-oauth/google"; //For custom button
import { FcGoogle } from "react-icons/fc"; //For custom button

// import { jwtDecode } from "jwt-decode"; // For google default button
// import { GoogleLogin } from "@react-oauth/google"; // For google default button

// * OTHER IMPORTS
import { useNavigate } from "react-router-dom";
import logo from "../assets/logowhite.png";
import share from "../assets/share.mp4";

const Login = () => {
  const navigate = useNavigate();

  // * FOR CUSTOM GOOGLE LOGIN BUTTON
  const signIn = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        if (res.ok) {
          const userInfo = await res.json();
          console.log(userInfo);
          navigate("/");
        } else {
          throw new Error("Failed to fetch user information");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={share}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img
              src={logo}
              alt="logo"
              width="130px"
            />
          </div>

          <div className="shadow-2xl ">
            {/* CUSTOM GOOGLE LOGIN BUTTON */}
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg outline-none"
              onClick={signIn}>
              <FcGoogle className="mr-4" />{" "}
              <span className="font-bold">Sign In with Google</span>
            </button>

            {/* GOOGLE LOGIN BUTTON */}
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                const response = jwtDecode(credentialResponse.credential);
                console.log(response);
                navigate("/");
              }}
              onError={(error) => {
                console.log(error);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
