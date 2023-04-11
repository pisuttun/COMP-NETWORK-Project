import { ChatLineProps } from './components/ChatLine/types'

export const chatLog: ChatLineProps[][] = [
  [
    { sender: 'Alice', time: '10:00 AM', message: 'Hello everyone!' },
    { sender: 'Bob', time: '10:01 AM', message: 'Hey Alice, how are you?' },
    { sender: 'Charlie', time: '10:02 AM', message: "Hi guys, what's up?" },
    { sender: 'Alice', time: '10:03 AM', message: 'Not much, just working on a project.' },
    { sender: 'Bob', time: '10:04 AM', message: 'Cool, what kind of project?' },
    { sender: 'Charlie', time: '10:05 AM', message: 'Yeah, tell us more!' },
    {
      sender: 'Alice',
      time: '10:06 AM',
      message: "It's a web application for managing tasks and deadlines.",
    },
    {
      sender: 'Bob',
      time: '10:07 AM',
      message: 'That sounds useful. Are you using any particular framework or library?',
    },
    { sender: 'Charlie', time: '10:08 AM', message: "I'm interested too. Let us know!" },
    {
      sender: 'Alice',
      time: '10:09 AM',
      message: "I'm using React and Redux for the frontend and Node.js for the backend.",
    },
  ],
  [
    { sender: 'Charlie', time: '10:10 AM', message: 'Nice, sounds like a solid stack.' },
    {
      sender: 'Bob',
      time: '10:11 AM',
      message: "Yeah, I've used those before. What kind of features are you planning to implement?",
    },
    {
      sender: 'Alice',
      time: '10:12 AM',
      message: 'I want to include task assignment, deadline tracking, and progress updates.',
    },
    {
      sender: 'Charlie',
      time: '10:13 AM',
      message: 'Sounds like a project management tool. Are you planning to make it public?',
    },
    {
      sender: 'Bob',
      time: '10:14 AM',
      message: 'Yeah, it could be useful for teams or freelancers.',
    },
    {
      sender: 'Alice',
      time: '10:15 AM',
      message: "That's the idea. I'm planning to launch it as a SaaS product.",
    },
    {
      sender: 'Charlie',
      time: '10:16 AM',
      message: "That's ambitious. Good luck with the development!",
    },
    { sender: 'Bob', time: '10:17 AM', message: 'Definitely. Keep us updated on your progress.' },
    { sender: 'Alice', time: '10:18 AM', message: 'Will do. Thanks for the support, guys!' },
    {
      sender: 'Charlie',
      time: '10:19 AM',
      message: 'No problem, let us know if you need any help.',
    },
  ],
]
