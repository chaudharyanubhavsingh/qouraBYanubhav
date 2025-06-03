
import { useState, useEffect } from "react";
import { Question } from "@/types";
import { mockQuestions } from "@/data/mockData";
import QuestionCard from "./QuestionCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function QuestionFeed() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(mockQuestions);
    setFilteredQuestions(mockQuestions);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(
        (question) =>
          question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredQuestions(filtered);
    }
  }, [searchQuery, questions]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search questions, topics, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No questions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
