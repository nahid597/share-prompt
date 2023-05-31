"use client";

import React from 'react';
import PromptCart from "@components/PromptCart";

function Profile(
  {
    name,
    desc,
    data,
    handleEdit,
    handleDelete
  }: {
  name: string
  desc: string
  data: any
  handleEdit: any
  handleDelete: any
  }
) {
  return (
    <section className="w-full text-center items-center">
      <h3 className='mt-5 text-4xl text-extrabold'>
      <span className="bg-gradient-to-r from-blue-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">{name} Profile</span>
      </h3>
      <p className="mt-4 text-gray-700 text-semibold text-xl">{desc}</p>
      <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data && data.length > 0 && data.map((post:any) => (
          <PromptCart 
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>

    </section>
  )
}

export default Profile;