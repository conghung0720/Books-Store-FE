import React, { useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DropdownMenuDemo = (props) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  const profile = useSelector((state) => state.profile);

  const Logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("idCart");
    window.location.href = "/login";
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center  outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <ChevronDownIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.CheckboxItem
            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <img
              src={props.avatar}
              className="h-[30px] w-[30px] rounded-[50%]"
            />
            <span className="ml-3">{profile.infoUser.fullName}</span>
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
            Cài đặt
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <Link to="/info">
              <DropdownMenu.RadioItem
                className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 cursor-pointer"
                value="pedro"
              >
                Thông tin
              </DropdownMenu.RadioItem>
            </Link>
            <Link to="/history-orders">
              <DropdownMenu.RadioItem
                className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 cursor-pointer"
                value="pedro"
              >
                Lịch sử đơn hàng
              </DropdownMenu.RadioItem>
            </Link>
            <DropdownMenu.RadioItem
              onClick={Logout}
              className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 cursor-pointer"
            >
              Đăng Xuất
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
