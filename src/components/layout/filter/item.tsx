"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ListItem } from ".";
import { type PathFilterItem as PathFilterT } from "./index";
import Link from "next/link";
import { createUrl } from "@/lib/utils";
import clsx from "clsx";
import { type SortFilterItem as SortFilterItemT } from "@/lib/constants";

function PathFilterItem({ item }: { item: PathFilterT }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const active = pathName === item.path;
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <li className=" mt-2 flex text-black dark:text-white">
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          "w-full text-sm underline-offset-4 hover:underline dark:hover-text-neutral-100",
          {
            "underline underline-offset-4": active,
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItemT }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");

  const href = createUrl(
    pathName,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    })
  );

  const DynamicTag = active ? "p" : Link;

  return (
    <li className=" mt-2 flex text-black dark:text-white">
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx(
          "w-full text-sm underline-offset-4 hover:underline dark:hover-text-neutral-100",
          {
            "underline underline-offset-4": active,
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export default function FilterItem({ item }: { item: ListItem }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
