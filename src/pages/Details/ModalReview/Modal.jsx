import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import RatingStar from "../../../utils/ratingStar";

const Modal = () => {
  let styles = `m-auto flex justify-center text-center text-rose-600 border-rose-600 border-2 p-2 w-[200px] rounded-lg`;
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles}>
          <PencilSquareIcon className="h-5 w-5" />
          <span className="text-rose-600 font-medium">Viết đánh giá</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] h-[50vh] w-[150vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium text-center">
            Viết đánh giá sản phẩm
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal flex  justify-center">
            <RatingStar className={"cursor-pointer"} trigger={1} />
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              placeholder="Nhập tên bạn muốn hiển thị khi đánh giá"
            />
          </fieldset>
          <fieldset className="mb-[15px] gap-5">
            <textarea
              className="text-violet11 shadow-violet7 focus:shadow-violet8  h-[120px] w-full flex-1 rounded-[4px] px-[10px] text-[15px] py-2 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="comment"
              placeholder="Viết nhận xét của bạn về sản phẩm"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none ">
                Gửi nhận xét
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
