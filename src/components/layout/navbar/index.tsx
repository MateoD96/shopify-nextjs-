import { getMenu } from "@/lib/shopify";

export default async function NavBar() {
  const menus = await getMenu("nextjs-frontend-menu");

  console.log(menus);

  return <nav>index</nav>;
}
