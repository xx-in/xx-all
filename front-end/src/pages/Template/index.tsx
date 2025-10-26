import { ButtonList } from "./ButtonList";
import FormList from "./FormList";
import UploadList from "./UploadList";
import ValidateForm from "./ValidateForm";

export default function Template() {
  return (
    <div class="py-4">
      <ButtonList />
      <FormList />
      <ValidateForm />
      <UploadList />
    </div>
  );
}
