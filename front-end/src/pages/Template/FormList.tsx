import { Button } from "@/comps/Button";
import { Card } from "@/comps/Card";
import { Flex } from "@/comps/Flex";
import { Form } from "@/comps/Form";
import { Input } from "@/comps/Input";
import { Svg } from "@/comps/Svg";
import { addToast } from "@/comps/Toast";
import { useSignal } from "@/utils";

export default function FormList() {
  const text = useSignal("");
  const password = useSignal("");
  function handleSearch() {
    addToast("点击搜索");
  }

  return (
    <div class="px-4">
      <Card>
        <Card.Title>垂直表单</Card.Title>
        {/* <Flex>
          <Button class={Button.blue}>校验</Button>
        </Flex> */}
        <Form>
          <Form.ItemVertical label="文本类型" isRequired>
            <Input value={text} />
          </Form.ItemVertical>
          <Form.ItemVertical label="密码类型">
            <Input type="password" value={password} />
          </Form.ItemVertical>
          <Form.ItemVertical label="禁用状态">
            <Input value={text} disabled />
          </Form.ItemVertical>
          <Form.ItemVertical label="只读状态">
            <Input value={text} readonly placeholder={"只读状态"} />
          </Form.ItemVertical>
          <Form.ItemVertical label="密码组件">
            <Input.Password value={password} maxLength={2} />
          </Form.ItemVertical>

          <Form.ItemVertical label="密码组件 - 禁用">
            <Input.Password disabled value={password} />
          </Form.ItemVertical>

          <Form.ItemVertical label="密码组件 - 只读">
            <Input.Password readonly value={password} />
          </Form.ItemVertical>
          <Form.ItemVertical label="可清空组件">
            <Input.Clearable />
          </Form.ItemVertical>

          <Form.ItemVertical label="组合组件">
            <Input.Group
              prefixChildren={<Input.Prefix>前缀</Input.Prefix>}
              suffixChildren={<Input.Suffix>后缀</Input.Suffix>}
            ></Input.Group>
          </Form.ItemVertical>

          <Form.ItemVertical label="组合组件 - 搜索前缀">
            <Input.Group
              class="rounded-full pr-4"
              prefixChildren={
                <Input.Prefix
                  class="cursor-pointer border-none pl-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <Svg.Search class="size-4" />
                </Input.Prefix>
              }
            ></Input.Group>
          </Form.ItemVertical>

          <Form.ItemVertical label="组合组件 - 搜索后缀">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix
                  class="cursor-pointer px-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <Svg.Search class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.ItemVertical>

          <Form.ItemVertical label="组合组件 - 后缀无边框">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix class="cursor-pointer border-none px-4 hover:bg-blue-100 hover:text-blue-500">
                  <Svg.Calendar class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.ItemVertical>

          <Form.ItemVertical label="组合组件 - 长度限制">
            <Input.Group
              maxLength={12}
              suffixChildren={
                <Input.Suffix class="px-4">
                  <span>
                    {text.get().length} / {12}
                  </span>
                </Input.Suffix>
              }
              value={text}
            ></Input.Group>
          </Form.ItemVertical>

          <Form.ItemVertical label="最小值为0，最大值为10，精度为0，自动计算步长为1">
            <Input.Number min={0} max={10} precision={0} />
          </Form.ItemVertical>
          <Form.ItemVertical label="精度为1，自动计算步长为0.1">
            <Input.Number precision={1} />
          </Form.ItemVertical>
          <Form.ItemVertical label="精度为1，步长为1">
            <Input.Number precision={1} step={1} />
          </Form.ItemVertical>
          <Form.ItemVertical label="精度为4，步长为0.1">
            <Input.Number precision={4} step={0.1} />
          </Form.ItemVertical>

          <Form.ItemVertical label="无控制按钮">
            <Input.Number controls={false} />
          </Form.ItemVertical>

          <Form.ItemVertical label="禁用状态">
            <Input.Number precision={4} step={0.1} disabled />
          </Form.ItemVertical>

          <Form.ItemVertical label="只读状态">
            <Input.Number readonly precision={4} step={0.1} />
          </Form.ItemVertical>
        </Form>
      </Card>

      <Card>
        <Card.Title>水平表单</Card.Title>
        <Form>
          <Form.Item labelClass="w-40" label="文本类型" isRequired>
            <Input />
          </Form.Item>
          <Form.Item labelClass="w-40" label="密码类型">
            <Input type="password" value={password} />
          </Form.Item>
          <Form.Item labelClass="w-40" label="禁用状态">
            <Input value={text} disabled />
          </Form.Item>
          <Form.Item labelClass="w-40" label="只读状态">
            <Input value={text} readonly placeholder={"只读状态"} />
          </Form.Item>
          <Form.Item labelClass="w-40" label="密码组件">
            <Input.Password value={password} maxLength={2} />
          </Form.Item>

          <Form.Item labelClass="w-40" label="密码组件 - 禁用">
            <Input.Password disabled value={password} />
          </Form.Item>

          <Form.Item labelClass="w-40" label="密码组件 - 只读">
            <Input.Password readonly value={password} />
          </Form.Item>
          <Form.Item labelClass="w-40" label="可清空组件">
            <Input.Clearable />
          </Form.Item>

          <Form.Item labelClass="w-40" label="组合组件">
            <Input.Group
              prefixChildren={<Input.Prefix>前缀</Input.Prefix>}
              suffixChildren={<Input.Suffix>后缀</Input.Suffix>}
            ></Input.Group>
          </Form.Item>

          <Form.Item labelClass="w-40" label="组合组件 - 搜索">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix
                  class="cursor-pointer px-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <Svg.Search class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.Item>

          <Form.Item labelClass="w-40" label="组合组件 - 长度限制">
            <Input.Group
              maxLength={12}
              suffixChildren={
                <Input.Suffix class="px-4">
                  <span>
                    {text.get().length} / {12}
                  </span>
                </Input.Suffix>
              }
              value={text}
            ></Input.Group>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Card.Title>水平表单 - 右对齐</Card.Title>
        <Form>
          <Form.Item labelClass="w-40 text-right" label="文本类型" isRequired>
            <Input />
          </Form.Item>
          <Form.Item labelClass="w-40 text-right" label="密码类型">
            <Input type="password" value={password} />
          </Form.Item>
          <Form.Item labelClass="w-40 text-right" label="禁用状态">
            <Input value={text} disabled />
          </Form.Item>
          <Form.Item labelClass="w-40 text-right" label="只读状态">
            <Input value={text} readonly placeholder={"只读状态"} />
          </Form.Item>
          <Form.Item labelClass="w-40 text-right" label="密码组件">
            <Input.Password value={password} maxLength={2} />
          </Form.Item>

          <Form.Item labelClass="w-40 text-right" label="密码组件 - 禁用">
            <Input.Password disabled value={password} />
          </Form.Item>

          <Form.Item labelClass="w-40 text-right" label="密码组件 - 只读">
            <Input.Password readonly value={password} />
          </Form.Item>
          <Form.Item labelClass="w-40 text-right" label="可清空组件">
            <Input.Clearable />
          </Form.Item>

          <Form.Item labelClass="w-40 text-right" label="组合组件">
            <Input.Group
              prefixChildren={<Input.Prefix>前缀</Input.Prefix>}
              suffixChildren={<Input.Suffix>后缀</Input.Suffix>}
            ></Input.Group>
          </Form.Item>

          <Form.Item labelClass="w-40 text-right" label="组合组件 - 搜索">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix
                  class="cursor-pointer px-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <Svg.Search class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.Item>

          <Form.Item labelClass="w-40 text-right" label="组合组件 - 长度限制">
            <Input.Group
              maxLength={12}
              suffixChildren={
                <Input.Suffix class="px-4">
                  <span>
                    {text.get().length} / {12}
                  </span>
                </Input.Suffix>
              }
              value={text}
            ></Input.Group>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
