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
  id: number;
};

// モーダルコンポーネントの実装
export const DeleteTaskModal = ({ isOpen, setIsOpen, id }: Props) => {
  const { editedTask } = useStore();
  // const updateTask = useStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation, deleteTaskMutation } =
    useMutateTask();

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
        <div className="flex flex-col">
          <p className="m-4">削除してもよろしいですか？</p>
          <button
            className="disabled:opacity-40 my-3 py-2 px-3 text-white bg-indigo-600 rounded"
            onClick={(event) => {
              deleteTaskMutation.mutate(id);
            }}
          >
            削除
          </button>
        </div>
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
