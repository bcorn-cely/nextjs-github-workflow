/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({path: '.env.local'})
const { createClient } = require('@supabase/supabase-js');
const { faker } = require('@faker-js/faker');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
)

async function dropArticlesTable() {
  const { error } = await supabase.rpc('drop_articles_table')
  
  if (error) {
    console.error('Error dropping articles table:', error)
    return false
  }
  
  console.log('Articles table dropped successfully')
  return true
}

async function createArticlesTable() {
  const { error } = await supabase.rpc('create_articles_table')
  
  if (error) {
    console.error('Error creating articles table:', error)
    return false
  }
  
  console.log('Articles table created successfully')
  return true
}

async function seedDatabase() {
  const droppedTable = await dropArticlesTable();
  if(!droppedTable) return; 

  const tableCreated = await createArticlesTable();
  if (!tableCreated) return; 
  
  const articles = []

  for (let i = 0; i < 20; i++) {
    articles.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      author: faker.person.fullName(),
      img_url: faker.image.url(),
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