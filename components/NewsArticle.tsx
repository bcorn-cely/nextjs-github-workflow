import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Article {
  id: number
  title: string
  content: string
  author: string
  created_at: string
}

export function NewsArticle({ article }: { article: Article }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">By {article.author}</p>
        <p>{article.content.substring(0, 150)}...</p>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(article.created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}