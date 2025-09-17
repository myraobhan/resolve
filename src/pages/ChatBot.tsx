import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendMessageToGemini, clearChatSession } from "@/services/geminiService";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant for consumer complaints. I can help you understand your rights, guide you through the complaint process, and answer questions about Indian consumer law. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}`);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(inputMessage, sessionId);

      if (response.success) {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        throw new Error(response.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      clearChatSession(sessionId);

      setMessages([
        {
          id: "1",
          content:
            "Hello! I'm your AI assistant for consumer complaints. I can help you understand your rights, guide you through the complaint process, and answer questions about Indian consumer law. What would you like to know?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);

      toast({
        title: "Chat Cleared",
        description: "Your conversation has been reset.",
      });
    } catch (error) {
      console.error("Error clearing chat:", error);
      toast({
        title: "Error",
        description: "Failed to clear chat. Please try again.",
        variant: "destructive",
      });
    }
  };

  const quickQuestions = [
    "Which consumer forum should I use?",
    "What documents do I need?",
    "How much does it cost to file?",
    "How long does the process take?",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              AI Consumer Rights Assistant
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              Get instant answers about consumer complaints, legal procedures,
              and your rights
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="bg-gradient-primary text-white p-4 sm:p-6">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  <span className="text-sm sm:text-base">Chat with AI Assistant</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-white border-white bg-white text-primary text-xs sm:text-sm"
                >
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Clear Chat</span>
                  <span className="sm:hidden">Clear</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-80 sm:h-96 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && (
                          <Bot className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                        )}
                        {message.sender === "user" && (
                          <User className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="whitespace-pre-line text-sm sm:text-base">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 border-t">
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage(question)}
                        className="text-xs sm:text-sm"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Ask me about consumer rights, complaint procedures, or legal advice..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 sm:mt-8 bg-warning/10 border border-warning/20 rounded-lg p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning mb-2 text-sm sm:text-base">
                  Important Disclaimer
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This AI assistant provides general guidance about consumer
                  rights and procedures in India. It is not a substitute for
                  professional legal advice. For complex cases, consider
                  consulting with a qualified lawyer or consumer rights expert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatBot;
