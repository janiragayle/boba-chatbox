"use client";

import { Link, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Boba Broski support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout'); 
      if (response.status === 200) {
        // Redirect to the homepage after successful logout
        router.push("/")
      }
    } catch (error) {
      router.push("/")
      // console.error("Logout failed:", error);
      //TODO: Fix error!
    }
  };

  // Send the message to the server
  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; // Don't send empty messages
    setIsLoading(true);
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: "url(/images/chatbox-background.svg)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <Box width="100%">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            text
            sx={{
              fontFamily: "American Typewriter, serif",
              fontWeight: "bold",
              color: "#000",
              cursor: "pointer",
              marginLeft: 4,
            }}
          >
            Boba Broskis
          </Typography>
        </Link>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            marginRight: 4,
            borderColor: '#A2B068', 
            backgroundColor: "#A2B068",
            color: '#FFFFF',
            '&:hover': {
              borderColor: '#B17D6C',
              backgroundColor: '#CCFFCC',
            },
          }}
        >
          Logout
        </Button>
        {/* Add other header elements if needed */}
      </Box>
      <Stack
        direction={"column"}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
        borderRadius="30px"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "#B17D6C"
                    : "#A2B068"
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                <Typography>{message.content}</Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            sx={{
              backgroundColor: '#A2B068', // Custom background color
              '&:hover': {
                backgroundColor: '#B17D6C', // Custom hover color
              },
            }}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
