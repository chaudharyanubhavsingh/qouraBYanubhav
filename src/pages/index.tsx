import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import QuestionFeed from "@/components/Questions/QuestionFeed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Quora - A place to share knowledge and better understand the world</title>
        <meta name="description" content="Quora is a place to gain and share knowledge. It's a platform to ask questions and connect with people who contribute unique insights and quality answers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
                {user && (
                  <Link href="/ask">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Ask Question
                    </Button>
                  </Link>
                )}
              </div>
              <QuestionFeed />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {!user && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Join Quora</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      A place to share knowledge and better understand the world
                    </p>
                    <div className="space-y-2">
                      <Link href="/register">
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">Log In</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">React</span>
                      <span className="text-xs text-gray-500">1.2k questions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">JavaScript</span>
                      <span className="text-xs text-gray-500">2.1k questions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Next.js</span>
                      <span className="text-xs text-gray-500">890 questions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Database</span>
                      <span className="text-xs text-gray-500">1.5k questions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Questions</span>
                      <span className="text-sm font-medium">12.5k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Answers</span>
                      <span className="text-sm font-medium">45.2k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Users</span>
                      <span className="text-sm font-medium">8.9k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
