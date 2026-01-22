import React, { useState } from "react";
import Template from "../../components/Template";
import axios from "axios";
import FlashMessage from "../../components/atoms/FlashMessage";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setFlashMessage, clearFlashMessage } from "../../store/slices/utilitySlice";
import Swal from 'sweetalert2';
import Loading from "../../components/atoms/Loading";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    telp: "",
    alamat: "",
    jenis_kelamin: "",
    username: "",
    password: "",
    confirmPassword: "",
    email : ""
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
      email: formData.email,
    };

    try {
      setLoading(true);

      const response = await api.post(
        "/api/register",
        payload
      );

      const res = response.data;

      Swal.fire({
        title: "Pendaftaran Berhasil!",
        text: res.message || "Silahkan lakukan login",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        dispatch(
          setFlashMessage({
            title: "Selamat Data Berhasil di Daftarkan",
            subTitle: "Silahkan Lakukan Login",
            type: "success",
          })
        );

        setTimeout(() => dispatch(clearFlashMessage()), 5000);
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        title: "Pendaftaran Gagal!",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menghubungi server",
        icon: "error",
        confirmButtonText: "OK",
      });

      dispatch(
        setFlashMessage({
          title: "Gagal Melakukan Pendaftaran",
          subTitle: "Silahkan Chek kembali data-data anda",
          type: "error",
        })
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => dispatch(clearFlashMessage()), 5000);

      if (error.response?.data?.data) {
        setErrors(error.response.data.data);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
 <Template>
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-4 py-8">

    {flashMessage.type && (
      <FlashMessage
        title={flashMessage.title}
        subTitle={flashMessage.subTitle}
        type={flashMessage.type}
      />
    )}

    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 text-white">
        <h1 className="text-2xl font-bold">Gambar di sini</h1>
      </div>

      {/* FORM */}
      <section className="p-6 sm:p-10 flex justify-center">
        <div className="w-full max-w-md">

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an account
          </h1>

          <form onSubmit={(e) => e.preventDefault()}>

            {/* NAMA */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handlechange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-red-600 mt-1">{errors.nama}</p>
            </div>

            {/* TELP */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                No. Telepon
              </label>
              <input
                type="text"
                name="telp"
                value={formData.telp}
                onChange={handlechange}
                maxLength={12}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-red-600 mt-1">{errors.telp}</p>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handlechange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            </div>

            {/* ALAMAT */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Alamat
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handlechange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-red-600 mt-1">{errors.alamat}</p>
            </div>

            {/* GENDER */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Jenis Kelamin
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value="Laki-laki"
                    checked={formData.jenis_kelamin === "Laki-laki"}
                    onChange={handlechange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  Laki-laki
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value="Perempuan"
                    checked={formData.jenis_kelamin === "Perempuan"}
                    onChange={handlechange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  Perempuan
                </label>
              </div>
              <p className="text-sm text-red-600 mt-1">
                {errors.jenis_kelamin}
              </p>
            </div>

            {/* USERNAME */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handlechange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-red-600 mt-1">{errors.username}</p>
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handlechange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            </div>

            {/* CONFIRM */}
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlechange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {touched.confirmPassword && errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="button"
              onClick={() => Object.keys(errors).length === 0 && showConfirmation()}
              disabled={Object.keys(errors).length > 0}
              className={`w-full py-3 rounded-lg font-medium transition
                ${
                  Object.keys(errors).length === 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              Create an account
            </button>

          </form>
        </div>
      </section>
    </div>

    <Loading show={loading} />
  </div>
  </Template>

  );
};

export default Register;