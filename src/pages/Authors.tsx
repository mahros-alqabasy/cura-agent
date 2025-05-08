import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Ali",
    role: "Frontend Developer",
    email: "sarah@curaagent.app",
    avatar: "/images/team/sarah.jpg",
    bio: "Passionate about accessible and scalable user interfaces.",
    linkedin: "https://linkedin.com/in/sarahali",
    github: "https://github.com/sarahali"
  },
  {
    name: "Omar Khaled",
    role: "Backend Engineer",
    email: "omar@curaagent.app",
    avatar: "/images/team/omar.jpg",
    bio: "Focused on microservices and scalable backend solutions.",
    linkedin: "https://linkedin.com/in/omarkhaled",
    github: "https://github.com/omarkhaled"
  },
  {
    name: "Layla Nabil",
    role: "Product Manager",
    email: "layla@curaagent.app",
    avatar: "/images/team/layla.jpg",
    bio: "Dedicated to delivering user-centered features efficiently.",
    linkedin: "https://linkedin.com/in/laylanabil",
    github: ""
  },
];

export default function Authors() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-semibold text-foreground mb-10 text-center">Meet the Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="bg-card text-card-foreground rounded-lg shadow-sm border border-border transition-shadow hover:shadow-md"
          >
            <CardContent className="flex flex-col items-center p-6 animate-fade-in">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <p className="text-sm text-center mt-3 text-muted-foreground">{member.bio}</p>
              <div className="flex gap-4 mt-4 text-muted-foreground">
                <a href={`mailto:${member.email}`} aria-label="Email">
                  <Mail className="w-5 h-5 hover:text-primary transition-colors" />
                </a>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 hover:text-primary transition-colors" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 hover:text-primary transition-colors" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
