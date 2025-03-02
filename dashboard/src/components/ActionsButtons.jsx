import { ActionBtnEdit } from "./ActionBtnEdit";
import { ActionBtnDelete } from "./ActionBtnDelete";
import { ActionBtnView } from "./ActionBtnView";
import { ActionBtnContainer } from "./ActionBtnContainer";

export const ActionButtons = () => {
  return (
    <ActionBtnContainer>
      <ActionBtnView />
      <ActionBtnEdit />
      <ActionBtnDelete />
    </ActionBtnContainer>
  );
};
