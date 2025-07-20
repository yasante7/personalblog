export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: 'draft' | 'published' | 'scheduled'
  category: string | null
  tags: string[] | null
  author_id: string | null
  views: number
  is_featured: boolean | null
  created_at: string
  updated_at: string
  published_at: string | null
  cover_image: string | null
}