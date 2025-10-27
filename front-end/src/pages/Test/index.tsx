import { Flex } from "@comps/Flex";
import { Layout } from "@comps/Layout";

export default function App() {
  return (
    <Layout class="h-screen w-screen flex-col text-black">
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
  );
}
