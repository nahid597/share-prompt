"use client";

import PromptCart from './PromptCart';
import React, { useEffect, useState } from 'react';

const PromptCardList = (
  {
    data,
    handleTagClick
  
  }:{
    data: any,
    handleTagClick: any
  }
  ) => {
    
    useEffect(() => {
      console.log("data calling" , data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className='mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 md:columns-3 xl:columns-3'>
      {data.map((post:any) => (
        <PromptCart
         key={post._id}
         post = {post}
         handleTagClick={handleTagClick} 
        />
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(0);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchText = (e:any) => {
    e.preventDefault();

    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    const timer:any =  setTimeout(() => {
      const searchResult = filterPrompt(e.target.value);
      setSearchedResults(searchResult);
    }, 500);

    // debounce method
    setSearchTimeout(timer);

  }

  const handleTagClick = (tagName:any) => {
    setSearchText(tagName);

    const searchResult = filterPrompt(tagName);
    setSearchedResults(searchResult);
  };

  const filterPrompt = (searchText:any) => {
    const reg = new RegExp(searchText);

    return posts.filter((item:any) => reg.test(item.creator) || reg.test(item.tag) || reg.test(item.prompt)
    );
  }

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data:any = await response.json();
      
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className='mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2'>
      <form className='relative w-full flex justify-center items-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchText}
          required
          className='w-full h-[50px] p-3 rounded-xl font-satoshi'
        />
      </form>

      {posts && posts.length > 0 && searchText ? (
       
        <PromptCardList 
          data= {searchedResults}
          handleTagClick = {handleTagClick}
      />
      ): <PromptCardList 
      data= {posts}
      handleTagClick = {handleTagClick}
  /> }
    </section>
  )
}

export default Feed;