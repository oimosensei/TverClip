// ModalComponent.jsx
import { FormEvent } from "react";
import useStore from "../store";
import { useMutateTask } from "../hooks/useMutateTask";
import Modal from "react-modal";

// アプリのルート要素をモーダルのアンカーとして設定します。
Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

// モーダルコンポーネントの実装
export const CreateOrUpdateTaskModal = ({ isOpen, setIsOpen }: Props) => {
  const { editedTask } = useStore();
  const updateTask = useStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
    closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        // 以下のスタイリングは例です。必要に応じてカスタマイズしてください。
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <form onSubmit={submitTaskHandler} className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-bold text-gray-700">
            Title
          </label>
          <input
            id="title"
            className="mb-3 px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter title"
            type="text"
            onChange={(e) =>
              updateTask({ ...editedTask, title: e.target.value })
            }
            value={editedTask.title || ""}
          />

          <label htmlFor="url" className="mb-2 font-bold text-gray-700">
            URL
          </label>
          <input
            id="url"
            className="mb-3 px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter URL"
            type="text"
            onChange={(e) => updateTask({ ...editedTask, url: e.target.value })}
            value={editedTask.url || ""}
          />

          <label htmlFor="description" className="mb-2 font-bold text-gray-700">
            Details
          </label>
          <textarea
            id="description"
            className="mb-3 px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter details"
            rows={4}
            onChange={(e) =>
              updateTask({ ...editedTask, description: e.target.value })
            }
            value={editedTask.description || ""}
          />

          <button
            className="disabled:opacity-40 my-3 py-2 px-3 text-white bg-indigo-600 rounded"
            disabled={!editedTask.title || !editedTask.url}
          >
            {editedTask.id === 0 ? "Create" : "Update"}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-2 mr-2 text-2xl font-semibold leading-none text-gray-900 bg-transparent border-none cursor-pointer"
          style={{ outline: "none" }}
        >
          &times;
        </button>
      </Modal>
    </div>
  );
};
