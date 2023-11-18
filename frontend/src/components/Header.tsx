import { TvIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { useQueryClient } from "@tanstack/react-query";

export const Header: React.FC = () => {
  const { logoutMutation } = useMutateAuth();
  const queryClient = useQueryClient();
  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries(["tasks"]);
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-10 shadow h-16 px-4 flex justify-between items-center">
      <div className="flex items-center my-3 text-gray-600 font-mono">
        <TvIcon className="h-14 w-14 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">TverClip</span>
      </div>
      <div className="flex space-x-4 items-center">
        <ArrowRightOnRectangleIcon
          onClick={logout}
          className="h-12 w-12 my-2 text-blue-500 cursor-pointer"
        />
      </div>
    </header>
  );
};
