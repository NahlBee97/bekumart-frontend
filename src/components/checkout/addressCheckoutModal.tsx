"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { IAddress, ILocation } from "@/interfaces/dataInterfaces";
import { AddressSchema } from "@/schemas/addressSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { TextInputField } from "../formFields/textInputField";
import { SelectField } from "../formFields/selectField";
import { TinyCommonButton } from "../buttons/tinyCommonButton";
import { SubmitButton } from "../buttons/submitButton";

export const AddressCheckoutModal = ({
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

  const [provinces, setProvinces] = useState<ILocation[]>([]);
  const [cities, setCities] = useState<ILocation[]>([]);
  const [districts, setDistricts] = useState<ILocation[]>([]);
  const [subDistricts, setSubDistricts] = useState<ILocation[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // eslint-disable-next-line
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

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

  const handleProvinceChange = (selectedName: string) => {
    const province = provinces.find((p) => p.name === selectedName);
    if (province) setSelectedProvince(province.name);
    formik.setFieldValue("province", province?.name || "");
  };

  const handleCityChange = (selectedName: string) => {
    const city = cities.find((c) => c.name === selectedName);
    if (city) setSelectedCity(city.name);
    formik.setFieldValue("city", city?.name || "");
  };

  const handleDistrictChange = (selectedName: string) => {
    const district = districts.find((d) => d.name === selectedName);
    if (district) setSelectedDistrict(district.name);
    formik.setFieldValue("district", district?.name || "");
  };

  const handleSubDistrictChange = (selectedName: string) => {
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
                <TextInputField
                  formik={formik}
                  type="text"
                  withLabel={true}
                  label="Nama Penerima"
                  fieldName="receiver"
                  placeHolder=""
                />
              </div>
              <div className="col-span-2">
                <TextInputField
                  formik={formik}
                  type="text"
                  withLabel={true}
                  label="ALamat Lengkap"
                  fieldName="street"
                  placeHolder=""
                />
              </div>

              <div>
                <SelectField
                  formik={formik}
                  items={provinces}
                  fieldName="province"
                  label="Provinsi"
                  onItemChange={handleProvinceChange}
                />
              </div>
              <div>
                <SelectField
                  formik={formik}
                  items={cities}
                  fieldName="city"
                  label="Kota/Kabupaten"
                  onItemChange={handleCityChange}
                />
              </div>
              <div>
                <SelectField
                  formik={formik}
                  items={districts}
                  fieldName="district"
                  label="Kecamatan"
                  onItemChange={handleDistrictChange}
                />
              </div>
              <div>
                <SelectField
                  formik={formik}
                  items={subDistricts}
                  fieldName="subdistrict"
                  label="Desa"
                  onItemChange={handleSubDistrictChange}
                />
              </div>
              <div>
                <TextInputField
                  formik={formik}
                  type="text"
                  withLabel={true}
                  label="Nomor Telepon"
                  fieldName="phone"
                  placeHolder=""
                />
              </div>
              <div>
                <TextInputField
                  formik={formik}
                  type="text"
                  withLabel={true}
                  label="Kode Pos"
                  fieldName="postalCode"
                  placeHolder=""
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <TinyCommonButton
                onClick={() => onClose()}
                buttonText="Batal"
                isPositive={false}
              />
              {address ? (
                <SubmitButton formik={formik} buttonText="Ubah Alamat" />
              ) : (
                <SubmitButton formik={formik} buttonText="Tambah Alamat" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

