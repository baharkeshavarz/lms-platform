"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
}

export const Editor = ({
    onChange,
    value,
}: EditorProps) => {
    // we want to prevent the server-side rendering to avoid the hydration error
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false}), []);
    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}


/*
https://www.npmjs.com/package/react-quill::
The original one is the below code:

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyComponent() {
  const [value, setValue] = useState('');

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}


*/