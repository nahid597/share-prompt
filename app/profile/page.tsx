"use client";

import React from 'react';
import {useState, useEffect} from 'react';
import {useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {

    const {data: session} = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch(`/api/users/${session?.user?.email}/posts`);
      const data:any = await response.json();
      
      setPosts(data);
    }

    if (session?.user?.email) fetchPosts();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


const handleDelete = async(post: any) => {
  const hasConfirmed = confirm('Are you sure you want to delete the prompt?');

  if(hasConfirmed) {
    try{
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE'
      })

      const filteredPosts = posts.filter((p:any) => p._id !== post._id);

      setPosts(filteredPosts);

    }catch(error) {
      console.log(error);
    }
  }
    
}

const handleEdit = async(post:any) => {
  router.push(`/update-prompt?id=${post._id}`)
}
    return (
        <Profile
            name = "My"
            desc = "Welcome to your personalized profile page"
            data = {posts}
            handleEdit = {handleEdit}
            handleDelete = {handleDelete}
        />
    )
};

export default ProfilePage;