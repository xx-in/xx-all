import { Card } from "@comps/Card";
import { Form } from "@comps/Form";
import { Input } from "@comps/Input";
import { addToast } from "@comps/Toast";
import { useSignal } from "@/utils";
import { SvgSearch } from "@comps/Svg/Search";
import { SvgCalendar } from "@comps/Svg/Calendar";

export default function FormList() {
  const text = useSignal("");
  const password = useSignal("");
  function handleSearch() {
    addToast("点击搜索");
  }

  const labelWidth = "w-40";

  return (
    <div>
      <Card>
        <Card.Title>垂直表单</Card.Title>
        {/* <Flex>
          <Button baseClass={Button.blue}>校验</Button>
        </Flex> */}
        <Form>
          <Form.Item direction="vertical" label="文本类型" isRequired>
            <Input value={text} />
          </Form.Item>
          <Form.Item direction="vertical" label="密码类型">
            <Input type="password" value={password} />
          </Form.Item>
          <Form.Item direction="vertical" label="禁用状态">
            <Input value={text} disabled />
          </Form.Item>
          <Form.Item direction="vertical" label="只读状态">
            <Input value={text} readonly placeholder={"只读状态"} />
          </Form.Item>
          <Form.Item direction="vertical" label="密码组件">
            <Input.Password value={password} maxLength={2} />
          </Form.Item>

          <Form.Item direction="vertical" label="密码组件 - 禁用">
            <Input.Password disabled value={password} />
          </Form.Item>

          <Form.Item direction="vertical" label="密码组件 - 只读">
            <Input.Password readonly value={password} />
          </Form.Item>
          <Form.Item direction="vertical" label="可清空组件">
            <Input.Clearable />
          </Form.Item>

          <Form.Item direction="vertical" label="组合组件">
            <Input.Group
              prefixChildren={<Input.Prefix>前缀</Input.Prefix>}
              suffixChildren={<Input.Suffix>后缀</Input.Suffix>}
            ></Input.Group>
          </Form.Item>

          <Form.Item direction="vertical" label="组合组件 - 搜索前缀">
            <Input.Group
              class="rounded-full pr-4"
              prefixChildren={
                <Input.Prefix
                  class="cursor-pointer border-none pl-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <SvgSearch class="size-4" />
                </Input.Prefix>
              }
            ></Input.Group>
          </Form.Item>

          <Form.Item direction="vertical" label="组合组件 - 搜索后缀">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix
                  class="cursor-pointer px-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <SvgSearch class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.Item>

          <Form.Item direction="vertical" label="组合组件 - 后缀无边框">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix class="cursor-pointer border-none px-4 hover:bg-blue-100 hover:text-blue-500">
                  <SvgCalendar class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.Item>

          <Form.Item direction="vertical" label="组合组件 - 长度限制">
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

          <Form.Item direction="vertical" label="最小值为0，最大值为10，精度为0，自动计算步长为1">
            <Input.Number min={0} max={10} precision={0} />
          </Form.Item>
          <Form.Item direction="vertical" label="精度为1，自动计算步长为0.1">
            <Input.Number precision={1} />
          </Form.Item>
          <Form.Item direction="vertical" label="精度为1，步长为1">
            <Input.Number precision={1} step={1} />
          </Form.Item>
          <Form.Item direction="vertical" label="精度为4，步长为0.1">
            <Input.Number precision={4} step={0.1} />
          </Form.Item>

          <Form.Item direction="vertical" label="无控制按钮">
            <Input.Number controls={false} />
          </Form.Item>

          <Form.Item direction="vertical" label="禁用状态">
            <Input.Number precision={4} step={0.1} disabled />
          </Form.Item>

          <Form.Item direction="vertical" label="只读状态">
            <Input.Number readonly precision={4} step={0.1} />
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Card.Title>水平表单</Card.Title>
        <Form>
          <Form.Item labelClass={labelWidth} label="文本类型" isRequired>
            <Input />
          </Form.Item>
          <Form.Item labelClass={labelWidth} label="密码类型">
            <Input type="password" value={password} />
          </Form.Item>
          <Form.Item labelClass={labelWidth} label="禁用状态">
            <Input value={text} disabled />
          </Form.Item>
          <Form.Item labelClass={labelWidth} label="只读状态">
            <Input value={text} readonly placeholder={"只读状态"} />
          </Form.Item>
          <Form.Item labelClass={labelWidth} label="密码组件">
            <Input.Password value={password} maxLength={2} />
          </Form.Item>

          <Form.Item labelClass={labelWidth} label="密码组件 - 禁用">
            <Input.Password disabled value={password} />
          </Form.Item>

          <Form.Item labelClass={labelWidth} label="密码组件 - 只读">
            <Input.Password readonly value={password} />
          </Form.Item>
          <Form.Item labelClass={labelWidth} label="可清空组件">
            <Input.Clearable />
          </Form.Item>

          <Form.Item labelClass={labelWidth} label="组合组件">
            <Input.Group
              prefixChildren={<Input.Prefix>前缀</Input.Prefix>}
              suffixChildren={<Input.Suffix>后缀</Input.Suffix>}
            ></Input.Group>
          </Form.Item>

          <Form.Item labelClass={labelWidth} label="组合组件 - 搜索">
            <Input.Group
              class="rounded-full pl-4"
              suffixChildren={
                <Input.Suffix
                  class="cursor-pointer px-4 hover:bg-blue-100 hover:text-blue-500"
                  onClick={handleSearch}
                >
                  <SvgSearch class="size-4" />
                </Input.Suffix>
              }
            ></Input.Group>
          </Form.Item>

          <Form.Item labelClass={labelWidth} label="组合组件 - 长度限制">
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
                  <SvgSearch class="size-4" />
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
