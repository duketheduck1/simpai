"use server";
import { OpenAI } from "openai";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { addContent } from "../../database/content";
import https from "https";
import { uploadImageKit } from "./imagekitUpload";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAI();

export const getChatResponse = async ({ input, idClerk, author } : OpenAiProps): Promise<messageAi> => {
  let res = "";
  let check = true;
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: input,
    });
    res = response.output_text;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res = "Error fetching chat response:" + error;
    check = false;
  }
  const context = {
    input: input,
    title: input,
    content: res, //response.choices[0].message.content,
    duration: 0,
    date: new Date(),
    isOk: check,
    type: "CHAT",
    author: author,
    idClerk: idClerk,
  };
  
  if(check && idClerk !== "anonymous-id") {
    // Only add content to the database if the request was successful and idClerk is not anonymous
    console.log("context", context);
    const result = await addContent(context);
    if (!result) {
      console.log("Content added error");
      context.isOk = false;
      context.content = "Error adding content to the database";
    }
    return context;
  }
  return context
};

export const getTexttoImage = async ({ input, idClerk, author } : OpenAiProps): Promise<messageAi> => {
  let res = "";
  let check = true;

  try {
    console.log("input1");

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: input,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });
    console.log("input2");
    const url = response.data![0].url as string;
    console.log("url", url);
    // res = await downloadImage(url, "img", `img${uuidv4()}.png`) as string;
    const fileName = `img${uuidv4()}.png`;
    const folder = "img";
    res = await uploadImageKit({ url, fileName, folder }) as string;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res = "Error fetching chat response:" + error;
    check = false;
  }

  
  const context = {
    input: input,
    title: input,
    content: res, //response.choices[0].message.content,
    duration: 0,
    date: new Date(),
    isOk: check,
    type: "IMAGE",
    author: author,
    idClerk: idClerk,
  };
  console.log("context", context);
  await addContent(context);
  return context;
};

export const getTexttoAudio = async ({ input, idClerk, author } : OpenAiProps): Promise<messageAi> => {
  let res = "";
  let check = false;

  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova", // or "shimmer", "echo", "onyx", "fable", etc.
      input: input,
      
    });
    const buffer =  Buffer.from(await response.arrayBuffer());
    const fileName = `audio${uuidv4()}.mp3`;
    const folder = "audio";
    res = await uploadImageKit({ url : buffer, fileName, folder }) as string;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res = "Error fetching chat response:" + error;
    check = false;
  }
  const context = {
    input: input,
    title: input,
    content: res, //response.choices[0].message.content,
    duration: 0,
    date: new Date(),
    isOk: check,
    type: "AUDIO",
    author: author,
    idClerk: idClerk,
  };
  console.log("context", context);
  await addContent(context);
  return context;
};

// const fileSaveWeb = (outputFolder: string, fileName: string) => {    
//     const webEnd= "http://localhost:3000/";
//     const folder = path.join(process.cwd(), "public", outputFolder);
//     const fileSavePath = path.join(folder, fileName);
//     const publicPath = `${webEnd+outputFolder}/${fileName}`;        
//     // Ensure the output folder exists
//     fs.mkdirSync(folder, { recursive: true });
//     return {"fileSavePath": fileSavePath, "publicPath": publicPath}
// }

// const downloadImage = (url: string, outputFolder: string, fileName: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
    
//     const { fileSavePath, publicPath } = fileSaveWeb(outputFolder, fileName);

//     const file = fs.createWriteStream(fileSavePath);
//     https.get(url, (response) => {
//       if (response.statusCode !== 200) {
//         reject(new Error(`Failed to download image: ${response.statusCode}`));
//         return;
//       }

//       response.pipe(file);

//       file.on('finish', () => {
//         file.close();
//         console.log(`✅ Image saved to: ${publicPath}`);
//         resolve(publicPath);
//       });

//       file.on('error', (err) => {
//         fs.unlinkSync(fileSavePath); // Remove incomplete file
//         reject(err);
//       });
//     }).on('error', (err) => {
//       reject(new Error(`Request failed: ${err.message}`));
//     });
//   });
// };

