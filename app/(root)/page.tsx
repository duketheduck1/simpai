"use client";
import { sidebar} from "@/components/contents";
import { getQueueContent } from "@/database/content";
import { useEffect, useState } from "react";
// import Image from "next/image";

const Home = () => {
  const [msg, setMsg] = useState<messageAi[]>([]);
  const [initial, setInitial] = useState(true);
  const contents0 = sidebar;
  

  useEffect(() => {
      const fetchData = async () => {
        const initialContent = await getQueueContent();
        if (initialContent.length > 0) {
          setMsg(initialContent);
        }
      }
      if (initial) {
        fetchData();
        setInitial(false);
      }
    }, [initial]);

  return (
    <>    
    <main className=" flex-center min-h-screen flex-col gap-4 px-4 py-12">
      <section>
        <div className="px-6 py-10 rounded-2xl shadow-md text-center  w-full">
          <h1 className="text-4xl font-bold mb-4">Welcome to Simple Is Ai</h1>
          <p className="text-xl mb-6 justify-between">{contents0[0].content}</p>
        </div>
      </section>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap mt-10 justify-between gap-4 ">
          {msg.map((item, index)  => (
            <div key={index} className="justify-center flex flex-col group relative p-3 border-gray-600 border-2 rounded-lg shadow-2xl items-center h-[450px] w-[420px]">
              <h2 className="text-xl font-semibold mb-2">{item?.title}</h2>
              <img src={item?.content} width={360} height={360} className="rounded-2xl"/>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}

export default Home;
