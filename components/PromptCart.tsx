"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

function PromptCart({
  post,
  handleTagClick,
  handleEdit,
  handleDelete
}: {
  post: any;
  handleTagClick?: any;
  handleEdit?:any,
  handleDelete?:any
}) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = (e:any) => {
    e.preventDefault();

    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 5000);
  }

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold font-mono text-gray">{post?.name}</h3>
            <p className="font-inter text-sm text-gray">{post?.creator}</p>
          </div>
        </div>
        <div
          onClick={handleCopy}
          className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
        >
          <Image
            alt="copy_button"
            src={
              copied === post?.prompt
                ? "/assets/images/tick.svg"
                : "/assets/images/copy.svg"
            }
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-sans text-sm text-gray-700">
        {post?.prompt}
      </p>
      <p className="font-inter text-left text-blue-600 text-sm blue-gradient cursor-pointer"
       onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post?.tag}
      </p>
      {session?.user?.email === post.creator && pathName === '/profile' && (
        <div className="flex flex-row gap-4 flex-end justify-end mb-4">
          <p className="font-inter text-sm cursor-pointer text-yellow-500" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm cursor-pointer text-red-600" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  );
}

export default PromptCart;
