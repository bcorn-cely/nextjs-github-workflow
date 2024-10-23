import { Suspense } from 'react';
import supabase from '@/lib/db';
import {NewsArticle} from '@/components/NewsArticle'
import { unstable_cache as cache } from 'next/cache';

export const experimental_ppr = true;

const getCachedArticles = cache(
  async () => {
    const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

    return articles;
  },
  [],
  {
    revalidate: 24000
  }
)

export async function generateStaticParams() {
  return [];
}

export default async function Home() {
  const articles = await getCachedArticles();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <Suspense key={article.id} fallback={<div> Loading... </div>}>
            <NewsArticle key={article.id} article={article} />
          </Suspense>
        ))}
      </div>
    </main>
  )
}