import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Params = Promise<{ collection: string }>;

export default async function CategoryPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { sort } = await props.searchParams;
  const { sortKey, reverse } =
    sorting.find(({ slug }) => slug === sort) || defaultSort;

  const { collection } = await props.params;

  const products = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className=" py-3 text-lg">No products found in this collections</p>
      ) : (
        <Grid
          className="grid-cols-1 
        sm:grid-cols-2 lg:grid-cols-3 "
        >
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
