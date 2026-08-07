// "use client";
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Send, Loader2, Sparkles } from "lucide-react";
// import EmptyBoxState from "./EmptyBoxState";
// import GroupSizeUi from "./GroupSizeUi";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
//   ui?: string

// };

// function ChatBox() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const onSend = async (text?: string) => {
//     const message = text ?? userInput;

//     if (!message.trim() || loading) return;

//     const newMsg: Message = {
//       role: "user",
//       content: message,
//     };

//     const updatedMessages = [...messages, newMsg];

//     setMessages(updatedMessages);
//     setUserInput("");
//     setLoading(true);

//     try {
//       const result = await axios.post("/api/aimodel", {
//         messages: updatedMessages,
//       });

//       const respText = result?.data?.resp;

//       if (!respText) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, I didn't get a valid response.",
//           },
//         ]);
//         return;
//         console.log(result.data)
//       }
//       const RenderGenrativeUi = (ui: string | undefined, onSend: (text?: string) => void) => {
//         if (ui === "budget") {
//           // return <BudgetUi />;
//           return null;
//         } else if (ui === "groupSize") {
//           return <GroupSizeUi onSelect={(item) => onSend(item.title)} />;
//         }
//         return null;
//       };

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: respText,
//           ui: result?.data?.ui
//         },



//       ]);
//     } catch (error) {
//       console.error(error);

//       const errMsg =
//         axios.isAxiosError(error) && error.response?.data?.error
//           ? error.response.data.error
//           : "Something went wrong. Please try again.";

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: errMsg,
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   const handleSuggestionClick = (text: string) => {
//     setUserInput(text);

//     setTimeout(() => {
//       textareaRef.current?.focus();
//     }, 0);
//   };

//   return (
//     <div className="flex h-full flex-col items-center">
//       {/* Messages */}
//       <section className="flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-6">
//         {messages.length === 0 ? (
//           <EmptyBoxState onSelectSuggestion={handleSuggestionClick} />
//         ) : (
//           <div className="flex flex-col gap-4">
//             {messages.map((msg, idx) =>
//               msg.role === "user" ? (
//                 <div key={idx} className="flex justify-end">
//                   <div className="max-w-lg whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-blue-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
//                     {msg.content}
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   key={idx}
//                   className="flex items-start justify-start gap-2"
//                 >
//                   <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
//                     <Sparkles className="h-3.5 w-3.5" />
//                   </div>

//                   <div className="max-w-lg whitespace-pre-wrap break-words rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm leading-relaxed text-gray-800 shadow-sm">
//                     {msg.content}
//                   </div>
//                 </div>
//               )
//             )}

//             {loading && (
//               <div className="flex items-start gap-2">
//                 <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600">
//                   <Sparkles className="h-3.5 w-3.5" />
//                 </div>

//                 <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 shadow-sm">
//                   <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                   Thinking...
//                 </div>
//               </div>
//             )}

//             <div ref={scrollRef} />
//           </div>
//         )}
//       </section>

//       {/* Input */}
//       <section className="w-full max-w-3xl px-4 pb-6">
//         <div className="relative rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 focus-within:border-sky-500 focus-within:shadow-xl">
//           <Textarea
//             ref={textareaRef}
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={onKeyDown}
//             placeholder="Share your dream destination, travel style, budget, or special wishes..."
//             className="h-24 w-full resize-none border-none bg-transparent p-0 pr-12 text-sm text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
//           />

//           <Button
//             size="icon"
//             className="absolute bottom-4 right-4 rounded-full"
//             onClick={() => onSend()}
//             disabled={loading || !userInput.trim()}
//           >
//             {loading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//           </Button>
//         </div>

//         <p className="mt-2 text-center text-xs text-gray-400">
//           AI can make mistakes. Double-check important trip details.
//         </p>
//       </section>
//     </div>
//   );
// }

// export default ChatBox;
"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Sparkles } from "lucide-react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUI";


type Message = {
  role: "user" | "assistant";
  content: string;
  ui?: string

};

const RenderGenrativeUi = (ui: string | undefined, onSend: (text?: string) => void) => {
    if (ui === "budget") {
    return (
      <BudgetUi
        onSelect={(item) => onSend(`My budget is ${item.title} (${item.price})`)}
      />
    );
  } else if (ui === "groupSize") {
    return (
      <GroupSizeUi
        onSelect={(item) => onSend(`We are ${item.title} (${item.people})`)}
      />
    );
  }
  return null;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onSend = async (text?: string) => {
    const message = text ?? userInput;

    if (!message.trim() || loading) return;

    const newMsg: Message = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, newMsg];

    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const result = await axios.post("/api/aimodel", {
        messages: updatedMessages,
      });

      const respText = result?.data?.resp;

      if (!respText) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I didn't get a valid response.",
          },
        ]);
        return;
        console.log(result.data)
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: respText,
          ui: result?.data?.ui
        },



      ]);
    } catch (error) {
      console.error(error);

      const errMsg =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Something went wrong. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errMsg,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setUserInput(text);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div className="flex h-full flex-col items-center">
      {/* Messages */}
      <section className="flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <EmptyBoxState onSelectSuggestion={handleSuggestionClick} />
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) =>
              msg.role === "user" ? (
                <div key={idx} className="flex justify-end">
                  <div className="max-w-lg whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-blue-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div
                  key={idx}
                  className="flex items-start justify-start gap-2"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>

                  <div className="max-w-lg whitespace-pre-wrap break-words rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm leading-relaxed text-gray-800 shadow-sm">
                    {msg.content}
                  </div>
                  {msg.ui && RenderGenrativeUi(msg.ui, onSend)}
                </div>
              )
            )}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600">
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
        <div className="relative rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 focus-within:border-sky-500 focus-within:shadow-xl">
          <Textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Share your dream destination, travel style, budget, or special wishes..."
            className="h-24 w-full resize-none border-none bg-transparent p-0 pr-12 text-sm text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
          />

          <Button
            size="icon"
            className="absolute bottom-4 right-4 rounded-full"
            onClick={() => onSend()}
            disabled={loading || !userInput.trim()}
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
