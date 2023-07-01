import { useGetProfileQuery } from "../api/api";

export const Roles = async () => {
  const idUser = JSON.parse(localStorage.getItem("idUser"));
  const { data, isSuccess } = useGetProfileQuery(idUser);
  if (isSuccess) console.log(data);
};
