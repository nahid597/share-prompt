import Feed from "@components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col text-center">
      <h1 className="mt-5 p-5 text-5xl font-extrabold leading-[1-15] text-black sm:text-6xl">
        Discover & Share
      <br className="max-md:hidden" />
      <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">AI_Powered Prompts</span>
      </h1>
      <p className="desc text-center p-3 font-serif text-lg">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, crate and share creative prompts.
      </p>
      <Feed />
    </section>
  );
}
