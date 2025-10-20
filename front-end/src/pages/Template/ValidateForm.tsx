import { Button } from "@/comps/Button";
import { Card } from "@/comps/Card";
import { Flex } from "@/comps/Flex";
import { Form, useFormItem } from "@/comps/Form";
import { Input } from "@/comps/Input";
import { addToast } from "@/comps/Toast";
import { validate } from "@/utils";

export default function ValidateForm() {
  const text = useFormItem<string>("", [
    {
      message: "请输入必填选项",
      pattern: validate.nonEmpty,
    },
    {
      message: "内容需要包含12345",
      pattern: value => value.includes("12345"),
    },
  ]);
  const name = useFormItem<string>("", [
    {
      message: "请输入必填选项",
      pattern: validate.nonEmpty,
    },
    {
      message: "只能输入6位数",
      pattern: /.{6}/,
    },
  ]);

  const age = useFormItem("0", [
    {
      message: "值不能为0",
      pattern: value => value != "0",
    },
  ]);

  function handleValidate() {
    let result = true;
    [text, name, age].forEach(item => item.onValidate());
    if ([text, name, age].some(item => item.error.get())) {
      result = false;
    }
    if (result) {
      addToast("校验通过", "success");
    } else {
      addToast("校验未通过", "warning");
    }
  }

  function handleClearErrors() {
    [text, name, age].forEach(item => item.clearError());
  }

  return (
    <div class="px-4">
      <Card>
        <Card.Title>表单校验</Card.Title>
        <Form class="">
          <Form.ItemVertical label="用户名" error={text.error}>
            <Input {...text} />
          </Form.ItemVertical>
          <Form.ItemVertical label="密码" error={name.error}>
            <Input {...name} />
          </Form.ItemVertical>
          <Form.Item labelClass="w-24" label="用户名" error={text.error}>
            <Input {...text} />
          </Form.Item>
          <Form.Item label="密码" labelClass="w-24" error={name.error}>
            <Input {...name} />
          </Form.Item>

          <Form.Item label="年龄" labelClass="w-24" error={age.error}>
            <Input.Number {...age} />
          </Form.Item>
          <Flex class="mt-4 justify-end gap-6">
            <Button class={Button.blue} onClick={handleValidate}>
              校验
            </Button>

            <Button class={Button.red} onClick={handleClearErrors}>
              清除校验结果
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
}
