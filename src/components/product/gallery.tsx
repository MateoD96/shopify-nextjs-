"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useProduct, useUpdateUrl } from "./product-context";
import { GridTileImage } from "../grid/tile";

type ImageGallery = {
  src: string;
  altText: string;
}[];

export default function Gallery({ images }: { images: ImageGallery }) {
  const { state, updateImage } = useProduct();
  const updateUrl = useUpdateUrl();

  const buttonClassName = "";
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  return (
    <form>
      <div className=" relative aspect-square h-full max-h-[500px] w-full">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px),66vw,100vw"
            src={images[imageIndex]?.src as string}
            alt={images[imageIndex]?.altText as string}
            priority
          />
        )}

        {images.length > 1 ? (
          <div className=" absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateUrl(newState);
                }}
                aria-label="Previoud product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className=" h-5" />
              </button>

              <div className=" mx-1 h-6 w-px bg-neutral-500"></div>

              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateUrl(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className=" my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg: mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateUrl(newState);
                  }}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    active={isActive}
                    width={80}
                    height={80}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
