import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface Article {
  id: number
  title: string
  content: string
  author: string
  created_at: string
  img_url: string
}

export function NewsArticle({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden card">
      <div className="relative w-full h-48">
        <Image
          className='object-cover'
          src={article.img_url}
          alt={article.title}
          fill={true}
          priority={true}
        />
      </div>
      <CardHeader>
        <CardTitle className='card-title'>{article.title}</CardTitle>
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