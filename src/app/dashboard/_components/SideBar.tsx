"use client";

import Logo from "@/components/Logo";
import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  LogOut,
  Plus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { uploadFile } from "@/lib/fetch/graphFetch";
import { createClient } from "@/lib/supabase/client";
import { User, useUser } from "@/lib/store/useUser";
import InitUser from "@/lib/store/InitUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const menuList = [
  {
    name: "공유된 그래프",
    icon: <Users className="w-5 h-5" />,
    href: "/dashboard/public",
  },
  {
    name: "내 그래프",
    icon: <LockKeyhole className="w-5 h-5" />,
    href: "/dashboard/private",
  },
];

export default function SideBar() {
  const pathName = usePathname();
  const supabase = createClient();
  const user = useUser((e) => e.user);

  return (
    <header className="w-[300px] flex flex-col justify-between">
      <div className="flex flex-col items-start p-6">
        <Button
          className="flex items-center gap-1"
          onClick={async () => {
            await uploadFile(supabase, "asdf");
          }}
        >
          <Plus />
          만들기
        </Button>
        <Separator className="my-2" />
        <div className="flex flex-col w-full">
          {menuList.map(({ icon, name, href }) => (
            <Link href={href} key={name}>
              <MenuButton
                className={cn({
                  "bg-primary/30 text-foreground hover:bg-primary/40":
                    pathName === href,
                })}
              >
                {icon}
                {name}
              </MenuButton>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full p-4">
        {user ? <Profile user={user} /> : <LoginButton />}
      </div>
    </header>
  );
}

function LoginButton() {
  const supabase = createClient();
  return (
    <Button
      variant="foreground"
      className="w-full text-md flex items-center gap-1"
      onClick={async () => {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: location.origin + `/auth/callback`,
          },
        });
      }}
    >
      <LogIn className="w-5 h-5" />
      로그인
    </Button>
  );
}

function Profile({ user }: { user: User }) {
  const supabase = createClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg select-none cursor-pointer">
          <Avatar>
            <AvatarImage src={user.avatar_url} alt="Avatar" />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          {user.name}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="h-4 w-4 mr-2" />
          프로필 수정
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuButton({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-muted-foreground py-1 px-3 rounded-full hover:bg-accent hover:text-foreground flex gap-2 items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
