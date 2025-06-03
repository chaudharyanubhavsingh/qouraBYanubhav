
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";
import QuestionCard from "@/components/Questions/QuestionCard";
import { mockQuestions } from "@/data/mockData";
import { Question } from "@/types";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState((q as string) || "");
  const [searchResults, setSearchResults] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      performSearch(q as string);
    }
  }, [q]);

  const performSearch = (query: string) => {
    setLoading(true);
    
    setTimeout(() => {
      const results = mockQuestions.filter(question =>
        question.title.toLowerCase().includes(query.toLowerCase()) ||
        question.content.toLowerCase().includes(query.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results);
      setLoading(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    performSearch(searchQuery);
  };

  return (
    <>
      <Head>
        <title>{q ? `Search results for "${q}"` : "Search"} - Quora</title>
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions, answers, and topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {q && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Search results for "{q}"
            </h1>
            <p className="text-gray-600 mt-1">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
            </p>
          </div>
        )}

        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Searching...</p>
            </CardContent>
          </Card>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : q ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-500 mb-4">
                  No results found for "{q}"
                </p>
                <p className="text-sm text-gray-400">
                  Try different keywords or check your spelling
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">
                Enter a search term to find questions and answers
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
