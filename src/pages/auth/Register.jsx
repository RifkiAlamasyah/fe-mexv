import React, { useState } from "react";
import Template from "../../components/Template";
import axios from "axios";
import ModalConfirmation from "../../components/atoms/ModalConfirmation";
import ModalAfterConfirmation from "../../components/atoms/ModalAfterConfirmation";
import { NavLink, useNavigate } from "react-router-dom"; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    telp: "",
    alamat: "",
    jenis_kelamin: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [state, setState] = useState({
    modal_message: "",
    isModalConfirmOpen: false,
    isModalAfterConfirmOpen: false,
    resultMessage: "",
    resultStatus: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    // Validasi umum: jika value kosong, beri error
      if (value.trim() === "") {
        newErrors[name] = "Field Wajib diisi";
      } else {
        delete newErrors[name]; // hapus error kalau sudah diisi
      }

    if (name === "telp") {
      if (!/^\d{10,12}$/.test(value)) {
        newErrors.telp = "Nomor telepon harus 10-12 digit angka";
      } else {
        delete newErrors.telp;
      }
    }

    const password = name === "password" ? value : formData.password;
    const confirmPassword = name === "confirmPassword" ? value : formData.confirmPassword;
    console.log(password)

    if (password !== confirmPassword && confirmPassword !== "") {
      newErrors.password = "Password dan Confirm Password tidak sama!";
      console.log(newErrors)
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    const payload = {
      nama: formData.nama,
      telp: formData.telp,
      alamat: formData.alamat,
      jenis_kelamin: formData.jenis_kelamin,
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.post("http://localhost:6960/api/register", payload);
      const res = response.data;

      setState((prev) => ({
        ...prev,
        isModalAfterConfirmOpen: true,
        resultStatus: res.status,
        resultMessage: res.message,
        isModalConfirmOpen: false,
      }));
      //saya ingin menyampaikan selamat user berhasil di daftar kan seperti flash message .. buat di halaman login nya 

      navigate("/login");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isModalAfterConfirmOpen: true,
        resultStatus: "error",
        resultMessage: "Terjadi kesalahan saat menghubungi server.",
        isModalConfirmOpen: false,
      }));
      setErrors(error.response.data.data)
    }
  };

  return (
    <Template>
      <ModalConfirmation
        isOpen={state.isModalConfirmOpen}
        onClose={() => setState({ ...state, isModalConfirmOpen: false })}
        onConfirm={handleSubmit}
        message={state.modal_message}
      />
      <ModalAfterConfirmation
        isOpen={state.isModalAfterConfirmOpen}
        onClose={() => setState({ ...state, isModalAfterConfirmOpen: false })}
        status={state.resultStatus}
        message={state.resultMessage}
      />
      <div className="px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
        <div className="grid grid-cols-2 gap-4">
          <h1 className="text-center">Gambar disini</h1>
          <section className="bg-white dark:bg-gray-900 rounded p-5">
            <div className="px-6 py-8 mx-auto">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4 text-center">
               Create an account 
              </h1>
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama
                  </label>
                  <input
                    type="nama"
                    name="nama"
                    id="nama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukan Nama"
                    required=""
                    value={formData.nama}
                    onChange={handlechange}
                  />
                    <p className="text-sm text-red-600 mt-1">{errors.nama || ""}</p>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="telp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    No. Telepon
                  </label>
                  <input
                    type="telp"
                    name="telp"
                    id="telp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukan No Telepon"
                    required=""
                    value={formData.telp}
                    onChange={handlechange}
                  />
                    <p className="text-sm text-red-600 mt-1">{errors.telp || ""}</p>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alamat"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Alamat
                  </label>
                  <input
                    type="alamat"
                    name="alamat"
                    id="alamat"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukan Alamat"
                    required=""
                    value={formData.alamat}
                    onChange={handlechange}
                  />
                    <p className="text-sm text-red-600 mt-1">{errors.alamat || ""}</p>
                </div>
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Jenis Kelamin
                  </label>
                  <div className="flex items-center">
                    <label className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        value="Laki-laki"
                        checked={formData.jenis_kelamin == "Laki-laki"}
                        onChange={handlechange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Laki-laki
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        value="Perempuan"
                        checked={formData.jenis_kelamin == "Perempuan"}
                        onChange={handlechange}
                        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Perempuan
                      </span>
                    </label>
                  </div>
                     <p className="text-sm text-red-600 mt-1">{errors.jenis_kelamin || ""}</p>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukan Username"
                    required=""
                    value={formData.username}
                    onChange={handlechange}
                  />
                    <p className="text-sm text-red-600 mt-1">{errors.username || ""}</p>
                </div>
                <div className="mb-3">
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
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formData.password}
                    onChange={handlechange}
                  />
                  <p className="text-sm text-red-600 mt-1">{errors.password || ""}</p>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formData.confirmPassword}
                    onChange={handlechange}
                  />
                    {touched.confirmPassword && errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>
                <div className="flex items-start mb-3">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className="mb-3 w-full">
                  <div className="text-center mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (Object.keys(errors).length === 0) {
                          setState({
                            ...state,
                            modal_message: "Apa kamu yakin data ini sudah benar?",
                            isModalConfirmOpen: true,
                          });
                        }
                      }}
                      className="w-50 px-5 py-3 rounded-md text-white bg-blue-600"
                    >
                      Create an account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </Template>
  );
};

export default Register;
