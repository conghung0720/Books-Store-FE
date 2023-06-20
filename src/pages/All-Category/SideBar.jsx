import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import CheckBox from "../../components/CheckBox/CheckBox";
import { useSearchParams } from "react-router-dom";

const categories = [
  { id: 1, name: "Thiếu Nhi" },
  { id: 2, name: "Giáo Khoa - Tham Khảo" },
  { id: 3, name: "Văn Học" },
  { id: 4, name: "Tâm Lý - Kỹ Năng Sống" },
  { id: 5, name: "Manga - Comic" },
  { id: 6, name: "Sách Học Ngoại Ngữ" },
  { id: 7, name: "Kinh Tế" },
  { id: 8, name: "Khoa Học Kỹ Thuật" },
  { id: 9, name: "Lịch Sử - Địa Lý - Tôn Giáo" },
  { id: 10, name: "Nuôi Dạy Con" },
  { id: 11, name: "Chính Trị - Pháp Lý - Triết Học" },
  { id: 12, name: "Tiểu Sử Hồi Ký" },
  { id: 13, name: "Nữ Công Gia Chánh" },
  { id: 14, name: "Văn Hóa - Nghệ Thuật - Du Lịch" },
  { id: 15, name: "Đam Mỹ" },
  { id: 16, name: "Phong Thủy - Kinh Dịch" },
  { id: 17, name: "Từ Điển" },
];

const SideBar = () => {
  const [isValueTags, setIsValueTags] = useState([]);
  const [isSearchParams, setIsSearchParams] = useSearchParams();
  //   const getAllParams = GetParamsSearch();

  const handleTagsParams = (event) => {
    const value = String(event.currentTarget.value);
    if (!isValueTags?.includes(value)) {
      setIsValueTags([...isValueTags, value]);
    }
    if (isValueTags?.includes(value)) {
      const checkIndex = isValueTags?.findIndex((val) => value === val);
      const removeValue = isValueTags?.filter(
        (value) => value !== isValueTags[checkIndex]
      );
      setIsValueTags([...removeValue]);
    }
  };

  //   useEffect(() => {
  //     getAllParams["tags"] = isValueTags?.join("+") || "";
  //     setIsSearchParams(getAllParams);
  //   }, [isSearchParams, isValueTags]);

  return (
    <>
      <div className="border-blue-600 border-2 w-[300px] h-screen ml-[1%] p-2">
        {/* <div className="mt-4 mb-2 flex justify-between border-red-600 border-2">
          <span>Tags</span>
          <ChevronDownIcon className="h-6 w-6 mr-[-3%] transition duration-400 ease-in-out cursor-pointer hover:rotate-180 " />
        </div> */}
        <div className="">
          <ul className="space-y-2 flex flex-wrap lg:block">
            {categories.map((val, index) => (
              <li className="w-[33%] h-[10%] lg:w-full">
                <CheckBox onChange={handleTagsParams} value={index}>
                  {val.name}
                </CheckBox>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
