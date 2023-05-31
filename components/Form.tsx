import Link from "next/link";
import React, { useEffect } from "react";

function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: {
  type: String;
  post: any;
  setPost: any;
  submitting: any;
  handleSubmit: any;
}) {
  return (
    <section className="w-full flex flex-col flex-center text-center sm:mb-10">
      <h1 className="font-extrabold text-5xl sm:text-6xl bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
        {type} Post
      </h1>
      <p className="mt-5 text-gray-600 sm:text-xl max-w-full flex-center  text-center p-3 font-serif text-lg">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <label className="text-left mt-10">
        <span className="font-satoshi mb-3 font-semibold text-base text-gray-700">
          {" "}
          Your AI Prompt
        </span>
        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt here"
          required
          className="w-full bg-gray-200 mt-3 flex rounded-lg h-[200px] p-3 text-sm text-black outline-0"
        />
      </label>
      <label className="text-left mt-5">
        <span className="font-satoshi mb-3 font-semibold text-base text-gray-700">
          {" "}
          Tag&nbsp;
          <span className="text-gray-400 font-normal">
            (#product, #webdevelopment,#idea)
          </span>
        </span>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#tag"
          required
          className="w-full bg-gray-200 mt-3 flex rounded-lg h-[50px] p-3 text-sm text-gray-500 outline-0"
        />
      </label>
      <div className="w-full flex justify-end mr-5 mt-5 sm:mb-10 gap-5">
        <Link href="/" className="bg-orange-600 px-5 py-2 rounded-full text-white">
          Cancel
        </Link>
        <button 
          onClick={handleSubmit}
          className="bg-blue-500 px-5 py-2 rounded-full text-white">
          {submitting ? `${type} ...` : type}
        </button>
      </div>
    </section>
  );
}

export default Form;
