import "./modal.scss"
import ShortcutModalContainer from "./shortcutModalContainer/shortcutModalContainer";
import GroupModalContainer from "./groupModalContainer/groupModal";


export default function Modal({modalType, closeModal}) {

  return (
    <>
      {(() => {
        if (modalType.createShortcut) {
          return (
            <div className="shortcut-modal">
              <ShortcutModalContainer closeModal={closeModal}/>
            </div>
          );
        } else if (modalType.createGroup) {
          return (
            <div className="group-modal">
              <GroupModalContainer/>
            </div>
          );
        }
      }) () }
    </>
  );
}