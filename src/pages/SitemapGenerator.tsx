import { useState } from 'react';
import { Download, CheckCircle, Copy, Globe, Home, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SEO from '@/components/SEO';
import { generateSitemapXML, getSitemapData, downloadSitemap } from '@/utils/sitemapGenerator';
import { useToast } from '@/hooks/use-toast';

const SitemapGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const sitemapData = getSitemapData();
  const sitemapXML = generateSitemapXML();

  const handleCopyXML = () => {
    navigator.clipboard.writeText(sitemapXML);
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'Sitemap XML copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadSitemap();
    toast({
      title: 'Downloaded!',
      description: 'Sitemap.xml file downloaded successfully',
    });
  };

  return (
    <>
      <SEO 
        title="Sitemap Generator - XML Sitemap for SEO"
        description="Generate and download the complete XML sitemap for AllFinCal including all blog posts and pages for Google Search Console submission."
        keywords="sitemap generator, XML sitemap, SEO sitemap, Google Search Console, sitemap download, blog sitemap, website sitemap"
        canonical="/sitemap-generator"
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Sitemap Generator</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="gradient-subtle py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground mx-auto mb-6">
                <Globe className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                XML Sitemap Generator
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Automatically generated sitemap including all pages and blog posts
              </p>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="py-12 px-4 -mt-8">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center border-0 shadow-card">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {sitemapData.staticPages}
                  </div>
                  <p className="text-muted-foreground">Static Pages</p>
                </Card>
                <Card className="p-6 text-center border-0 shadow-card">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {sitemapData.blogPosts}
                  </div>
                  <p className="text-muted-foreground">Blog Posts</p>
                </Card>
                <Card className="p-6 text-center border-0 shadow-card">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {sitemapData.totalUrls}
                  </div>
                  <p className="text-muted-foreground">Total URLs</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <Alert className="border-primary/50 bg-primary/5 mb-8">
                <CheckCircle className="h-5 w-5 text-primary" />
                <AlertDescription className="text-foreground">
                  <strong>Sitemap is ready!</strong> Download the XML file and upload it to your website's root directory, then submit the URL to Google Search Console.
                </AlertDescription>
              </Alert>

              <Card className="p-8 border-0 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  How to Submit to Google Search Console
                </h2>
                <ol className="space-y-4 text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>
                    <strong className="text-foreground">Download the sitemap</strong> - Click the download button below to get the sitemap.xml file
                  </li>
                  <li>
                    <strong className="text-foreground">Upload to your website</strong> - Place the sitemap.xml file in your website's root directory (public folder)
                  </li>
                  <li>
                    <strong className="text-foreground">Verify in Google Search Console</strong> - Log in to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Search Console</a>
                  </li>
                  <li>
                    <strong className="text-foreground">Submit sitemap URL</strong> - Go to Sitemaps section and submit: <code className="bg-muted px-2 py-1 rounded text-sm">https://allfincal.vercel.app/sitemap.xml</code>
                  </li>
                  <li>
                    <strong className="text-foreground">Monitor indexing</strong> - Google will start crawling and indexing your pages within a few days
                  </li>
                </ol>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={handleDownload} size="lg" className="gap-2 flex-1">
                  <Download className="w-5 h-5" />
                  Download Sitemap.xml
                </Button>
                <Button onClick={handleCopyXML} variant="outline" size="lg" className="gap-2 flex-1">
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy XML'}
                </Button>
              </div>

              {/* Preview Section */}
              <Card className="p-8 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Sitemap Preview</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    Last generated: {new Date(sitemapData.lastGenerated).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                    {sitemapXML}
                  </pre>
                </div>
              </Card>

              {/* URLs List */}
              <Card className="p-8 border-0 shadow-lg mt-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  All URLs in Sitemap
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sitemapData.urls.map((url, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <a 
                          href={url.loc} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          {url.loc}
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded">
                          Priority: {url.priority}
                        </span>
                        <span className="px-2 py-1 bg-muted rounded">
                          {url.changefreq}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SitemapGenerator;
