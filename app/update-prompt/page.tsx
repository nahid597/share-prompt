"use client";

import {useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';
import axios from 'axios';

import Form from '@components/Form';

const EditPrompt = () => {
    let {data: session} = useSession();
    const {push} = useRouter();
    const searchParams = useSearchParams();

    const promptId =  searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async() => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            console.log("data update", data);

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

       if(promptId) getPromptDetails();

    }, [promptId]);

    const updatePrompt = async (e:any) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) alert('Please add valid Prompt Id')

        try{
            const response = await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt || "",
                tag: post.tag || ""
            });

            console.log("response" , response);

            if(response?.status == 200) {
                push("/profile");
            }

        }catch(error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    return(
        <>
            <Form 
                type = "Edit"
                post = {post}
                setPost = {setPost}
                submitting={submitting}
                handleSubmit = {updatePrompt}
            />
        </>
    );

};

export default EditPrompt;