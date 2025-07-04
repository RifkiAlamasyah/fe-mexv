import React, { useState } from "react";
import Template from "../../components/Template";
import axios from "axios";
import FlashMessage from "../../components/atoms/FlashMessage";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setFlashMessage, clearFlashMessage } from "../../store/slices/utilitySlice";
import Swal from 'sweetalert2';

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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  const flashMessage = useSelector(state => state.utility.flashMessage);

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

    if (value.trim() === "") {
      newErrors[name] = "Field Wajib diisi";
    } else {
      delete newErrors[name];
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

    if (password !== confirmPassword && confirmPassword !== "") {
      newErrors.password = "Password dan Confirm Password tidak sama!";
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const showConfirmation = () => {
    Swal.fire({
      title: 'Konfirmasi Pendaftaran',
      text: "Apakah data yang Anda masukkan sudah benar?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, daftarkan!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
      }
    });
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

      Swal.fire({
        title: 'Pendaftaran Berhasil!',
        text: res.message || 'Silahkan lakukan login',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        dispatch(setFlashMessage({ 
          title: "Selamat Data Berhasil di Daftarkan", 
          subTitle: "Silahkan Lakukan Login", 
          type: "success" 
        }));
        setTimeout(() => dispatch(clearFlashMessage()), 5000);
        navigate("/login");
      });

    } catch (error) {
      Swal.fire({
        title: 'Pendaftaran Gagal!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menghubungi server',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      
      dispatch(setFlashMessage({
        title: "Gagal Melakukan Pendaftaran", 
        subTitle: "Silahkan Chek kembali data-data anda", 
        type: "error"
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => dispatch(clearFlashMessage()), 5000);
      
      if (error.response?.data?.data) {
        setErrors(error.response.data.data);
      }
    }
  };

  return (
    <Template>
      <div className="px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
        {flashMessage.type && (
          <FlashMessage
            title={flashMessage.title}
            subTitle={flashMessage.subTitle}
            type={flashMessage.type}
          />
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <h1 className="text-center">Gambar disini</h1>
          <section className="bg-white dark:bg-gray-900 rounded p-5">
            <div className="px-6 py-8 mx-auto">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4 text-center">
               Create an account 
              </h1>
              <form onSubmit={(e) => e.preventDefault()}>
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
                    maxLength={12}
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
                          showConfirmation();
                        }
                      }}
                      className={`w-50 px-5 py-3 rounded-md ${
                        Object.keys(errors).length === 0 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-400 text-black cursor-not-allowed'
                      }`}
                      disabled={Object.keys(errors).length > 0}
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