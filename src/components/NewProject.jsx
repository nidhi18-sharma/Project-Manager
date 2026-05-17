import Input from "./Input.jsx";
import { useRef } from "react";
import Modal from "./Modal.jsx";

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const desc = useRef();
  const duedate = useRef();
  const modalV = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDesc = desc.current.value;
    const enteredDueDate = duedate.current.value;
    if (
      enteredTitle.trim() === "" ||
      enteredDesc.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modalV.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDesc,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modalV} btlabel={"Okay"}>
        <h2 className="text-xl font-bold text-stone-700 my-4">You forgot entering the values</h2>
        <p className="text-stone-600 mb-4">Please fill in all the fields</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label={"Title"} />
          <Input ref={desc} label={"Description"} textArea />
          <Input type="date" ref={duedate} label={"Due Date"} />
        </div>
      </div>
    </>
  );
}
