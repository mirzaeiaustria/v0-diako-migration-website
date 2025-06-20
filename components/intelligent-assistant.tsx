"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Mic, MicOff, Volume2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

const quickQuestions = [
  "بهترین کشور برای مهاجرت کاری چیست؟",
  "چقدر زمان برای اکسپرس اینتری کانادا نیاز است؟",
  "هزینه مهاجرت به آلمان چقدر است؟",
  "شرایط ویزای تحصیلی استرالیا چیست؟",
]

const botResponses: Record<string, { text: string; suggestions: string[] }> = {
  سلام: {
    text: "سلام! من دستیار هوشمند دیاکو هستم. چطور می‌تونم کمکتون کنم؟",
    suggestions: ["راهنمایی مهاجرت", "محاسبه هزینه", "انتخاب کشور", "بررسی مدارک"],
  },
  "بهترین کشور": {
    text: "بهترین کشور بستگی به شرایط شما داره. کانادا، آلمان و استرالیا از محبوب‌ترین گزینه‌ها هستند. سن، تحصیلات و تجربه کاری‌تون چطوره؟",
    suggestions: ["کانادا", "آلمان", "استرالیا", "مقایسه کشورها"],
  },
  کانادا: {
    text: "کانادا یکی از بهترین گزینه‌ها برای مهاجرت است. سیستم اکسپرس اینتری، مهاجرت استانی و برنامه‌های مختلف داره. چه روشی رو ترجیح می‌دید؟",
    suggestions: ["اکسپرس اینتری", "مهاجرت استانی", "مهاجرت تحصیلی", "شرایط کانادا"],
  },
}

export function IntelligentAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "سلام! من دستیار هوشمند مهاجرتی دیاکو هستم. چطور می‌تونم کمکتون کنم؟",
      timestamp: new Date(),
      suggestions: ["راهنمایی مهاجرت", "محاسبه هزینه", "انتخاب کشور", "بررسی مدارک"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // شبیه‌سازی پاسخ ربات
    setTimeout(() => {
      const botResponse = getBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse.text,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): { text: string; suggestions: string[] } => {
    const input = userInput.toLowerCase()

    if (input.includes("سلام") || input.includes("hello")) {
      return botResponses["سلام"]
    } else if (input.includes("بهترین کشور") || input.includes("کشور")) {
      return botResponses["بهترین کشور"]
    } else if (input.includes("کانادا")) {
      return botResponses["کانادا"]
    } else if (input.includes("هزینه")) {
      return {
        text: "هزینه‌های مهاجرت بسته به کشور و روش متفاوته. برای محاسبه دقیق می‌تونید از محاسبه‌گر هزینه استفاده کنید. کدوم کشور رو در نظر دارید؟",
        suggestions: ["محاسبه‌گر هزینه", "هزینه کانادا", "هزینه آلمان", "هزینه استرالیا"],
      }
    } else {
      return {
        text: "متوجه نشدم. می‌تونید سوالتون رو واضح‌تر بپرسید یا از پیشنهادات زیر استفاده کنید:",
        suggestions: ["راهنمایی مهاجرت", "محاسبه هزینه", "انتخاب کشور", "تماس با مشاور"],
      }
    }
  }

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = "fa-IR"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "fa-IR"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-purple-600" />
          دستیار هوشمند مهاجرتی
          <Badge className="bg-green-500 text-white">آنلاین</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`flex items-start gap-2 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user" ? "bg-blue-500" : "bg-purple-500"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user" ? "bg-blue-500 text-white" : "bg-white border shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.type === "bot" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 p-1 h-auto"
                          onClick={() => speakText(message.content)}
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleSendMessage(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-xs text-gray-600 mb-2">سوالات پرتکرار:</div>
          <div className="flex flex-wrap gap-1">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="سوال خود را بپرسید..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              className={isListening ? "bg-red-100 border-red-300" : ""}
            >
              {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button onClick={() => handleSendMessage(inputValue)}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
