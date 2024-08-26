import Logo from "@/components/Logo";
import SideBar from "./_components/SideBar";
import { Input } from "@/components/ui/input";
import InitUser from "@/lib/store/InitUser";
import { createClient } from "@/lib/supabase/server";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  
  return (
    <main className="flex h-lvh bg-muted/40">
      <SideBar />
      <div className="flex flex-col flex-1">
        <div className="py-4 pr-4 pb-0">
          <Input
            className="h-10 bg-muted rounded-full"
            placeholder="검색어를 입력하세요."
          />
        </div>
        <div className="p-4 pl-0 min-h-0 flex-1">
          <div className="bg-background h-full w-full min-h-0 rounded-xl">
            {children}
          </div>
        </div>
      </div>
      <InitUser userId={data.session?.user.id} />
    </main>
  );
}
