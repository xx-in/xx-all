import { Title } from "@comps/Title";
import { ButtonList } from "./ButtonList";
import FormList from "./FormList";
import UploadList from "./UploadList";
import ValidateForm from "./ValidateForm";
import LayoutList from "./LayoutList";

export default function Template() {
  return (
    <>
      <Title>组件列表</Title>
      <div class="py-4">
        <ButtonList />
        <FormList />
        <ValidateForm />
        <UploadList />
        <LayoutList />
      </div>
    </>
  );
}
