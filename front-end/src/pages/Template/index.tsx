import { ButtonList } from "./ButtonList";
import FormList from "./FormList";
import ValidateForm from "./ValidateForm";

export default function Template() {
  return (
    <div class="p-6">
      <ButtonList></ButtonList>
      <FormList></FormList>
      <ValidateForm></ValidateForm>
    </div>
  );
}
