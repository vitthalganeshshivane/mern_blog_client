import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../common/aws";

const uploadImagebyURL = (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

const uploadImageByFile = (e) => {
  return uploadImage(e)
    .then((url) => {
      if (url) {
        return {
          success: 1,
          file: { url },
        };
      }
    })
    .catch((err) => {});
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImagebyURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Type heading.....",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
