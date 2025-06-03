import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnswerFormProps {
  questionId: string; // Used to associate the answer with the question
  onSubmit: (content: string) => void;
}

export default function AnswerForm({ onSubmit }: AnswerFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Please log in to answer this question.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    
    setTimeout(() => {
      onSubmit(content);
      setContent("");
      setLoading(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Answer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write your answer here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
          <Button type="submit" disabled={loading || !content.trim()}>
            {loading ? "Posting..." : "Post Answer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
