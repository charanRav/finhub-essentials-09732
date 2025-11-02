import { useState } from 'react';
import { BookOpen, TrendingUp, PiggyBank, CreditCard, Home, Calendar, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'investing', name: 'Investing', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'saving', name: 'Saving & Budgeting', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'loans', name: 'Loans & Credit', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'realestate', name: 'Real Estate', icon: <Home className="w-4 h-4" /> },
  ];

  // Placeholder blog posts - you'll replace these with real content
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Budget Your Monthly Salary Wisely',
      excerpt: 'Master the 50/30/20 rule and learn practical strategies to manage your income effectively. Discover how to allocate your salary for needs, wants, and savings without compromising your lifestyle.',
      category: 'saving',
      readTime: '8 min read',
      date: '2025-01-15',
      featured: true,
    },
    {
      id: '2',
      title: 'Top 5 Low-Risk Investment Options for Beginners in 2025',
      excerpt: 'Starting your investment journey? Explore safe investment options including fixed deposits, mutual funds, and government schemes perfect for first-time investors looking for steady returns.',
      category: 'investing',
      readTime: '10 min read',
      date: '2025-01-12',
      featured: true,
    },
    {
      id: '3',
      title: 'Understanding Credit Scores and How They Affect Loans',
      excerpt: 'Your credit score impacts loan approvals and interest rates. Learn what factors influence your score, how to check it for free, and proven strategies to improve it over time.',
      category: 'loans',
      readTime: '7 min read',
      date: '2025-01-10',
      featured: false,
    },
    {
      id: '4',
      title: 'Best Mutual Funds to Start SIP in 2025',
      excerpt: 'Systematic Investment Plans (SIPs) make investing easy and disciplined. Discover top-performing mutual funds across equity, debt, and hybrid categories suitable for different risk profiles.',
      category: 'investing',
      readTime: '12 min read',
      date: '2025-01-08',
      featured: true,
    },
    {
      id: '5',
      title: 'Fixed Deposit vs Recurring Deposit: Which is Better?',
      excerpt: 'Compare FD and RD to understand which savings instrument suits your financial goals. Learn about interest rates, flexibility, and ideal use cases for each option.',
      category: 'saving',
      readTime: '6 min read',
      date: '2025-01-05',
      featured: false,
    },
    {
      id: '6',
      title: 'Home Loan EMI Calculator: How to Plan Your Dream Home',
      excerpt: 'Planning to buy a home? Understand EMI calculations, factors affecting your loan eligibility, tax benefits, and smart strategies to reduce your home loan burden.',
      category: 'realestate',
      readTime: '9 min read',
      date: '2025-01-03',
      featured: false,
    },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-subtle py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Financial Knowledge Hub
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Expert insights, practical guides, and actionable tips to help you make smarter financial decisions
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-4 -mt-8">
          <div className="container mx-auto max-w-6xl">
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary to-primary/60 p-12 flex items-center justify-center text-primary-foreground">
                  <div className="text-center">
                    <Badge className="mb-4 bg-background/20 text-primary-foreground border-0">
                      Featured Article
                    </Badge>
                    <BookOpen className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Latest Insights</p>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-3 capitalize">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button className="w-fit gap-2">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="capitalize">{post.category}</Badge>
                    {post.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="h-1 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stay Updated with Financial Tips
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We regularly publish new articles to help you navigate your financial journey. Check back often for the latest insights!
          </p>
          <Button size="lg" className="gap-2">
            <BookOpen className="w-5 h-5" />
            Explore All Calculators
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
