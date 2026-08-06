// "use client"
// import axios from 'axios'
// import React, { useState } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Send, Loader2 } from "lucide-react";
// import EmptyBoxState from './EmptyBoxState';
// type Message = {
//   role: 'user' | 'assistant';
//   content: string;
// };

// function ChatBox() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [userInput, setUserInput] = useState<string>('');
//   const [loading, setLoading] = useState(false);

//   const onSend = async () => {
//     if (!userInput?.trim() || loading) return;

//     const newMsg: Message = {
//       role: 'user',
//       content: userInput,
//     };

//     const updatedMessages = [...messages, newMsg];
//     setMessages(updatedMessages);
//     setUserInput('');
//     setLoading(true);

//     try {
//       const result = await axios.post('/api/aimodel', {
//         messages: updatedMessages,
//       });

//       // API returns { resp, ui } — not { response }
//       const respText = result?.data?.resp;

//       if (!respText) {
//         console.error("Unexpected API shape:", result?.data);
//         setMessages((prev) => [
//           ...prev,
//           { role: 'assistant', content: "Sorry, I didn't get a valid response. Please try again." },
//         ]);
//         return;
//       }

//       const aiMsg: Message = {
//         role: 'assistant',
//         content: respText,
//       };

//       setMessages((prev) => [...prev, aiMsg]);
//     } catch (error) {
//       console.error(error);
//       const errMsg =
//         axios.isAxiosError(error) && error.response?.data?.error
//           ? error.response.data.error
//           : "Something went wrong. Please try again.";
//       setMessages((prev) => [...prev, { role: 'assistant', content: errMsg }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {messages.length==0 &&
//       <EmptyBoxState/>
      
//       }
//       <section className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.length === 0 && (
//           <div className="text-center text-gray-400 mt-10">
//             Start the conversation by describing your dream trip.
//           </div>
//         )}

//         {messages.map((msg, idx) =>
//           msg.role === 'user' ? (
//             <div key={idx} className="flex justify-end">
//               <div className="max-w-lg bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md">
//                 {msg.content}
//               </div>
//             </div>
//           ) : (
//             <div key={idx} className="flex justify-start">
//               <div className="max-w-lg bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-md border">
//                 {msg.content}
//               </div>
//             </div>
//           )
//         )}

//         {loading && (
//           <div className="flex justify-start">
//             <div className="max-w-lg bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-md border flex items-center gap-2">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Thinking...
//             </div>
//           </div>
//         )}
//       </section>

//       <section>
//         <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl">
//           <Textarea
//             value={userInput}
//             className="h-32 w-full resize-none border-none bg-transparent p-0 pr-12 text-base text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
//             placeholder="Share your dream destination, travel style, budget, or special wishes..."
//             onChange={(event) => setUserInput(event.target.value)}

//             onKeyDown={onKeyDown}
//           />
//           <Button
//             size="icon"
//             className="absolute bottom-5 right-5"
//             onClick={onSend}
//             disabled={loading || !userInput?.trim()}
//           >
//             {loading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default ChatBox;
"use client"
import axios from 'axios'
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Sparkles } from "lucide-react";
import EmptyBoxState from './EmptyBoxState';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const onSend = async () => {
    if (!userInput?.trim() || loading) return;

    const newMsg: Message = {
      role: 'user',
      content: userInput,
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setUserInput('');
    setLoading(true);

    try {
      const result = await axios.post('/api/aimodel', {
        messages: updatedMessages,
      });

      // API returns { resp, ui } — not { response }
      const respText = result?.data?.resp;

      if (!respText) {
        console.error("Unexpected API shape:", result?.data);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "Sorry, I didn't get a valid response. Please try again." },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: respText }]);
    } catch (error) {
      console.error(error);
      const errMsg =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex h-full flex-col items-center">
      {/* Messages / empty state */}
      <section className="flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <EmptyBoxState />
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) =>
              msg.role === 'user' ? (
                <div key={idx} className="flex justify-end">
                  <div className="max-w-lg whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-blue-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex items-start justify-start gap-2">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    {/* <Sparkles className="h-3.5 w-3.5" /> */}
                  </div>
                  <div className="max-w-lg whitespace-pre-wrap break-words rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm leading-relaxed text-gray-800 shadow-sm">
                    {msg.content}
                  </div>
                </div>
              )
            )}

            {loading && (
              <div className="flex items-start justify-start gap-2">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        )}
      </section>

      {/* Input */}
      <section className="w-full max-w-3xl px-4 pb-6">
        <div className="relative w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 focus-within:border-sky-500 focus-within:shadow-xl">
          <Textarea
            value={userInput}
            className="h-24 w-full resize-none border-none bg-transparent p-0 pr-12 text-sm text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
            placeholder="Share your dream destination, travel style, budget, or special wishes..."
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button
            size="icon"
            className="absolute bottom-4 right-4 rounded-full"
            onClick={onSend}
            disabled={loading || !userInput?.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-gray-400">
          AI can make mistakes. Double-check important trip details.
        </p>
      </section>
    </div>
  );
}

export default ChatBox;