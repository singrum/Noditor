export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex h-lvh">{children}</main>;
}
