import { FC, memo } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import useStore from "../store";
import { Task } from "../types";
import { useMutateTask } from "../hooks/useMutateTask";
import { useState } from "react";
import { CreateOrUpdateTaskModal } from "./CreateTaskModal";

const TaskItemMemo: FC<Omit<Task, "created_at" | "updated_at">> = ({
  id,
  user_id,
  title,
  url,
  description,
  ogp_image_url,
  ogp_description,
}) => {
  const updateEditedTask = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();

  // モーダルの開閉状態を管理する state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // モーダルを開く関数
  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div
      // href={url}
      // target="_blank"
      className="bg-white rounded-lg overflow-hidden shadow-lg"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={
            ogp_image_url
              ? ogp_image_url
              : "https://statics.tver.jp/images/content/thumbnail/episode/small/ep74ihcdv5.jpg?v=67"
          }
          alt="Description of Image 1"
          className="w-full"
        />
      </a>
      <div className="p-4">
        <div className="my-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-lg">{title}</span>
            {/* ここに編集と削除のアイコンを配置 */}
            <div className="flex ml-4">
              <PencilIcon
                className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  updateEditedTask({
                    id: id,
                    title: title,
                    description: description,
                    url: url,
                  });
                  openModal();
                }}
              />
              <CreateOrUpdateTaskModal
                isOpen={modalIsOpen}
                setIsOpen={setModalIsOpen}
              />
              <TrashIcon
                className="h-5 w-5 text-blue-500 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTaskMutation.mutate(id);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {url}
            </a>
            {/* アイコン配置用のスペースが必要な場合 */}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{description}</p>
            {/* アイコン配置用のスペースが必要な場合 */}
          </div>
          {/* id, description, url の横にあるアイコンのためのdiv */}
          <div className="flex justify-end"></div>
        </div>
        {/* <h3 className="font-bold text-lg mb-2">Image Title 1</h3>
                    <p className="text-gray-700 text-base">Short description for image 1...</p> */}
      </div>
    </div>
  );
};
export const TaskItem = memo(TaskItemMemo);
