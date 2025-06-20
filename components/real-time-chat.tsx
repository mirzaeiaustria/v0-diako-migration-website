"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, MessageSquare, X, MinusCircle, Maximize2, Phone, Video, Paperclip, Smile } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "consultant"
  timestamp: Date
  status: "sent" | "delivered" | "read"
}

type Consultant = {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "busy"
  department: string
}

const consultants: Consultant[] = [
  {
    id: "1",
    name: "دکتر علی محمدی",
    avatar: "/consultants/ali-mohammadi.png",
    status: "online",
    department: "مهاجرت تحصیلی",
  },
  {
    id: "2",
    name: "دکتر سارا کریمی",
    avatar: "/consultants/sara-karimi.png",
    status: "online",
    department: "مهاجرت کاری",
  },
]

export function RealTimeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeConsultant, setActiveConsultant] = useState<string>("1")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "سلام! چطور می‌توانم به شما کمک کنم؟",
      sender: "consultant",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "read",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isMinimized])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate consultant typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const consultantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAutomaticResponse(newMessage),
        sender: "consultant",
        timestamp: new Date(),
        status: "sent",
      }
      setMessages((prev) => [...prev, consultantMessage])
    }, 2000)
  }

  const getAutomaticResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("سلام")) {
      return "سلام! چطور می‌توانم به شما کمک کنم؟"
    } else if (lowerMessage.includes("کانادا")) {
      return "برای مهاجرت به کانادا روش‌های مختلفی مانند اکسپرس اینتری وجود دارد. آیا روش خاصی مد نظر شماست؟"
    } else {
      return "ممنون از پیام شما. کارشناسان ما در حال بررسی سوال شما هستند."
    }
  }

  const selectedConsultant = consultants.find((c) => c.id === activeConsultant)

  const getStatusColor = (status: Consultant["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="icon"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>

        {/* Notification Badge */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold">1</span>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 left-6 z-50 w-80 md:w-96"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card className="border shadow-xl h-full flex flex-col overflow-hidden">
              <CardHeader className="p-3 border-b flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2" dir="rtl">
                    {selectedConsultant && (
                      <>
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={selectedConsultant.avatar || "/placeholder.svg"}
                            alt={selectedConsultant.name}
                          />
                          <AvatarFallback>{selectedConsultant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span>{selectedConsultant.name}</span>
                          <div className="flex items-center text-xs">
                            <span
                              className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(selectedConsultant.status)}`}
                            />
                            آنلاین
                          </div>
                        </div>
                      </>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-white hover:bg-white/20"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <MinusCircle className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-white hover:bg-white/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-3 space-y-4" dir="rtl">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString("fa-IR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 max-w-[80%] rounded-lg p-3">
                          <div className="flex space-x-1 space-x-reverse">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </CardContent>

                  <CardFooter className="p-3 pt-0 border-t">
                    <form
                      className="flex w-full gap-2"
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                      }}
                      dir="rtl"
                    >
                      <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                        <Smile className="w-5 h-5" />
                      </Button>
                      <Input
                        placeholder="پیام خود را بنویسید..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" className="flex-shrink-0">
                        <Send className="w-5 h-5" />
                      </Button>
                    </form>
                  </CardFooter>

                  <div className="p-2 border-t bg-gray-50 flex justify-center gap-2" dir="rtl">
                    <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span className="text-xs">تماس صوتی</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      <span className="text-xs">تماس تصویری</span>
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
