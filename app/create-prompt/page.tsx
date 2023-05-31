"use client";

import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Form from '@components/Form';

const CreatePrompt = () => {
    let {data: session} = useSession();
    const {push} = useRouter(); 

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e:any) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await axios.post('/api/prompt/new', {
                prompt: post.prompt || "",
                tag: post.tag || "",
                userId: session?.user
            });

            console.log("response" , response);

            if(response?.status == 201) {
                push("/");
            }

        }catch(error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    return(
        <>
            <Form 
                type = "Create"
                post = {post}
                setPost = {setPost}
                submitting={submitting}
                handleSubmit = {createPrompt}

            />
        </>
    );

};

export default CreatePrompt;