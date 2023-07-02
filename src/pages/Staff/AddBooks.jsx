import React, { useState } from "react";
import {
  isString,
  isNotEmpty,
  length,
  isArray,
  isNumber,
} from "class-validator";
import api from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    // category: "",
    // flashSale: "",
    author: "",
    title: "",
    images: [],
    price: 0,
    quantity: 0,
    buyQuantity: 0,
    publisher: "",
    supplier: "",
    imageFile: null,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const selectedFile = files[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      const base64 = await convertToBase64(selectedFile);
      setBookData((prevData) => ({
        ...prevData,
        images: [base64],
      }));

      setImageUrl(fileUrl);
    } else {
      setBookData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = await validateBookData(bookData);
    if (validationResult.isValid) {
      try {
        const response = await api.post(
          "http://localhost:8080/book/add",
          bookData
        );
        setSuccessAlertOpen(true);
        setBookData({
          // category: "",
          // flashSale: "",
          author: "",
          title: "",
          images: [],
          price: 0,
          quantity: 0,
          buyQuantity: 0,
          publisher: "",
          supplier: "",
          imageFile: null,
        });

        setImageUrl("");
        toast.success("Thêm sách thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(validationResult.errors);
    }
  };

  const validateBookData = async (data) => {
    const validationErrors = [];
    if (
      !isString(data.title) ||
      !isNotEmpty(data.title) ||
      !length(data.title, 1, 100)
    ) {
      validationErrors.push("Invalid title");
    }
    if (!isString(data.author)) {
      validationErrors.push("Invalid author");
    }
    if (!isArray(data.images) || !isNotEmpty(data.images)) {
      validationErrors.push("Invalid images");
    }
    // if (!isNumber(data.price) || !isNotEmpty(data.price)) {
    //   validationErrors.push("Invalid price");
    // }
    if (!isString(data.publisher)) {
      validationErrors.push("Invalid publisher");
    }
    if (!isString(data.supplier)) {
      validationErrors.push("Invalid supplier");
    }
    if (!isNumber(data.buyQuantity)) {
      validationErrors.push("Invalid buy quantity");
    }
    // if (!isNumber(data.quantity) || !isNotEmpty(data.quantity)) {
    //   validationErrors.push("Invalid quantity");
    // }

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Thêm sách</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Hình ảnh
            </label>
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Selected Image" className="max-h-40" />
            </div>
          )}
          <div>
            {/* <label className="block mb-2 text-sm font-medium text-gray-700">
              Thể loại
            </label>
            <select
              name="category"
              value={bookData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Chọn thể loại</option>
              <option value="fiction">Hư cấu</option>
              <option value="non-fiction">Phi hư cấu</option>
            </select> */}
          </div>
          {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Flash Sale
            </label>
            <input
              type="text"
              name="flashSale"
              value={bookData.flashSale}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div> */}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tác giả
            </label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tên sách
            </label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Giá tiền
            </label>
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              value={bookData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              min={0}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nhà xuất bản
            </label>
            <input
              type="text"
              name="publisher"
              value={bookData.publisher}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nhà cung cấp
            </label>
            <input
              type="text"
              name="supplier"
              value={bookData.supplier}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Thêm sách
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBookForm;
