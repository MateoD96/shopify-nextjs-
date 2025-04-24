import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: {
  searchParams?: SearchParams;
}) {
  const { sort, q: searchValue } = await props.searchParams!;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue as string,
  });

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className=" mb-4">
          {products.length === 0
            ? "There are no products that match"
            : `Showing ${products.length} ${resultsText} for`}
          <span>&quot; {searchValue}&quot;</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <Grid
          className="grid-cols-1 
        sm:grid-cols-2 lg:grid-cols-3 "
        >
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
