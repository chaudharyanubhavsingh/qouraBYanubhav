import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageCircle } from "lucide-react";
import AnswerCard from "@/components/Answers/AnswerCard";
import AnswerForm from "@/components/Answers/AnswerForm";
import { mockQuestions, mockAnswers } from "@/data/mockData";
import { Answer } from "@/types";

export default function QuestionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const question = mockQuestions.find(q => q.id === id);
  const [answers, setAnswers] = useState<Answer[]>(
    mockAnswers.filter(a => a.questionId === id)
  );

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Question not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleVote = (answerId: string, voteType: "up" | "down") => {
    console.log(`Voted ${voteType} on answer ${answerId}`);
  };

  const handleAnswerSubmit = (content: string) => {
    const newAnswer: Answer = {
      id: `answer-${Date.now()}`,
      questionId: question.id,
      content,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "",
        reputation: 0,
        email: "user@example.com",
        createdAt: new Date()
      },
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userVote: null
    };
    
    setAnswers([newAnswer, ...answers]);
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      "day"
    );
  };

  return (
    <>
      <Head>
        <title>{question.title} - Quora</title>
        <meta name="description" content={question.content.substring(0, 160)} />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start space-x-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={question.author.avatar} alt={question.author.name} />
                <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{question.author.name}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(question.createdAt)}</span>
                </div>
              </div>
            </div>
            
            <CardTitle className="text-2xl mb-4">{question.title}</CardTitle>
            
            {question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-800 whitespace-pre-wrap mb-4">{question.content}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{answers.length} answers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <AnswerForm questionId={question.id} onSubmit={handleAnswerSubmit} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </h2>
          
          {answers.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  No answers yet. Be the first to answer this question!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <AnswerCard
                  key={answer.id}
                  answer={answer}
                  onVote={handleVote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
