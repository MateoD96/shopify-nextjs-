import { getCollections } from "@/lib/shopify";

async function CollectionList() {
  const collections = await getCollections();

  console.log(collections);

  return <div></div>;

  {
    /* <FilterList />; */
  }
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
  return <CollectionList />;
}
