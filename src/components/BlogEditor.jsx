import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import { Upload, FileText } from 'lucide-react';
import { storage, STORAGE_BUCKET_ID } from '../lib/appwrite';

const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4],
      defaultLevel: 2
    }
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: 'Start writing your blog content...'
    }
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    }
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: async (file) => {
          try {
            const fileId = Date.now().toString();
            const response = await storage.createFile(STORAGE_BUCKET_ID, fileId, file);
            const imageUrl = storage.getFileView(STORAGE_BUCKET_ID, response.$id);
            return {
              success: 1,
              file: {
                url: imageUrl,
                name: file.name
              }
            };
          } catch (error) {
            console.error('Image upload failed:', error);
            return {
              success: 0,
              message: 'Image upload failed'
            };
          }
        }
      }
    }
  },
  quote: Quote,
  delimiter: Delimiter
};

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: 'Start writing your blog content here...'
      }
    }
  ]
};

const BlogEditor = ({ data, onChange, placeholder = "Start writing..." }) => {
  const ejInstance = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current && ejInstance.current.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs-container',
      onReady: () => {
        ejInstance.current = editor;
        setIsReady(true);
      },
      autofocus: true,
      data: data || DEFAULT_INITIAL_DATA,
      onChange: async () => {
        try {
          const outputData = await editor.saver.save();
          onChange(outputData);
        } catch (error) {
          console.error('Saving failed:', error);
        }
      },
      tools: EDITOR_JS_TOOLS,
      placeholder: placeholder
    });
  };

  const handleSave = async () => {
    if (ejInstance.current) {
      try {
        const outputData = await ejInstance.current.save();
        return outputData;
      } catch (error) {
        console.error('Save failed:', error);
        return null;
      }
    }
  };

  return (
    <div className="blog-editor">
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <FileText className="w-4 h-4" />
        <span>Rich Text Editor</span>
        {isReady && (
          <span className="text-green-600">• Ready</span>
        )}
      </div>
      
      <div 
        id="editorjs-container" 
        className="min-h-[400px] border border-gray-200 rounded-lg p-4 bg-white focus-within:border-blue-500 transition-colors"
      />
      
      <div className="mt-4 text-xs text-gray-500">
        <div className="flex flex-wrap gap-4">
          <span>• Press Tab to open the toolbox</span>
          <span>• Press Enter to create a new block</span>
          <span>• Use @ to mention</span>
          <span>• Use # for headers</span>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor; 