"use client";

import { IAddress } from "@/interfaces/dataInterfaces";
import api from "@/lib/axios";
import { AddressSchema } from "@/schemas/addressSchema";
import useAuthStore from "@/stores/useAuthStore";
import { useFormik } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddressCheckoutModal = ({
  isOpen,
  onSave,
  onSelect,
  onClose,
  address,
}: {
  isOpen: boolean;
  onSave: () => void;
  onSelect: (address: IAddress) => void;
  onClose: () => void;
  address: IAddress | null;
}) => {
  const { user } = useAuthStore();

  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [subDistricts, setSubDistricts] = useState<
    { id: string; name: string }[]
  >([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // eslint-disable-next-line
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  // --- CHANGE 1: Add state and useEffect for the animation ---
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (address) {
      setSelectedProvince(address.province);
      setSelectedCity(address.city);
      setSelectedDistrict(address.district);
      setSelectedSubDistrict(address.subdistrict);
    }
  }, [address]);

  useEffect(() => {
    if (isOpen) {
      // Use a tiny timeout to let the element render before starting the transition
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await api.get(`/api/provinces`);
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await api.get(`/api/cities/${selectedProvince}`);
          setCities(response.data.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [selectedProvince]); // Dependency array with selectedProvince

  useEffect(() => {
    if (selectedCity) {
      const fetchDistricts = async () => {
        try {
          const response = await api.get(
            `/api/districts?province=${selectedProvince}&city=${selectedCity}`
          );
          setDistricts(response.data.data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedCity, selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchSubDistricts = async () => {
        try {
          const response = await api.get(
            `/api/sub-districts?province=${selectedProvince}&city=${selectedCity}&district=${selectedDistrict}`
          );
          setSubDistricts(response.data.data);
        } catch (error) {
          console.error("Error fetching subdistricts:", error);
        }
      };

      fetchSubDistricts();
    }
  }, [selectedCity, selectedProvince, selectedDistrict]); // Dependency array with selectedCity and selectedProvince

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: AddressSchema,
    initialValues: address || {
      receiver: "",
      street: "",
      subdistrict: "",
      district: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
    },
    onSubmit: async (values) => {
      try {
        if (address) {
          const response = await api.put(
            `/api/addresses/${address.id}`,
            values
          );
          onSelect(response.data.data);
          toast.success("Alamat berhasil diedit!");
        } else {
          const response = await api.post(`/api/addresses`, {
            ...values,
            userId: user.id,
          });
          onSelect(response.data.data);
          toast.success("Alamat baru berhasil ditambahkan!");
        }

        onSave();
        onClose();
      } catch (err) {
        console.error("Error adding new address: " + err);
        toast.error("Gagal memproses alamat");
      }
    },
  });

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = event.target.value;
    const province = provinces.find((p) => p.name === selectedName);
    if (province) setSelectedProvince(province.name);
    formik.setFieldValue("province", province?.name || "");
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const city = cities.find((c) => c.name === selectedName);
    if (city) setSelectedCity(city.name);
    formik.setFieldValue("city", city?.name || "");
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = event.target.value;
    const district = districts.find((d) => d.name === selectedName);
    if (district) setSelectedDistrict(district.name);
    formik.setFieldValue("district", district?.name || "");
  };

  const handleSubDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = event.target.value;
    const subdistrict = subDistricts.find((s) => s.name === selectedName);
    if (subdistrict) setSelectedSubDistrict(subdistrict.name);
    formik.setFieldValue("subdistrict", subdistrict?.name || "");
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl text-blue-500 font-semibold">
            {address ? "Edit Alamat" : "Tambah Alamat Baru"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            {/* Form fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="receiver"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Penerima
                </label>
                <input
                  type="text"
                  id="receiver"
                  {...formik.getFieldProps("receiver")}
                  className="mt-1 px-2 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.receiver && formik.errors.receiver ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.receiver}
                  </div>
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat Lengkap
                </label>
                <textarea
                  id="street"
                  {...formik.getFieldProps("street")}
                  rows={3}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                {formik.touched.street && formik.errors.street ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.street}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  id="phone"
                  {...formik.getFieldProps("phone")}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700"
                >
                  Provinsi
                </label>
                <select
                  id="province"
                  {...formik.getFieldProps("province")}
                  onChange={handleProvinceChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {formik.touched.province && formik.errors.province ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.province}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kota/Kabupaten
                </label>
                <select
                  id="city"
                  {...formik.getFieldProps("city")}
                  onChange={handleCityChange}
                  disabled={!formik.values.province}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Pilih Kota</option>
                  {formik.values.province &&
                    cities.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kecamatan
                </label>
                <select
                  id="district"
                  {...formik.getFieldProps("district")}
                  onChange={handleDistrictChange}
                  disabled={!formik.values.city}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Pilih Kecamatan</option>
                  {formik.values.city &&
                    districts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                </select>
                {formik.touched.district && formik.errors.district ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.district}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700"
                >
                  Desa
                </label>
                <select
                  id="subdistrict"
                  {...formik.getFieldProps("subdistrict")}
                  onChange={handleSubDistrictChange}
                  disabled={!formik.values.district}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Pilih Desa</option>
                  {formik.values.district &&
                    subDistricts.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                </select>
                {formik.touched.subdistrict && formik.errors.subdistrict ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.subdistrict}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kode Pos
                </label>
                <input
                  type="text"
                  id="postalCode"
                  {...formik.getFieldProps("postalCode")}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.postalCode && formik.errors.postalCode ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.postalCode}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onClose()}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Batal
              </button>
              {address ? (
                <button
                  type="submit"
                  className="w-40 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {formik.isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    "Ubah Alamat"
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-40 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {formik.isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    "Tambah Alamat"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressCheckoutModal;
