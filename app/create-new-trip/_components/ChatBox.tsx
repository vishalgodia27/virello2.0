"use client"
import axios from 'axios'
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (!userInput?.trim() || loading) return;

    const newMsg: Message = {
      role: 'user',
      content: userInput,
    };

    // build the full list once, use it both for the UI and the API call
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setUserInput('');
    setLoading(true);

    try {
      const result = await axios.post('/api/aimodel', {
        messages: updatedMessages,
      });

      const aiMsg: Message = {
        role: 'assistant',
        content: result?.data?.response ?? "Sorry, I didn't get a response.",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Something went wrong. Please try again." },
      ]);
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
    <div className="flex flex-col h-full">
      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            Start the conversation by describing your dream trip.
          </div>
        )}

        {messages.map((msg, idx) =>
          msg.role === 'user' ? (
            <div key={idx} className="flex justify-end">
              <div className="max-w-lg bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={idx} className="flex justify-start">
              <div className="max-w-lg bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-md border">
                {msg.content}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-lg bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-md border flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </section>

      {/* User Input */}
      <section>
        <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl">
          <Textarea
            value={userInput}
            className="h-32 w-full resize-none border-none bg-transparent p-0 pr-12 text-base text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
            placeholder="Share your dream destination, travel style, budget, or special wishes..."
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button
            size="icon"
            className="absolute bottom-5 right-5"
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
      </section>
    </div>
  );
}

export default ChatBox;