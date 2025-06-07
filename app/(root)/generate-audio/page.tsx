"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ViewAudio } from "@/components/ViewContent";
import { getContent } from "@/database/content";
import { getTexttoAudio } from "@/server/actions/openai";
import { useUser } from "@clerk/nextjs"; 
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState<messageAi[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [initial, setInitial] = useState(true);

  
  const { user } = useUser();
  const author = user?.firstName as string;
  const idClerk = user?.id as string;
  const type = "AUDIO";
  const date = new Date();
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  useEffect(() => {
      const fetchData = async () => {
        const initialContent = await getContent({type, idClerk, date});
        if (initialContent.length > 0) {
          setMsg(initialContent);
        }
      }
      if (initial) {
        fetchData();
        setInitial(false);
      }
    }, [type, idClerk, date, initial]);

  const sendInput = async () => {
    // Handle the send button click
    if (input.trim() === "") {
      return; // Do not send empty input
    }
    setLoading(true);
    const data = await getTexttoAudio({ input, idClerk, author });
    setMsg((prev) => [...prev, data]);
    setInput(""); // Clear the input field
    setLoading(false);
  };

  return (
    <section className="w-full h-screen p-4">
      <div className="fixed top-0 flex flex-wrap items-center justify-between gap-2 z-10 bg-gray-400 w-full">
        <h2 className="text-2xl font-semibold p-2 ">Text to Audio</h2>
      </div>
      <div className="relative flex-1 h-screen overflow-y-auto p-3 space-y-4 rounded-md w-full ">
        {/* display user's prompt */}
        {msg.map((item, index) => (
          <ViewAudio key={index} item={item} index={0} />
        ))}

        {/* Scroll to the bottom */}
        <div ref={chatEndRef} />
        {/* Input field */}
        <div className="mt-8 block fixed bottom-0 w-2/3 shadow-md shadow-blue-400 rounded-full ">
          <Input
            className="py-6 pl-12 rounded-full shadow-md "
            placeholder="Typing question "
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (e.target.value.length > 10) {
                setIsButton(true);
              } else {
                setIsButton(false);
              }

            }}
            onLoad={() => setInput("")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Handle the enter key press
                sendInput();
                setInput("");
              }
            }}
          />
          <Button
            className={`rounded-full w-9 h-9 right-4 flex item-center justify-center bg-gray-500 absolute top-2  ${isButton ? "hover:bg-gray-600 bg-gray-700 enabled" : "hover:bg-gray-500 bg-gray-500 disabled"}`}
            onClick={sendInput}
            
          >
            {loading ? (
              <div className="w-4 h-4 bg-white rounded-full animate-spin"/>
              ):(
                <span>{">>"}</span>
                )}
            
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;

