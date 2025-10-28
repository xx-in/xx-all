import { Title } from "@comps/Title";
import { ButtonList } from "./ButtonList";
import FormList from "./FormList";
import UploadList from "./UploadList";
import ValidateForm from "./ValidateForm";
import LayoutList from "./LayoutList";
import { Layout } from "@comps/Layout";
import { Button } from "@comps/Button";
import { Flex } from "@comps/Flex";

export default function Template() {
  return (
    <>
      <Title>组件列表</Title>
      <Layout>
        <Layout.Left width={200} class="border-stone-100">
          <div class="grid grid-cols-1 gap-2 p-4 pr-0">
            {/* <Button baseClass={Button.blue} class="justify-center">
              按钮组件
            </Button>
            <Button baseClass={Button.blue} class="justify-center">
              表单组件
            </Button>
            <Button baseClass={Button.blue} class="justify-center">
              校验表单组件
            </Button>
            <Button baseClass={Button.blue} class="justify-center">
              文件上传组件
            </Button>
            <Button baseClass={Button.blue} class="justify-center">
              可拖拽布局组件
            </Button> */}
          </div>
        </Layout.Left>
        <Layout.Main>
          <div class="px-4 py-4">
            <ButtonList />
            <FormList />
            <ValidateForm />
            <UploadList />
            <LayoutList />
          </div>
        </Layout.Main>
      </Layout>
    </>
  );
}
