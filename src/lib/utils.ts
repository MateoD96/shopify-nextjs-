import { ReadonlyURLSearchParams } from "next/navigation";

export function createUrl(
  pathName: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathName}${queryString}`;
}
