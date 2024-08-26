import Logo from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <header className="sticky p-3 flex justify-between">
        <Logo />
        <div className=""></div>
      </header>
      <div className="container">온라인 노드 에디터</div>
    </main>
  );
}
