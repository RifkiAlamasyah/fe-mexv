import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Template from "../../components/Template";
import Swal from 'sweetalert2';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [detail, setDetail] = useState({});
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "male",
    photo_profile: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const response = await api.get("/api/get-profile");
          const data = response.data.data;
          setProfile({
            name: data.nama || "",
            email: data.email || "",
            address: data.alamat || "",
            phone: data.telp || "",
            gender: data.jenis_kelamin || "",
            photo_profile: data.photo_profile || "https://via.placeholder.com/150"
          });
          setDetail({
            name: data.nama || "",
            email: data.email || "",
            address: data.alamat || "",
            phone: data.telp || "",
            gender: data.jenis_kelamin || "",
            photo_profile: data.photo_profile || "https://via.placeholder.com/150"
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Nama harus diisi";
    if (!profile.email) newErrors.email = "Email harus diisi";
    else if (!/\S+@\S+\.\S+/.test(profile.email))
      newErrors.email = "Email tidak valid";
    if (!profile.phone) newErrors.phone = "Nomor telepon harus diisi";
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword)
      newErrors.currentPassword = "Password saat ini harus diisi";
    if (!passwordData.newPassword)
      newErrors.newPassword = "Password baru harus diisi";
    else if (passwordData.newPassword.length < 6)
      newErrors.newPassword = "Password minimal 6 karakter";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      newErrors.confirmPassword = "Password tidak cocok";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await Swal.fire({
      title: 'Apa Anda yakin?',
      text: "Pastikan data data anda sudah sesuai",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Update data!'
    });

    if (!result.isConfirmed) {
      return;
    }

    const profileErrors = validateProfile();
    if (Object.keys(profileErrors).length > 0) {
      setErrors(profileErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nama", profile.name);
      formData.append("email", profile.email);
      formData.append("alamat", profile.address);
      formData.append("telp", profile.phone);
      formData.append("jenis_kelamin", profile.gender);
      if (selectedFile) {
        formData.append("gambar_user", selectedFile);
      }

      const response = await api.put("/api/update-profile", formData);

      setSuccessMessage("Profil berhasil diperbarui");
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewImage("");
      
      // Update profile photo in state if new one was uploaded
      if (response.data.data.photo_profile) {
        setProfile(prev => ({
          ...prev,
          photo_profile: response.data.data.photo_profile
        }));
        setDetail(prev => ({
          ...prev,
          photo_profile: response.data.data.photo_profile
        }));
      }

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: error.response?.data?.desc || "Gagal memperbarui profil" });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword();
    
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    try {
      await api.post("/api/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccessMessage("Password berhasil diubah");
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({ submit: error.response?.data?.desc || "Gagal mengubah password" });
    }
  };

  const cancelEdit = () => {
    setProfile(detail);
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewImage("");
  };

  return (
    <Template>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
           <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <svg className="flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-lg font-medium">Kembali</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-indigo-600 px-6 py-8 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    className="h-24 w-24 rounded-full object-cover border-4 border-white"
                    src={previewImage || profile.photo_profile}
                    alt="Profile"
                  />
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        onClick={triggerFileInput}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-white">{detail.name || "Nama Pengguna"}</h1>
              <p className="text-indigo-100">{detail.email || "user@example.com"}</p>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-6">
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  {successMessage}
                </div>
              )}

              {errors.submit && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {errors.submit}
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Informasi Profil</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profil
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>

              <form>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Name */}
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={profile.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.name || "-"}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.email || "-"}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Nomor Telepon
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.phone || "-"}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="sm:col-span-3">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Jenis Kelamin
                    </label>
                    {isEditing ? (
                      <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.gender === "male" ? "Laki-laki" : "Perempuan"}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Alamat
                    </label>
                    {isEditing ? (
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={profile.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.address || "-"}</p>
                    )}
                  </div>
                </div>
              </form>

              {/* Change Password Section */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Ubah Password</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Pastikan menggunakan password yang kuat dan unik.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {showChangePassword ? "Tutup" : "Ubah Password"}
                  </button>
                </div>

                {showChangePassword && (
                  <form onSubmit={handlePasswordSubmit} className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Password Saat Ini
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="sm:col-span-6 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Simpan Password
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default ProfileSettings;