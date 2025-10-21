import { ButtonList } from "./ButtonList";
import FormList from "./FormList";
import ValidateForm from "./ValidateForm";

export default function Template() {
  return (
    <div class="py-4">
      <ButtonList></ButtonList>
      <FormList></FormList>
      <ValidateForm></ValidateForm>
    </div>
  );
}
