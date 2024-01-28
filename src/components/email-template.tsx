import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email:string;
  message:string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,email,message
}) => (
  <div>
    <h1>Name: {name}!</h1>
    <h2>Email:{email}</h2>
    <p>Message:{message}</p>
  </div>
);

export default EmailTemplate;