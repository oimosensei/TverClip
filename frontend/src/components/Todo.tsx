import { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  PlusCircleIcon,
  TvIcon,
} from "@heroicons/react/24/solid";
import useStore from "../store";
import { useState, useEffect } from "react";
import { useQueryTasks } from "../hooks/useQueryTasks";
import { useMutateTask } from "../hooks/useMutateTask";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { User } from "../types";
import { useUser } from "../contexts/UserContext";
import { TaskItem } from "./TaskItem";
import { CreateOrUpdateTaskModal } from "./CreateTaskModal";
import { Header } from "./Header";

export const Todo = () => {
  const queryClient = useQueryClient();
  const { editedTask } = useStore();
  const updateTask = useStore((state) => state.updateEditedTask);
  const { data, isLoading } = useQueryTasks();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  const { logoutMutation, getUserMutation } = useMutateAuth();
  const { user } = useUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const resetEditedTask = useStore((state) => state.resetEditedTask);
  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === 0)
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description,
        url: editedTask.url,
      });
    else {
      updateTaskMutation.mutate(editedTask);
    }
  };
  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries(["tasks"]);
  };
  useEffect(() => {
    getUserMutation.mutate();
  }, []);
  return (
    <div>
      <Header />
      {/* <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
        <div className="flex items-center my-3">
          <TvIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
          <span className="text-center text-3xl font-extrabold">TverClip</span>
        </div> */}
      <div className="flex justify-end items-center my-2 pt-20 pr-4">
        {/* <ArrowRightOnRectangleIcon
            onClick={logout}
            className="h-6 w-6 my-2 text-blue-500 cursor-pointer"
          /> */}
        <CreateOrUpdateTaskModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
        />
        {/* <PlusCircleIcon
          className="h-9 w-9 mx-2 text-blue-500 cursor-pointer"
          onClick={() => {
            setModalIsOpen(true);
            resetEditedTask();
          }}
        /> */}
        <button
          className="transition rounded px-4 py-2 text-sm bg-blue-500 text-white hover:bg-opacity-80"
          onClick={() => {
            setModalIsOpen(true);
            resetEditedTask();
          }}
        >
          新規作成
        </button>
      </div>
      {/* <form onSubmit={submitTaskHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="title ?"
          type="text"
          onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
          value={editedTask.title || ''}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedTask.title}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data?.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                user_id={task.user_id}
                title={task.title}
                description={task.description}
                url={task.url}
                ogp_image_url={task.ogp_image_url}
                ogp_description={task.ogp_description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};
