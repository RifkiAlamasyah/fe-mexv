import React, { useState, useEffect } from "react";
import axios from "axios";
import Template from "../../components/Template";
import { NavLink, useNavigate } from "react-router-dom"; 
import FlashMessage from "../../components/atoms/FlashMessage";
import { useDispatch, useSelector } from "react-redux";
import { setFlashMessage, clearFlashMessage } from "../../store/slices/utilitySlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[message, setMessage] = useState("");
  const flashMessage = useSelector(state => state.utility.flashMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

useEffect(() => {
    if (flashMessage.type !== "") {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const timer = setTimeout(() => {
        dispatch(clearFlashMessage());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flashMessage, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:6960/api/login", {
        username,
        password,
      });
      setMessage(response.data.message); // Tampilkan pesan sukses
      sessionStorage.setItem("token", response.data.token); // Simpan token ke localStorage
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Terjadi kesalahan saat login"
      );
    }
  };
  return (
    <Template>
      <div className="px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
          {flashMessage.type !== "" && (
            <FlashMessage
              title ={flashMessage.title}
              subTitle = {flashMessage.subTitle}
              type = {flashMessage.type}
            />
          )
        }
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 border border-2 rounded m-auto bg-gray-700">
            {/* <img src="./public/img/banner/login.jpeg" alt="" width={500}/> */}
            Gambar Disini
          </div>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <p className="text-red-600">{message}</p>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <a
                        href="/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Template>
  );
};

export default Login;
