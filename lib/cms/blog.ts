import { getPayload } from './client'
import type { BlogPost, BlogAuthor } from '../blog'

export async function getAuthors(): Promise<BlogAuthor[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'authors',
    limit: 100,
  })
  
  return res.docs.map(doc => ({
    name: doc.name,
    role: doc.role || '',
    initial: doc.initial || doc.name.charAt(0),
  }))
}

export async function getPosts(): Promise<BlogPost[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' }
    },
    limit: 100,
    sort: '-publishDate',
  })
  
  return res.docs.map(doc => {
    const author = typeof doc.author === 'object' && doc.author !== null 
      ? { name: doc.author.name, role: doc.author.role || '', initial: doc.author.initial || doc.author.name.charAt(0) }
      : { name: 'Unknown', role: '', initial: 'U' }
      
    const coverImage = typeof doc.coverImage === 'object' && doc.coverImage !== null && doc.coverImage.url
      ? doc.coverImage.url
      : ''
      
    return {
      id: doc.id as number,
      slug: doc.slug,
      title: doc.title,
      excerpt: doc.excerpt || '',
      metaDescription: doc.seo?.metaDescription || '',
      primaryKeyword: doc.primaryKeyword || '',
      category: doc.category || 'Insights',
      publishDate: doc.publishDate || new Date().toISOString(),
      wordCount: doc.wordCount || 0,
      readTime: doc.readTime || '5 min read',
      coverImage,
      author,
      body: JSON.stringify(doc.body),
      ctaBlock: doc.ctaBlock || '',
      isStub: false,
    }
  })
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'blog-posts',
    where: { 
      slug: { equals: slug },
      status: { equals: 'published' }
    },
    limit: 1,
  })
  
  const doc = res.docs[0]
  if (!doc) return undefined
  
  const author = typeof doc.author === 'object' && doc.author !== null 
    ? { name: doc.author.name, role: doc.author.role || '', initial: doc.author.initial || doc.author.name.charAt(0) }
    : { name: 'Unknown', role: '', initial: 'U' }
    
  const coverImage = typeof doc.coverImage === 'object' && doc.coverImage !== null && doc.coverImage.url
    ? doc.coverImage.url
    : ''
    
  return {
    id: doc.id as number,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt || '',
    metaDescription: doc.seo?.metaDescription || '',
    primaryKeyword: doc.primaryKeyword || '',
    category: doc.category || 'Insights',
    publishDate: doc.publishDate || new Date().toISOString(),
    wordCount: doc.wordCount || 0,
    readTime: doc.readTime || '5 min read',
    coverImage,
    author,
    body: JSON.stringify(doc.body),
    ctaBlock: doc.ctaBlock || '',
    isStub: false,
  }
}
