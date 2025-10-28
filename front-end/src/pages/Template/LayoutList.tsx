import { Card } from "@comps/Card";
import { Flex } from "@comps/Flex";
import { Layout } from "@comps/Layout";

export default function LayoutList() {
  return (
    <div>
      <Card>
        <Card.Title>拖拽布局 - 左中右</Card.Title>
        <Layout class="h-96 w-full text-black">
          <Layout.Left class="bg-green-200">
            <Flex class="size-full justify-center">左</Flex>
          </Layout.Left>
          <Layout.Main class="size-full">
            <Flex class="size-full justify-center bg-amber-200">中</Flex>
          </Layout.Main>
          <Layout.Right class="bg-purple-200">
            <Flex class="size-full justify-center">右</Flex>
          </Layout.Right>
        </Layout>
      </Card>

      <Card>
        <Card.Title>拖拽布局 - 上中下</Card.Title>
        <Layout class="h-96 w-full text-black" direction={"vertical"}>
          <Layout.Top class="bg-green-200">
            <Flex class="size-full justify-center">上</Flex>
          </Layout.Top>
          <Layout.Main class="size-full">
            <Flex class="size-full justify-center bg-amber-200">中</Flex>
          </Layout.Main>
          <Layout.Bottom class="bg-purple-200">
            <Flex class="size-full justify-center">下</Flex>
          </Layout.Bottom>
        </Layout>
      </Card>

      <Card>
        <Card.Title>拖拽布局 - 上中下嵌套</Card.Title>
        <Layout class="h-96 w-full" direction={"vertical"}>
          <Layout.Top class="bg-blue-200">
            <Flex class="size-full justify-center">上</Flex>
          </Layout.Top>
          <Layout.Main>
            <Layout class="size-full">
              <Layout.Left class="bg-green-200">
                <Flex class="size-full justify-center">左</Flex>
              </Layout.Left>
              <Layout.Main class="">
                <Flex class="size-full justify-center bg-amber-200">中</Flex>
              </Layout.Main>
              <Layout.Right class="bg-purple-200">
                <Flex class="size-full justify-center">右</Flex>
              </Layout.Right>
            </Layout>
          </Layout.Main>
          <Layout.Bottom class="bg-red-200">
            <Flex class="size-full justify-center">下</Flex>
          </Layout.Bottom>
        </Layout>
      </Card>

      <Card>
        <Card.Title>拖拽布局 - 左中右嵌套</Card.Title>
        <Layout class="h-96 w-full">
          <Layout.Left class="bg-green-200">
            <Flex class="size-full justify-center">左</Flex>
          </Layout.Left>

          <Layout.Main>
            <Layout class="size-full" direction={"vertical"}>
              <Layout.Top class="bg-blue-200">
                <Flex class="size-full justify-center">上</Flex>
              </Layout.Top>
              <Layout.Main class="">
                <Flex class="size-full justify-center bg-amber-200">中</Flex>
              </Layout.Main>
              <Layout.Bottom class="bg-red-200">
                <Flex class="size-full justify-center">下</Flex>
              </Layout.Bottom>
            </Layout>
          </Layout.Main>
          <Layout.Right class="bg-purple-200">
            <Flex class="size-full justify-center">右</Flex>
          </Layout.Right>
        </Layout>
      </Card>
    </div>
  );
}
