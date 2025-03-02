export const faqData = [
  {
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page.",
  },
  {
    question: "What is JSX?",
    answer:
      "JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It allows you to write HTML elements in JavaScript, and React will convert it into the appropriate calls to create elements in the DOM.",
  },
  {
    question: "How do I manage state in React?",
    answer:
      "In React, state is managed using the `useState` hook in functional components, or through `this.setState` in class components. State allows you to manage and respond to changes in the data of your application.",
  },
  {
    question: "What is the virtual DOM?",
    answer:
      "The virtual DOM is an in-memory representation of the actual DOM elements. React uses it to optimize the process of updating the DOM by minimizing direct manipulation of the real DOM, which improves performance.",
  },
  {
    question: "What is the difference between props and state?",
    answer:
      "Props are used to pass data from a parent component to a child component, while state is used to manage data within a component. Props are immutable, whereas state is mutable and can be updated within the component.",
  },
  {
    question: "What are hooks in React?",
    answer:
      "Hooks are special functions in React that allow you to 'hook into' React state and lifecycle features from function components. Common hooks include `useState`, `useEffect`, and `useContext`.",
  },
];
