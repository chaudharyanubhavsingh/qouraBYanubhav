
import { useState } from "react";
import { Answer } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

interface AnswerCardProps {
  answer: Answer;
  onVote: (answerId: string, voteType: "up" | "down") => void;
}

export default function AnswerCard({ answer, onVote }: AnswerCardProps) {
  const { user } = useAuth();
  const [userVote, setUserVote] = useState<"up" | "down" | null>(answer.userVote || null);
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [downvotes, setDownvotes] = useState(answer.downvotes);

  const handleVote = (voteType: "up" | "down") => {
    if (!user) return;

    let newUpvotes = upvotes;
    let newDownvotes = downvotes;
    let newUserVote: "up" | "down" | null = null;

    if (userVote === voteType) {
      if (voteType === "up") {
        newUpvotes--;
      } else {
        newDownvotes--;
      }
      newUserVote = null;
    } else {
      if (userVote === "up") {
        newUpvotes--;
      } else if (userVote === "down") {
        newDownvotes--;
      }

      if (voteType === "up") {
        newUpvotes++;
      } else {
        newDownvotes++;
      }
      newUserVote = voteType;
    }

    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);
    setUserVote(newUserVote);
    onVote(answer.id, voteType);
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      "day"
    );
  };

  const score = upvotes - downvotes;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
            <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="font-medium text-gray-900">{answer.author.name}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{formatDate(answer.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{answer.content}</p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("up")}
              className={`p-1 h-8 w-8 ${userVote === "up" ? "text-green-600 bg-green-50" : "text-gray-500"}`}
              disabled={!user}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <span className={`text-sm font-medium ${score > 0 ? "text-green-600" : score < 0 ? "text-red-600" : "text-gray-500"}`}>
              {score}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("down")}
              className={`p-1 h-8 w-8 ${userVote === "down" ? "text-red-600 bg-red-50" : "text-gray-500"}`}
              disabled={!user}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
