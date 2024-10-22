import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

async function seedDatabase() {
  const articles = []

  for (let i = 0; i < 20; i++) {
    articles.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      author: faker.person.fullName(),
      created_at: faker.date.recent()
    })
  }

  const { error } = await supabase
    .from('articles')
    .insert(articles)

  if (error) {
    console.error('Error seeding database:', error)
  } else {
    console.log('Database seeded successfully')
  }
}

seedDatabase()