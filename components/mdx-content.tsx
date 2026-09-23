import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes } from "react";
import { mdxOptions } from "@/lib/mdx";

/**
 * Element overrides for MDX. Everything purely visual is handled by the
 * `.prose` rules in globals.css — only elements that need real behaviour
 * are swapped out here.
 */
const components = {
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return <Link href={href} {...props} />;
    }

    return <a href={href} target="_blank" rel="noreferrer noopener" {...props} />;
  },

  // Lets authors write plain Markdown images and still get optimisation,
  // lazy loading and reserved space to prevent layout shift.
  img: ({ src, alt, ...props }: ImageProps) => (
    <Image
      src={src}
      alt={alt ?? ""}
      width={1600}
      height={900}
      sizes="(min-width: 768px) 42rem, 92vw"
      className="border-line h-auto w-full rounded-lg border"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: mdxOptions as never }}
      />
    </div>
  );
}
