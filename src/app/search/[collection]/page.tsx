type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Params = Promise<{ collection: string }>;

export default async function CollectionPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { q: searchValue } = await props.searchParams;
  const { collection } = await props.params;

  return (
    <div>
      Collection Page: {collection} Search:{searchValue}
    </div>
  );
}
