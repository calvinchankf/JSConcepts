import Accordion from "./Accordion";

export default function App() {
  return (
    <Accordion
      objs={[
        {
          title: "HTML",
          desc: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
        },
        {
          title: "CSS",
          desc: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
        },
        {
          title: "JavaScript",
          desc: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
        },
      ]}
    />
  );
}
